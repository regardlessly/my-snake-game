import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAndAwardAchievements } from "@/lib/achievements";

/**
 * GET /api/achievements?userId=X
 *
 * List all achievements with the user's earned status.
 */
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const allAchievements = await prisma.achievement.findMany({
    orderBy: { code: "asc" },
  });

  const earned = await prisma.userAchievement.findMany({
    where: { userId },
    select: { achievementId: true, earnedAt: true },
  });

  const earnedMap = new Map(earned.map((e) => [e.achievementId, e.earnedAt]));

  const achievements = allAchievements.map((a) => ({
    id: a.id,
    code: a.code,
    name: a.name,
    description: a.description,
    iconUrl: a.iconUrl,
    xpReward: a.xpReward,
    earned: earnedMap.has(a.id),
    earnedAt: earnedMap.get(a.id) ?? null,
  }));

  return NextResponse.json(achievements);
}

/**
 * POST /api/achievements/check
 *
 * Run checkAndAwardAchievements for the given user and return any newly earned.
 * Body: { userId: string }
 */
export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const newlyAwarded = await checkAndAwardAchievements(userId);

  return NextResponse.json({
    newAchievements: newlyAwarded,
    count: newlyAwarded.length,
  });
}
