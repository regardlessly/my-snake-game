import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/questions?topicId=X&skillId=Y&count=10&difficulty=1
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const topicId = searchParams.get("topicId");
  const skillId = searchParams.get("skillId");
  const count = parseInt(searchParams.get("count") || "10");
  const difficulty = searchParams.get("difficulty")
    ? parseInt(searchParams.get("difficulty")!)
    : undefined;

  if (!topicId) {
    return NextResponse.json(
      { error: "topicId required" },
      { status: 400 }
    );
  }

  const where: Record<string, unknown> = { topicId };
  if (skillId) where.skillId = skillId;
  if (difficulty) where.difficulty = difficulty;

  // Get random questions by fetching more than needed and shuffling
  const allQuestions = await prisma.question.findMany({
    where,
    select: {
      id: true,
      topicId: true,
      skillId: true,
      difficulty: true,
      questionJson: true,
    },
  });

  // Shuffle and take requested count
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  const questions = shuffled.slice(0, count);

  return NextResponse.json(questions);
}
