import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WHATSAPP_NUMBER = "16397632098";

const QUICK_REPLIES = [
  "What services do you offer?",
  "How much does it cost?",
  "Show me real results",
  "How do I get started?",
  "Who is Georgia?",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I am Georgia's assistant. I know everything about our SEO services, pricing, and results. What brings you here today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  const [auditOpen, setAuditOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { open: boolean } | undefined;
      setAuditOpen(!!detail?.open);
    };
    window.addEventListener("audit-popup-state", handler);
    return () => window.removeEventListener("audit-popup-state", handler);
  }, []);

  useEffect(() => {
    if (popupDismissed) return;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    // On mobile, if audit popup is open, delay chat popup by 30s after it closes
    const delay = isMobile && auditOpen ? 30000 : 3000;
    const timer = setTimeout(() => {
      if (!open && !auditOpen) setShowPopup(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [popupDismissed, open, auditOpen]);

  const handleOpen = () => {
    setOpen(!open);
    setShowBadge(false);
    setShowPopup(false);
    setPopupDismissed(true);
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: updated }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("Too many requests. Please wait a moment.");
        else if (resp.status === 402) toast.error("AI credits exhausted.");
        else toast.error("Chat is temporarily unavailable.");
        setLoading(false);
        return;
      }

      // Add empty assistant message and stream into it
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantSoFar = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
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
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: assistantSoFar };
                return next;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {showPopup && !open && (
        <div
          onClick={() => {
            setShowPopup(false);
            setPopupDismissed(true);
            setOpen(true);
            setShowBadge(false);
          }}
          className="fixed z-50 cursor-pointer"
          style={{
            bottom: "100px",
            right: "20px",
            background: "#0a1628",
            border: "1px solid #22c55e",
            borderRadius: "12px",
            padding: "12px 14px",
            maxWidth: "240px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            animation: "slideUp 0.3s ease",
          }}
        >
          <div className="flex items-start gap-2 mb-2">
            <div className="relative flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-[#22c55e] flex items-center justify-center text-white font-semibold text-xs">
                GJ
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-[#0a1628]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-semibold leading-tight">Georgia J. Chase Team</p>
              <p className="text-green-400 text-[11px] flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-green-500 inline-block" />
                Online now
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPopup(false);
                setPopupDismissed(true);
              }}
              className="text-slate-500 hover:text-slate-300 flex-shrink-0 leading-none"
              style={{ fontSize: "14px", lineHeight: 1 }}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <p className="text-white/90 text-[13px] leading-relaxed mb-2">
            Hey! Is your website getting the traffic it should? Ask me anything and I will tell you exactly what might be holding it back.
          </p>
          <p className="text-[#22c55e] text-[12px] font-medium">Tap to chat →</p>
        </div>
      )}

      {!open && (
        <button
          onClick={handleOpen}
          aria-label="Open chat"
          className="fixed z-50 right-5 bottom-24 h-14 w-14 rounded-full bg-[#22c55e] text-white shadow-[0_8px_30px_rgba(34,197,94,0.55)] flex items-center justify-center hover:scale-105 transition-transform animate-pulse"
          style={{ position: "fixed" }}
        >
          {showBadge && (
            <span
              className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold ring-2 ring-[#050a18]"
              style={{ transform: "translate(2px, -2px)" }}
            >
              1
            </span>
          )}
          <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
        </button>
      )}

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Georgia, I'm interested in your SEO services")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed z-40 right-5 bottom-5 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] flex items-center justify-center hover:scale-105 transition-transform"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.86 11.86 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.44ZM12.05 21.3h-.01a9.45 9.45 0 0 1-4.82-1.32l-.34-.2-3.8 1 1.02-3.7-.22-.38a9.43 9.43 0 0 1-1.45-5.06c0-5.22 4.25-9.47 9.47-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.31 9.47Zm5.2-7.1c-.28-.14-1.69-.83-1.95-.93-.26-.1-.45-.14-.64.14-.19.28-.74.93-.9 1.12-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.18-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.46-.48-.64-.49l-.55-.01a1.06 1.06 0 0 0-.77.36c-.26.28-1 .98-1 2.39 0 1.41 1.03 2.78 1.17 2.97.14.19 2.02 3.08 4.9 4.32.69.3 1.22.47 1.64.6.69.22 1.31.19 1.81.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.54-.33Z" />
        </svg>
      </a>

      {open && (
        <div
          className="fixed z-50 right-5 bottom-5 flex flex-col rounded-2xl border border-[#22c55e]/30 bg-[#050a18] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-in"
          style={{
            width: "min(360px, calc(100vw - 2.5rem))",
            height: "min(560px, calc(100vh - 2.5rem))",
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1e] border-b border-[#22c55e]/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-[#22c55e] flex items-center justify-center text-white font-semibold text-sm">
                  GJ
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[#0a0f1e]" />
              </div>
              <div className="leading-tight">
                <p className="text-white text-sm font-semibold">Georgia J. Chase Team</p>
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

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-[#050a18]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm px-3 py-2 text-sm bg-[#22c55e] text-white whitespace-pre-wrap break-words"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm px-3 py-2 text-sm bg-[#0a0f1e] text-white/90 border border-[#22c55e]/40 whitespace-pre-wrap break-words"
                  }
                >
                  {m.content || (loading && i === messages.length - 1 ? "..." : "")}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm px-3 py-2 bg-[#0a0f1e] border border-[#22c55e]/40">
                  <span className="inline-flex gap-1 items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-bounce [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-bounce [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="px-3 pt-2 pb-1 flex flex-wrap gap-2 bg-[#0a0f1e] border-t border-[#22c55e]/20">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={loading}
                className="text-[11px] px-2.5 py-1 rounded-full border border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 px-3 py-3 bg-[#0a0f1e] border-t border-[#22c55e]/30"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
              className="flex-1 bg-[#050a18] text-white placeholder-white/40 text-sm rounded-full px-4 py-2 border border-[#22c55e]/30 focus:outline-none focus:border-[#22c55e] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="h-9 w-9 flex items-center justify-center rounded-full bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
