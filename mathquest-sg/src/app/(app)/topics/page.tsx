"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Hexagon, BarChart3 } from "lucide-react";

interface TopicSummary {
  id: string;
  name: string;
  description: string;
  strand: string;
  term: number;
  totalSkills: number;
  hasNotes: boolean;
  prerequisites: Array<{ id: string; name: string; relationship: string }>;
}

const strandMeta: Record<
  string,
  { icon: React.ReactNode; color: string; label: string }
> = {
  NUMBER_ALGEBRA: {
    icon: <Calculator className="size-5" />,
    color: "text-blue-400",
    label: "Number & Algebra",
  },
  GEOMETRY: {
    icon: <Hexagon className="size-5" />,
    color: "text-green-400",
    label: "Geometry",
  },
  STATISTICS: {
    icon: <BarChart3 className="size-5" />,
    color: "text-purple-400",
    label: "Statistics",
  },
};

export default function TopicsPage() {
  const [topics, setTopics] = useState<TopicSummary[]>([]);

  useEffect(() => {
    fetch("/api/curriculum")
      .then((r) => r.json())
      .then(setTopics)
      .catch(console.error);
  }, []);

  const grouped = topics.reduce(
    (acc, t) => {
      if (!acc[t.strand]) acc[t.strand] = [];
      acc[t.strand].push(t);
      return acc;
    },
    {} as Record<string, TopicSummary[]>
  );

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Sec 1 G3 Mathematics</h1>
        <p className="text-muted-foreground">
          14 topics across 3 strands — Singapore MOE Syllabus
        </p>
      </div>

      {Object.entries(grouped).map(([strand, strandTopics]) => {
        const meta = strandMeta[strand];
        return (
          <div key={strand}>
            <div className="flex items-center gap-2 mb-3">
              <span className={meta.color}>{meta.icon}</span>
              <h2 className="text-lg font-semibold">{meta.label}</h2>
              <Badge variant="outline" className="text-xs">
                {strandTopics.length} topics
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {strandTopics.map((topic) => (
                <Link key={topic.id} href={`/topics/${topic.id}`}>
                  <Card className="p-4 hover:bg-accent/50 transition-colors h-full">
                    <h3 className="font-medium mb-1">{topic.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        Term {topic.term}
                      </Badge>
                      <span>{topic.totalSkills} skills</span>
                      {topic.hasNotes && (
                        <span className="text-green-400">Notes available</span>
                      )}
                    </div>
                    {topic.prerequisites.length > 0 && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        Requires:{" "}
                        {topic.prerequisites.map((p) => p.name).join(", ")}
                      </div>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
