import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAndAwardAchievements } from "@/lib/achievements";

// GET /api/progress?userId=X&topicId=Y
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get("userId");
  const topicId = searchParams.get("topicId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const where: Record<string, string> = { userId };
  if (topicId) where.topicId = topicId;

  const progress = await prisma.userSkillProgress.findMany({ where });

  return NextResponse.json(progress);
}

// POST /api/progress - Record an answer attempt
export async function POST(request: NextRequest) {
  const { userId, topicId, skillId, correct } = await request.json();

  if (!userId || !topicId || !skillId || correct === undefined) {
    return NextResponse.json(
      { error: "userId, topicId, skillId, and correct required" },
      { status: 400 }
    );
  }

  // Upsert the skill progress
  const existing = await prisma.userSkillProgress.findUnique({
    where: {
      userId_topicId_skillId: { userId, topicId, skillId },
    },
  });

  const slidingWindow = existing?.slidingWindow ?? [];
  const newWindow = [...slidingWindow, correct ? 1 : 0].slice(-8); // keep last 8
  const correctInWindow = newWindow.filter((x) => x === 1).length;
  const accuracyRate = newWindow.length > 0 ? correctInWindow / newWindow.length : 0;

  // Mastery: 85% threshold over last 8 attempts
  const isMastered = newWindow.length >= 5 && accuracyRate >= 0.85;
  const newStatus = isMastered
    ? "MASTERED"
    : accuracyRate >= 0.6
      ? "FAMILIAR"
      : existing?.totalAttempts
        ? "ATTEMPTED"
        : "UNLOCKED";

  const progress = await prisma.userSkillProgress.upsert({
    where: {
      userId_topicId_skillId: { userId, topicId, skillId },
    },
    update: {
      slidingWindow: newWindow,
      accuracyRate,
      totalAttempts: { increment: 1 },
      correctAttempts: correct ? { increment: 1 } : undefined,
      status: newStatus,
      lastPracticedAt: new Date(),
    },
    create: {
      userId,
      topicId,
      skillId,
      slidingWindow: newWindow,
      accuracyRate,
      totalAttempts: 1,
      correctAttempts: correct ? 1 : 0,
      status: correct ? "ATTEMPTED" : "ATTEMPTED",
      lastPracticedAt: new Date(),
    },
  });

  // Award XP for correct answer
  let xpEarned = 0;
  if (correct) {
    xpEarned = 15; // base XP
    if (isMastered && existing?.status !== "MASTERED") {
      xpEarned += 50; // mastery bonus
    }

    await prisma.xpEvent.create({
      data: {
        userId,
        eventType: "CORRECT_ANSWER",
        xpAmount: xpEarned,
        metadata: { topicId, skillId },
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { totalXp: { increment: xpEarned } },
    });
  }

  // Check and award any newly earned achievements
  const newAchievements = await checkAndAwardAchievements(userId);

  return NextResponse.json({
    progress,
    xpEarned,
    newMastery: isMastered && existing?.status !== "MASTERED",
    newAchievements,
  });
}
