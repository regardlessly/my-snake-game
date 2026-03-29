import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/curriculum/[topicId] - Get a single topic with notes
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  const { topicId } = await params;

  const topic = await prisma.curriculumTopic.findUnique({
    where: { id: topicId },
    include: {
      prerequisites: {
        include: { prerequisite: { select: { id: true, name: true } } },
      },
      questions: {
        select: { skillId: true, difficulty: true },
      },
    },
  });

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  // Count questions per skill
  const skillCounts: Record<string, number> = {};
  for (const q of topic.questions) {
    skillCounts[q.skillId] = (skillCounts[q.skillId] || 0) + 1;
  }

  return NextResponse.json({
    id: topic.id,
    name: topic.name,
    description: topic.description,
    strand: topic.strand,
    term: topic.term,
    chapter: topic.chapter,
    totalSkills: topic.totalSkills,
    notesHtml: topic.notesHtml,
    prerequisites: topic.prerequisites.map((p) => ({
      id: p.prerequisiteId,
      name: p.prerequisite.name,
      relationship: p.relationship,
    })),
    skillCounts,
    totalQuestions: topic.questions.length,
  });
}
