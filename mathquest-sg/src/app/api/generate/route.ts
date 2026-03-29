import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// POST /api/generate - Generate AI questions and save to database
export async function POST(request: NextRequest) {
  const { topicId, count = 10, difficulty } = await request.json();

  if (!topicId) {
    return NextResponse.json(
      { error: "topicId required" },
      { status: 400 }
    );
  }

  // Verify topic exists
  const topic = await prisma.curriculumTopic.findUnique({
    where: { id: topicId },
  });

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  // Call backend question generator
  try {
    const backendRes = await fetch(`${BACKEND_URL}/generate/batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicId, count, difficulty }),
      signal: AbortSignal.timeout(120_000), // 2 min timeout for batch generation
    });

    if (!backendRes.ok) {
      const err = await backendRes.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: "Generation failed",
          detail: err.detail || `Backend returned ${backendRes.status}`,
        },
        { status: backendRes.status === 503 ? 503 : 502 }
      );
    }

    const generated = await backendRes.json();

    // Save generated questions to database
    const saved = [];
    for (const q of generated) {
      const record = await prisma.question.create({
        data: {
          topicId,
          skillId: q.skill_id || q.skillId || "general",
          difficulty: q.difficulty || 3,
          questionJson: {
            q: q.q || q.question || q.question_stem,
            opts: q.opts || q.options,
            ans: q.ans ?? q.answer ?? 0,
            explain: q.explain || q.explanation || "",
            type: q.type || "mcq",
          },
          sympyVerified: q.sympy_verified ?? true,
          aiGenerated: true,
        },
      });
      saved.push(record);
    }

    return NextResponse.json({
      generated: saved.length,
      questions: saved,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Generation timed out (>2 min)" },
        { status: 504 }
      );
    }
    return NextResponse.json(
      {
        error: "Backend unavailable",
        detail: "Start the FastAPI backend with Bedrock credentials configured",
      },
      { status: 503 }
    );
  }
}
