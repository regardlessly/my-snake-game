"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Calculator,
  Hexagon,
  BarChart3,
  MessageCircle,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Topic {
  id: string;
  name: string;
  strand: string;
  hasNotes: boolean;
}

const strandIcons: Record<string, React.ReactNode> = {
  NUMBER_ALGEBRA: <Calculator className="size-4" />,
  GEOMETRY: <Hexagon className="size-4" />,
  STATISTICS: <BarChart3 className="size-4" />,
};

const strandLabels: Record<string, string> = {
  NUMBER_ALGEBRA: "Number & Algebra",
  GEOMETRY: "Geometry",
  STATISTICS: "Statistics",
};

interface AppSidebarProps {
  topics: Topic[];
}

export function AppSidebar({ topics }: AppSidebarProps) {
  const pathname = usePathname();

  const grouped = topics.reduce(
    (acc, t) => {
      if (!acc[t.strand]) acc[t.strand] = [];
      acc[t.strand].push(t);
      return acc;
    },
    {} as Record<string, Topic[]>
  );

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="p-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
          <BookOpen className="size-5" />
          MathQuest SG
        </Link>
      </div>

      <nav className="p-2">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
            pathname === "/dashboard"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "hover:bg-sidebar-accent/50"
          )}
        >
          <LayoutDashboard className="size-4" />
          Dashboard
        </Link>
        <Link
          href="/chat"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
            pathname === "/chat"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "hover:bg-sidebar-accent/50"
          )}
        >
          <MessageCircle className="size-4" />
          AI Tutor
        </Link>
      </nav>

      <ScrollArea className="flex-1 px-2">
        {Object.entries(grouped).map(([strand, strandTopics]) => (
          <div key={strand} className="mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase text-muted-foreground">
              {strandIcons[strand]}
              {strandLabels[strand]}
            </div>
            {strandTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/topics/${topic.id}`}
                className={cn(
                  "block rounded-md px-3 py-1.5 text-sm transition-colors",
                  pathname === `/topics/${topic.id}`
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
                )}
              >
                {topic.name}
              </Link>
            ))}
          </div>
        ))}
      </ScrollArea>
    </aside>
  );
}
