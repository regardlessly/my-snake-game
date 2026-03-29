"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Send, Bot, User, Keyboard, MessageSquare, Plus, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user-store";
import MathInput from "@/components/math/math-input-wrapper";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ConversationSummary {
  id: string;
  topicId: string | null;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  preview: string | null;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm your MathQuest tutor. I'm here to help you with Sec 1 G3 Mathematics. Ask me anything — I'll guide you through problems step by step rather than just giving answers. What would you like to work on?",
  timestamp: new Date(),
};

function serializeMessages(msgs: Message[]) {
  return msgs
    .filter((m) => m.id !== "welcome")
    .map((m) => ({
      role: m.role,
      content: m.content,
      timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : m.timestamp,
    }));
}

function deserializeMessages(
  raw: Array<{ role: "user" | "assistant"; content: string; timestamp: string }>
): Message[] {
  return raw.map((m, i) => ({
    id: `loaded-${i}`,
    role: m.role,
    content: m.content,
    timestamp: new Date(m.timestamp),
  }));
}

export default function ChatPage() {
  const user = useUserStore((s) => s.user);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mathMode, setMathMode] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load conversation list on mount
  useEffect(() => {
    if (user?.id) {
      fetchConversations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const fetchConversations = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/conversations?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    } catch (e) {
      console.error("Failed to fetch conversations:", e);
    }
  }, [user?.id]);

  const createConversation = async (): Promise<string | null> => {
    if (!user?.id) return null;
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      if (res.ok) {
        const data = await res.json();
        setConversationId(data.id);
        return data.id;
      }
    } catch (e) {
      console.error("Failed to create conversation:", e);
    }
    return null;
  };

  const saveMessages = useCallback(
    async (id: string, msgs: Message[]) => {
      try {
        await fetch(`/api/conversations/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: serializeMessages(msgs) }),
        });
        fetchConversations();
      } catch (e) {
        console.error("Failed to save conversation:", e);
      }
    },
    [fetchConversations]
  );

  const loadConversation = async (id: string) => {
    try {
      const res = await fetch(`/api/conversations/${id}`);
      if (res.ok) {
        const data = await res.json();
        const loaded = deserializeMessages(data.messages || []);
        setMessages([WELCOME_MESSAGE, ...loaded]);
        setConversationId(id);
        setSidebarOpen(false);
      }
    } catch (e) {
      console.error("Failed to load conversation:", e);
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      await fetch(`/api/conversations/${id}`, { method: "DELETE" });
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (conversationId === id) {
        startNewChat();
      }
    } catch (e) {
      console.error("Failed to delete conversation:", e);
    }
  };

  const startNewChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setConversationId(null);
    setSidebarOpen(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Create conversation on first user message if none exists
    let activeConvId = conversationId;
    if (!activeConvId && user?.id) {
      activeConvId = await createConversation();
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          conversationId: activeConvId,
          topicId: null,
        }),
      });

      if (!res.ok) {
        throw new Error("Chat API error");
      }

      // Handle streaming response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantContent += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id
                ? { ...m, content: assistantContent }
                : m
            )
          );
        }
      }

      // Auto-save after assistant reply completes
      const finalMessages = [
        ...updatedMessages,
        { ...assistantMsg, content: assistantContent },
      ];
      if (activeConvId) {
        await saveMessages(activeConvId, finalMessages);
      }
    } catch (e) {
      console.error("Chat error:", e);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I'm having trouble connecting to the AI service. Please make sure the backend is running and AWS Bedrock is configured.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);

      // Save even error messages so the user message isn't lost
      if (activeConvId) {
        await saveMessages(activeConvId, [...updatedMessages, errorMsg]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-semibold flex items-center gap-2">
            <Bot className="size-4" />
            AI Math Tutor
          </h1>
          <p className="text-xs text-muted-foreground">
            Socratic tutoring — I'll guide you, not give answers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={startNewChat}>
            <Plus className="size-4 mr-1" />
            New Chat
          </Button>
          {user?.id && (
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger
                render={
                  <Button variant="outline" size="sm">
                    <MessageSquare className="size-4 mr-1" />
                    History
                  </Button>
                }
              />
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Chat History</SheetTitle>
                  <SheetDescription>Your recent conversations</SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-2 pb-4">
                    {conversations.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No conversations yet. Start chatting!
                      </p>
                    )}
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={cn(
                          "group flex items-start gap-2 rounded-lg border p-3 cursor-pointer transition-colors hover:bg-accent",
                          conversationId === conv.id && "border-primary bg-accent"
                        )}
                        onClick={() => loadConversation(conv.id)}
                      >
                        <MessageSquare className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">
                            {conv.preview || "Empty conversation"}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="size-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {formatDate(conv.updatedAt)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {conv.messageCount} msg{conv.messageCount !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="opacity-0 group-hover:opacity-100 shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(conv.id);
                          }}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-6 py-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="size-4" />
                </div>
              )}
              <Card
                className={cn(
                  "p-3 max-w-[80%] text-sm",
                  msg.role === "user" ? "bg-primary text-primary-foreground" : ""
                )}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </Card>
              {msg.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="size-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="size-4" />
              </div>
              <Card className="p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                </div>
              </Card>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-border p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="max-w-2xl mx-auto flex gap-2 items-end"
        >
          <Button
            type="button"
            variant={mathMode ? "default" : "ghost"}
            size="icon"
            className="shrink-0"
            title={mathMode ? "Switch to text input" : "Switch to math input"}
            onClick={() => {
              setMathMode((prev) => !prev);
              setInput("");
            }}
          >
            <Keyboard className="size-4" />
          </Button>
          {mathMode ? (
            <MathInput
              value={input}
              onChange={setInput}
              placeholder="Type math here..."
              disabled={isLoading}
              className="flex-1"
            />
          ) : (
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a math question..."
              disabled={isLoading}
              className="flex-1"
            />
          )}
          <Button type="submit" disabled={isLoading || !input.trim()} className="shrink-0">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
