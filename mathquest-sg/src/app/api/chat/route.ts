import { NextRequest } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const FALLBACK_SYSTEM_PROMPT = `You are a Socratic math tutor for Singapore Secondary 1 G3 students.
You NEVER give direct answers. Instead:
1. Ask guiding questions to help students think through problems
2. Provide hints that get progressively more specific
3. Celebrate correct reasoning
4. Gently redirect misconceptions

Stay focused on Sec 1 G3 Mathematics topics: primes, integers, algebra, linear equations, geometry, statistics.
If asked about non-math topics, redirect politely.`;

export async function POST(request: NextRequest) {
  const { messages, conversationId, topicId } = await request.json();

  // Try FastAPI backend first (which has model routing + SymPy)
  try {
    const backendRes = await fetch(`${BACKEND_URL}/tutor/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, conversationId, topicId }),
    });

    if (backendRes.ok && backendRes.body) {
      return new Response(backendRes.body, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  } catch {
    // Backend not available, fall through
  }

  // Fallback: return a helpful message
  const lastMessage = messages[messages.length - 1]?.content || "";
  const fallbackResponse =
    `I'd love to help you with "${lastMessage.slice(0, 100)}", but the AI backend isn't connected yet.\n\n` +
    `To enable AI tutoring:\n` +
    `1. Configure AWS Bedrock credentials in .env.local\n` +
    `2. Start the FastAPI backend: cd backend && source venv/bin/activate && uvicorn app.main:app --reload\n\n` +
    `In the meantime, try the Practice mode on any topic to test your skills with MCQ questions!`;

  // Stream the fallback response
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const words = fallbackResponse.split(" ");
      let i = 0;
      const interval = setInterval(() => {
        if (i >= words.length) {
          clearInterval(interval);
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode((i > 0 ? " " : "") + words[i]));
        i++;
      }, 30);
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export { FALLBACK_SYSTEM_PROMPT };
