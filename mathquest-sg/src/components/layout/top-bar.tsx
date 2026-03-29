"use client";

import { useUserStore } from "@/stores/user-store";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Zap } from "lucide-react";

export function TopBar() {
  const user = useUserStore((s) => s.user);

  if (!user) return null;

  const xpForNextLevel = user.currentLevel * 100;
  const xpProgress = ((user.totalXp % 100) / 100) * 100;

  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-3 bg-card">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-yellow-400" />
          <span className="text-sm font-medium">Level {user.currentLevel}</span>
        </div>
        <div className="flex items-center gap-2 min-w-[120px]">
          <Progress value={xpProgress} className="h-2 w-24" />
          <span className="text-xs text-muted-foreground">
            {user.totalXp} XP
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user.streakDays > 0 && (
          <Badge variant="outline" className="gap-1">
            <Flame className="size-3 text-orange-400" />
            {user.streakDays} day streak
          </Badge>
        )}
        <span className="text-sm text-muted-foreground">
          {user.displayName}
        </span>
      </div>
    </header>
  );
}
