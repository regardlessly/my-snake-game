import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/conversations?userId=X — list user's conversations
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId query parameter is required" },
      { status: 400 }
    );
  }

  const conversations = await prisma.conversation.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: 20,
    select: {
      id: true,
      topicId: true,
      messages: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Return with a preview of the last message
  const results = conversations.map((c) => {
    const msgs = c.messages as Array<{
      role: string;
      content: string;
      timestamp: string;
    }>;
    const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
    return {
      id: c.id,
      topicId: c.topicId,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      messageCount: msgs.length,
      preview: lastMsg
        ? lastMsg.content.slice(0, 100) + (lastMsg.content.length > 100 ? "..." : "")
        : null,
    };
  });

  return NextResponse.json(results);
}

// POST /api/conversations — create a new conversation
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, topicId } = body;

  if (!userId) {
    return NextResponse.json(
      { error: "userId is required" },
      { status: 400 }
    );
  }

  const conversation = await prisma.conversation.create({
    data: {
      userId,
      topicId: topicId || null,
      messages: [],
    },
  });

  return NextResponse.json(conversation, { status: 201 });
}
