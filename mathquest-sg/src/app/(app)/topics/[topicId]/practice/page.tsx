"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/user-store";
import { cn } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, XCircle, Zap, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  topicId: string;
  skillId: string;
  difficulty: number;
  questionJson: {
    q: string;
    opts: string[];
    ans: number;
    explain: string;
    type: string;
  };
}

type SessionState = "loading" | "question" | "feedback" | "complete";

export default function PracticePage() {
  const { topicId } = useParams<{ topicId: string }>();
  const user = useUserStore((s) => s.user);
  const updateXp = useUserStore((s) => s.updateXp);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [sessionState, setSessionState] = useState<SessionState>("loading");
  const [score, setScore] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  useEffect(() => {
    fetch(`/api/questions?topicId=${topicId}&count=10`)
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data);
        setSessionState(data.length > 0 ? "question" : "complete");
      })
      .catch(console.error);
  }, [topicId]);

  const currentQ = questions[currentIndex];

  const submitAnswer = useCallback(
    async (answerIndex: number) => {
      if (!currentQ || !user || sessionState !== "question") return;

      setSelectedAnswer(answerIndex);
      const correct = answerIndex === currentQ.questionJson.ans;
      if (correct) setScore((s) => s + 1);
      setSessionState("feedback");

      // Record progress
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            topicId: currentQ.topicId,
            skillId: currentQ.skillId,
            correct,
          }),
        });
        const data = await res.json();
        if (data.xpEarned > 0) {
          updateXp(data.xpEarned);
          setTotalXpEarned((x) => x + data.xpEarned);
          toast.success(`+${data.xpEarned} XP!`, { duration: 1500 });
        }
        if (data.newMastery) {
          toast.success("Skill Mastered!", {
            description: `You've mastered ${currentQ.skillId.replace(/-/g, " ")}`,
            duration: 3000,
          });
        }
      } catch (e) {
        console.error("Failed to record progress:", e);
      }
    },
    [currentQ, user, sessionState, updateXp]
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setSessionState("complete");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setSessionState("question");
    }
  }, [currentIndex, questions.length]);

  if (sessionState === "loading") {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  if (sessionState === "complete") {
    const percentage =
      questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <Card className="p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Practice Complete!</h2>
          <div className="text-6xl font-bold">
            {score}/{questions.length}
          </div>
          <p className="text-muted-foreground">{percentage}% accuracy</p>
          <div className="flex items-center justify-center gap-2">
            <Zap className="size-5 text-yellow-400" />
            <span className="text-lg font-medium">
              +{totalXpEarned} XP earned
            </span>
          </div>
          <div className="flex gap-3 justify-center pt-4">
            <Link href={`/topics/${topicId}`}>
              <Button variant="outline">
                <ArrowLeft className="size-4 mr-1" />
                Back to Topic
              </Button>
            </Link>
            <Button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setTotalXpEarned(0);
                setSelectedAnswer(null);
                setSessionState("loading");
                fetch(`/api/questions?topicId=${topicId}&count=10`)
                  .then((r) => r.json())
                  .then((data) => {
                    setQuestions(data);
                    setSessionState(data.length > 0 ? "question" : "complete");
                  });
              }}
            >
              Practice Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!currentQ) return null;

  const isCorrect = selectedAnswer === currentQ.questionJson.ans;
  const q = currentQ.questionJson;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <Link
          href={`/topics/${topicId}`}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <Progress
          value={((currentIndex + 1) / questions.length) * 100}
          className="flex-1 h-2"
        />
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      {/* Question */}
      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="text-xs">
            {currentQ.skillId.replace(/-/g, " ")}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Difficulty {currentQ.difficulty}/5
          </Badge>
        </div>

        <p className="text-lg font-medium leading-relaxed">{q.q}</p>

        {/* Options */}
        <div className="grid gap-2">
          {q.opts.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            let variant: "outline" | "default" | "secondary" | "ghost" | "destructive" = "outline";
            let extraClass = "";

            if (sessionState === "feedback") {
              if (i === q.ans) {
                variant = "default";
                extraClass = "bg-green-600 border-green-600 text-white hover:bg-green-600";
              } else if (i === selectedAnswer && !isCorrect) {
                variant = "destructive";
              }
            }

            return (
              <Button
                key={i}
                variant={variant}
                className={cn(
                  "justify-start text-left h-auto py-3 px-4",
                  extraClass,
                  sessionState === "feedback" && "pointer-events-none"
                )}
                onClick={() => submitAnswer(i)}
                disabled={sessionState === "feedback"}
              >
                <span className="font-mono mr-3 text-muted-foreground">
                  {letter}
                </span>
                <span className="flex-1">{opt}</span>
                {sessionState === "feedback" && i === q.ans && (
                  <CheckCircle2 className="size-4 ml-2" />
                )}
                {sessionState === "feedback" &&
                  i === selectedAnswer &&
                  !isCorrect && <XCircle className="size-4 ml-2" />}
              </Button>
            );
          })}
        </div>

        {/* Feedback */}
        {sessionState === "feedback" && (
          <div
            className={cn(
              "rounded-lg p-4 text-sm",
              isCorrect
                ? "bg-green-500/10 border border-green-500/20"
                : "bg-red-500/10 border border-red-500/20"
            )}
          >
            <p className="font-medium mb-1">
              {isCorrect ? "Correct!" : "Not quite"}
            </p>
            <p className="text-muted-foreground">{q.explain}</p>
          </div>
        )}
      </Card>

      {/* Next button */}
      {sessionState === "feedback" && (
        <div className="flex justify-end">
          <Button onClick={nextQuestion} className="gap-1">
            {currentIndex + 1 < questions.length ? "Next" : "See Results"}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}

      {/* Score */}
      <div className="text-center text-sm text-muted-foreground">
        Score: {score}/{currentIndex + (sessionState === "feedback" ? 1 : 0)}
        {totalXpEarned > 0 && (
          <span className="ml-3 text-yellow-400">+{totalXpEarned} XP</span>
        )}
      </div>
    </div>
  );
}
