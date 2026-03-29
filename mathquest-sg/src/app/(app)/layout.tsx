"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/user-store";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Topic {
  id: string;
  name: string;
  strand: string;
  hasNotes: boolean;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/curriculum")
      .then((r) => r.json())
      .then(setTopics)
      .catch(console.error);
  }, []);

  // Dev-mode login
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Welcome to MathQuest SG</h2>
          <p className="text-muted-foreground">Enter your name to start</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!name.trim()) return;
              const email = `${name.toLowerCase().replace(/\s/g, ".")}@mathquest.dev`;
              const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ displayName: name, email }),
              });
              const userData = await res.json();
              setUser(userData);
            }}
            className="flex gap-2 justify-center"
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-48"
            />
            <Button type="submit">Start Learning</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <AppSidebar topics={topics} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
