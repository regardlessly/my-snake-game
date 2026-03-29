"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/stores/user-store";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  MessageCircle,
  Trophy,
  Target,
  Calculator,
  Hexagon,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface TopicSummary {
  id: string;
  name: string;
  strand: string;
  term: number;
  totalSkills: number;
  totalQuestions: number;
  hasNotes: boolean;
  progress: {
    totalAttempts: number;
    correctAttempts: number;
    mastered: number;
  } | null;
}

const strandColors: Record<string, string> = {
  NUMBER_ALGEBRA: "text-blue-400",
  GEOMETRY: "text-green-400",
  STATISTICS: "text-purple-400",
};

const strandIcons: Record<string, React.ReactNode> = {
  NUMBER_ALGEBRA: <Calculator className="size-5" />,
  GEOMETRY: <Hexagon className="size-5" />,
  STATISTICS: <BarChart3 className="size-5" />,
};

export default function DashboardPage() {
  const user = useUserStore((s) => s.user);
  const [topics, setTopics] = useState<TopicSummary[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/curriculum?userId=${user.id}`)
      .then((r) => r.json())
      .then(setTopics)
      .catch(console.error);
  }, [user]);

  if (!user) return null;

  const topicsWithProgress = topics.filter((t) => t.progress);
  const masteredTopics = topics.filter(
    (t) => t.progress && t.progress.mastered >= t.totalSkills
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user.displayName}!
        </h1>
        <p className="text-muted-foreground">
          Continue your Sec 1 G3 Math journey
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/10">
            <Trophy className="size-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-2xl font-bold">{user.totalXp}</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Target className="size-5 text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold">Level {user.currentLevel}</p>
            <p className="text-xs text-muted-foreground">Current Level</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <BookOpen className="size-5 text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {masteredTopics.length}/{topics.length}
            </p>
            <p className="text-xs text-muted-foreground">Topics Mastered</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <MessageCircle className="size-5 text-purple-400" />
          </div>
          <div>
            <Link
              href="/chat"
              className="text-sm font-medium hover:underline"
            >
              Ask AI Tutor
            </Link>
            <p className="text-xs text-muted-foreground">Get help anytime</p>
          </div>
        </Card>
      </div>

      {/* Topic grid */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {topics.map((topic) => {
            const progressPct = topic.progress
              ? Math.round(
                  (topic.progress.mastered / topic.totalSkills) * 100
                )
              : 0;

            return (
              <Link key={topic.id} href={`/topics/${topic.id}`}>
                <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={strandColors[topic.strand]}>
                        {strandIcons[topic.strand]}
                      </span>
                      <h3 className="font-medium text-sm">{topic.name}</h3>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Term {topic.term}
                    </Badge>
                  </div>
                  <Progress value={progressPct} className="h-1.5 mb-1" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {topic.progress?.mastered ?? 0}/{topic.totalSkills}{" "}
                      skills
                    </span>
                    {topic.hasNotes && (
                      <span className="text-green-400">Has notes</span>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-3">
        <Link
          href="/topics"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Browse All Topics
        </Link>
        <Link href="/chat" className={cn(buttonVariants())}>
          Chat with AI Tutor
        </Link>
      </div>
    </div>
  );
}
