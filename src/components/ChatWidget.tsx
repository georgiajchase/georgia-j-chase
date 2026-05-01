import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_REPLIES = [
  "What does SEO cost?",
  "Which plan is right for me?",
  "How long until I see results?",
  "Get a free website check",
];

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "Hi, I'm Georgia's SEO assistant. I can answer questions about SEO services, pricing, or help you book a free website check. What can I help you with?",
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;
const ANON_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setError(null);
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last !== INITIAL_GREETING && prev.length > next.length) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(ANON_KEY ? { Authorization: `Bearer ${ANON_KEY}` } : {}),
        },
        body: JSON.stringify({ messages: next }),
      });

      if (resp.status === 429) {
        setError("Too many messages. Please wait a moment and try again.");
        setIsLoading(false);
        return;
      }
      if (resp.status === 402) {
        setError("AI service is temporarily unavailable. Please try again later.");
        setIsLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) {
        setError("Something went wrong. Please try again.");
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, nl);
          textBuffer = textBuffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* Floating bubble button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed z-50 bottom-5 left-5 h-14 w-14 rounded-full bg-[#f97316] text-white shadow-[0_8px_30px_rgba(249,115,22,0.55)] flex items-center justify-center hover:scale-105 transition-transform animate-pulse-glow"
        >
          <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className="fixed z-50 bottom-5 left-5 flex flex-col rounded-2xl border border-[#f97316]/30 bg-[#050a18] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-in"
          style={{
            width: "min(380px, calc(100vw - 2.5rem))",
            height: "min(500px, calc(100vh - 2.5rem))",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1e] border-b border-[#f97316]/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-[#f97316] flex items-center justify-center text-white font-semibold text-sm">
                  G
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[#0a0f1e]" />
              </div>
              <div className="leading-tight">
                <p className="text-white text-sm font-semibold">Georgia SEO Assistant</p>
                <p className="text-[11px] text-green-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
                  Online now
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-[#050a18]"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm px-3 py-2 text-sm bg-[#f97316] text-white whitespace-pre-wrap break-words"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm px-3 py-2 text-sm bg-[#0a0f1e] text-white/90 border border-[#f97316]/40 whitespace-pre-wrap break-words"
                  }
                >
                  {m.content || (
                    <span className="inline-flex gap-1 items-center text-white/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#f97316] animate-bounce" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#f97316] animate-bounce [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#f97316] animate-bounce [animation-delay:240ms]" />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-3 py-2 bg-[#0a0f1e] border border-[#f97316]/40">
                  <span className="inline-flex gap-1 items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f97316] animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f97316] animate-bounce [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f97316] animate-bounce [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-2 py-1.5">
                {error}
              </div>
            )}

            {/* Quick replies (only when conversation is just the greeting) */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#0a0f1e] text-white/85 border border-[#f97316]/40 hover:bg-[#f97316] hover:text-white transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 px-3 py-3 bg-[#0a0f1e] border-t border-[#f97316]/30"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about SEO, pricing, results..."
              disabled={isLoading}
              className="flex-1 bg-[#050a18] text-white placeholder-white/40 text-sm rounded-full px-4 py-2 border border-[#f97316]/30 focus:outline-none focus:border-[#f97316] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="h-9 w-9 flex items-center justify-center rounded-full bg-[#f97316] text-white hover:bg-[#ea6a0a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
