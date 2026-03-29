"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/user-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Zap, Flame, Target, LogOut } from "lucide-react";

interface Achievement {
  code: string;
  name: string;
  description: string;
  xpReward: number;
  earnedAt?: string;
}

export default function ProfilePage() {
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // TODO: fetch user achievements from API
  }, []);

  if (!user) return null;

  const xpForNext = user.currentLevel * 100;
  const xpProgress = ((user.totalXp % 100) / xpForNext) * 100;

  // Level titles
  const titles = [
    "",
    "Math Rookie",
    "Number Cruncher",
    "Equation Explorer",
    "Algebra Apprentice",
    "Pattern Seeker",
    "Geometry Guardian",
    "Formula Fighter",
    "Stats Strategist",
    "Problem Solver",
    "Math Wizard",
    "Grand Master",
    "Legendary Mathematician",
  ];
  const title = titles[Math.min(user.currentLevel, titles.length - 1)];

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearUser}
          className="gap-1 text-muted-foreground"
        >
          <LogOut className="size-3" />
          Sign Out
        </Button>
      </div>

      {/* Profile card */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
            {user.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.displayName}</h2>
            <p className="text-muted-foreground">{title}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-400">
              <Zap className="size-4" />
              <span className="text-2xl font-bold">{user.totalXp}</span>
            </div>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-400">
              <Target className="size-4" />
              <span className="text-2xl font-bold">{user.currentLevel}</span>
            </div>
            <p className="text-xs text-muted-foreground">Level</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-orange-400">
              <Flame className="size-4" />
              <span className="text-2xl font-bold">{user.streakDays}</span>
            </div>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-400">
              <Trophy className="size-4" />
              <span className="text-2xl font-bold">{achievements.length}</span>
            </div>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Level {user.currentLevel}</span>
            <span>Level {user.currentLevel + 1}</span>
          </div>
          <Progress value={xpProgress} className="h-3" />
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {user.totalXp % 100} / {xpForNext} XP to next level
          </p>
        </div>
      </Card>

      {/* Achievements */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {achievements.length === 0 && (
            <p className="text-sm text-muted-foreground col-span-2">
              Start practicing to earn your first achievement!
            </p>
          )}
        </div>
      </div>

      <Card className="p-4">
        <h3 className="font-medium mb-2">G-Level</h3>
        <p className="text-sm text-muted-foreground">
          You are currently studying at <Badge>G{user.gLevel}</Badge> level.
        </p>
      </Card>
    </div>
  );
}
