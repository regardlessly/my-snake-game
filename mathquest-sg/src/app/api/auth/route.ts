import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const clerkEnabled = !!process.env.CLERK_SECRET_KEY;

// POST /api/auth - Create or get user
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { displayName, email } = body;

  // If Clerk is configured, try to get userId from Clerk session
  if (clerkEnabled) {
    try {
      const { auth } = await import("@clerk/nextjs/server");
      const { userId } = await auth();

      if (userId) {
        if (!email) {
          return NextResponse.json(
            { error: "email is required" },
            { status: 400 }
          );
        }

        const user = await prisma.user.upsert({
          where: { clerkId: userId },
          update: { displayName: displayName || email, email },
          create: {
            clerkId: userId,
            email,
            displayName: displayName || email,
            gLevel: 3,
          },
        });

        return NextResponse.json(user);
      }
    } catch {
      // Fall through to dev-mode flow if Clerk auth fails
    }
  }

  // Dev-mode fallback: email-based flow (no Clerk)
  if (!displayName || !email) {
    return NextResponse.json(
      { error: "displayName and email required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.upsert({
    where: { email },
    update: { displayName },
    create: {
      email,
      displayName,
      gLevel: 3,
    },
  });

  return NextResponse.json(user);
}
