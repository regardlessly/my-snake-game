import { NextRequest, NextResponse } from "next/server";
import {
  getTopicReadiness,
  getRecommendedNextTopics,
  getPrerequisiteChain,
} from "@/lib/curriculum-queries";

// GET /api/curriculum/readiness?userId=X&topicId=Y — returns topic readiness
// GET /api/curriculum/readiness?userId=X — returns recommended next topics
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const topicId = request.nextUrl.searchParams.get("topicId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId query parameter is required" },
      { status: 400 }
    );
  }

  // If topicId is provided, return readiness for that specific topic
  if (topicId) {
    const [readiness, prereqChain] = await Promise.all([
      getTopicReadiness(userId, topicId),
      getPrerequisiteChain(topicId),
    ]);

    return NextResponse.json({
      topicId,
      ...readiness,
      prerequisiteChain: prereqChain,
    });
  }

  // Otherwise, return recommended next topics
  const recommended = await getRecommendedNextTopics(userId);
  return NextResponse.json({ recommended });
}
