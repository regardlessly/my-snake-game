import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/curriculum - Get all topics with prerequisites
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  const topics = await prisma.curriculumTopic.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      prerequisites: {
        include: { prerequisite: { select: { id: true, name: true } } },
      },
    },
  });

  // If userId provided, include progress
  let progressMap: Record<
    string,
    { totalAttempts: number; correctAttempts: number; mastered: number }
  > = {};

  if (userId) {
    const progress = await prisma.userSkillProgress.findMany({
      where: { userId },
    });

    for (const p of progress) {
      if (!progressMap[p.topicId]) {
        progressMap[p.topicId] = {
          totalAttempts: 0,
          correctAttempts: 0,
          mastered: 0,
        };
      }
      progressMap[p.topicId].totalAttempts += p.totalAttempts;
      progressMap[p.topicId].correctAttempts += p.correctAttempts;
      if (p.status === "MASTERED") {
        progressMap[p.topicId].mastered += 1;
      }
    }
  }

  const result = topics.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    strand: t.strand,
    term: t.term,
    chapter: t.chapter,
    displayOrder: t.displayOrder,
    totalSkills: t.totalSkills,
    hasNotes: !!t.notesHtml,
    prerequisites: t.prerequisites.map((p) => ({
      id: p.prerequisiteId,
      name: p.prerequisite.name,
      relationship: p.relationship,
    })),
    progress: progressMap[t.id] || null,
  }));

  return NextResponse.json(result);
}
