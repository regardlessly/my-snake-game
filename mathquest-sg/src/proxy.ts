import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  // Clerk auth disabled in dev — enable by setting NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
