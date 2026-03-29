"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">
          MathQuest SG
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg">
          AI-powered gamified math tutor for Singapore Sec 1 G3 students.
          Socratic tutoring, adaptive learning, and real progression.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
          Get Started
        </Link>
        <Link
          href="/topics"
          className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
        >
          Browse Topics
        </Link>
      </div>
    </div>
  );
}
