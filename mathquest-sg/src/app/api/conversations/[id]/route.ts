import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/conversations/:id — get full conversation
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const conversation = await prisma.conversation.findUnique({
    where: { id },
  });

  if (!conversation) {
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(conversation);
}

// PATCH /api/conversations/:id — update messages array
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { messages } = body;

  if (!Array.isArray(messages)) {
    return NextResponse.json(
      { error: "messages must be an array" },
      { status: 400 }
    );
  }

  const conversation = await prisma.conversation.update({
    where: { id },
    data: { messages },
  });

  return NextResponse.json(conversation);
}

// DELETE /api/conversations/:id — delete conversation
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.conversation.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
