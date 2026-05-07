import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = {
  role: "user" | "assistant";
  content: string;
  quickReplies?: string[];
  showLeadForm?: boolean;
};

const CONTACT_EMAIL = "chasegeorgiaj@gmail.com";
const WHATSAPP_NUMBER = "16397632098";

type Stage =
  | "ask_business"
  | "ask_revenue"
  | "ask_pages"
  | "recommend_plan"
  | "ready"
  | "post_lead";

const INITIAL_QUICK_REPLIES = [
  "Local service business",
  "Ecommerce store",
  "SaaS / software",
  "Agency / consulting",
];

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "Hey, quick question. What does your website actually do? Tell me and I will point out exactly what SEO issues are likely holding it back.",
  quickReplies: INITIAL_QUICK_REPLIES,
};

const detectBusinessIssue = (t: string): string => {
  if (/\b(local|restaurant|plumber|dentist|clinic|salon|contractor|service area|hvac|electrician|lawyer)\b/.test(t)) {
    return "Local businesses like yours almost always lose Maps rankings to a half finished Google Business Profile and zero review velocity.";
  }
  if (/\b(ecommerce|shop|store|shopify|woocommerce|product|amazon)\b/.test(t)) {
    return "Ecommerce stores typically bleed traffic from thin product copy and broken category architecture that Google cannot crawl properly.";
  }
  if (/\b(saas|software|platform|app|b2b)\b/.test(t)) {
    return "SaaS sites usually have weak topic authority — Google does not trust the domain on commercial keywords because the content depth is not there.";
  }
  if (/\b(agency|consult|marketing|coach)\b/.test(t)) {
    return "Agency sites usually look great but have zero technical SEO — fast bounce, missing schema, and weak service pages that never rank.";
  }
  if (/\b(blog|content|news|publication|media)\b/.test(t)) {
    return "Content sites almost always fail at search intent matching and internal linking, so Google never sees the topic depth that is actually there.";
  }
  if (/\b(real estate|realtor|property|agent)\b/.test(t)) {
    return "Real estate sites usually fail because city and neighborhood pages are thin and duplicated — Google folds them together and ranks none of them.";
  }
  return "Sites like yours usually lose rankings to weak technical SEO, thin landing pages, and missing schema. Invisible problems doing real damage.";
};

const planFromPages = (t: string): { plan: string; price: string; reason: string } => {
  const isEcom = /\becom|shop|store|product|shopify|woocommerce\b/.test(t);
  const num = parseInt((t.match(/\d+/) || ["0"])[0], 10);
  if (isEcom || num > 30 || /\b(many|lots|hundreds|over 30|30\+|50\+)\b/.test(t)) {
    return {
      plan: "Enterprise",
      price: "$3,997",
      reason:
        "At that size you need crawl budget management, schema at scale, and ongoing technical work. Starter and Growth do not cover it.",
    };
  }
  if (num >= 10 || /\b(10 to 30|10-30|medium|twenty|fifteen)\b/.test(t)) {
    return {
      plan: "Growth",
      price: "$1,997",
      reason:
        "That is the sweet spot for real site architecture, internal linking, and content depth. Exactly what Growth is built for.",
    };
  }
  return {
    plan: "Starter",
    price: "$997",
    reason:
      "Under 10 pages means we can lock down on-page SEO and local rankings fast. Starter is the right fit.",
  };
};

const READY_RX = /\b(yes|yeah|yep|sure|ok|okay|sounds good|let'?s do it|i'?m in|sign me up|book|ready|go|do it|please|definitely|absolutely)\b/;

const getReply = (text: string, stage: Stage): { reply: Msg; nextStage: Stage } => {
  const t = text.toLowerCase().trim();

  if (stage === "ask_business") {
    const issue = detectBusinessIssue(t);
    return {
      reply: {
        role: "assistant",
        content: `${issue} What is your monthly revenue target right now?`,
        quickReplies: ["Under $10K", "$10K to $50K", "Over $50K"],
      },
      nextStage: "ask_revenue",
    };
  }

  if (stage === "ask_revenue") {
    return {
      reply: {
        role: "assistant",
        content: "Got it. How many pages does your website have?",
        quickReplies: ["Under 10 pages", "10 to 30 pages", "Over 30 pages"],
      },
      nextStage: "ask_pages",
    };
  }

  if (stage === "ask_pages") {
    const { plan, price, reason } = planFromPages(t);
    return {
      reply: {
        role: "assistant",
        content: `Recommend the ${plan} plan at ${price}/mo. ${reason}`,
        quickReplies: ["Sounds good", "Tell me more"],
      },
      nextStage: "recommend_plan",
    };
  }

  if (stage === "recommend_plan") {
    if (READY_RX.test(t) || /sounds good/.test(t)) {
      return {
        reply: {
          role: "assistant",
          content:
            "This is exactly what Georgia fixes. Drop your name, email and website URL and she will personally audit your site within 24 hours and send you a specific action plan. Completely free.",
          showLeadForm: true,
        },
        nextStage: "ready",
      };
    }
    return {
      reply: {
        role: "assistant",
        content:
          "Every plan is month to month and starts with a free audit so you see the specific issues before paying. Want Georgia to take a look at your site?",
        quickReplies: ["Yes, audit my site", "Not yet"],
      },
      nextStage: "recommend_plan",
    };
  }

  if (stage === "ready") {
    return {
      reply: {
        role: "assistant",
        content:
          "Drop your name, email and website URL below and Georgia will personally audit your site within 24 hours.",
        showLeadForm: true,
      },
      nextStage: "ready",
    };
  }

  // post_lead / fallback
  return {
    reply: {
      role: "assistant",
      content:
        "Georgia will email you within 24 hours. Anything else you want to know in the meantime?",
      quickReplies: ["How long until results?", "What is included?"],
    },
    nextStage: "post_lead",
  };
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_GREETING]);
  const [stage, setStage] = useState<Stage>("ask_business");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Lead form state
  const [lead, setLead] = useState({ name: "", email: "", website: "" });
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, open]);

  useEffect(() => {
    if (open) {
      setHasOpened(true);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const { reply, nextStage } = getReply(trimmed, stage);
      setMessages((prev) => [...prev, reply]);
      setStage(nextStage);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name.trim() || !lead.email.trim() || !lead.website.trim()) return;
    setLeadSubmitting(true);

    // Build a pre-filled mailto so the visitor's request reaches Georgia
    const subject = encodeURIComponent(`Free Website Check ${lead.name}`);
    const body = encodeURIComponent(
      `Name: ${lead.name}\nEmail: ${lead.email}\nWebsite: ${lead.website}\n\nRequesting a free SEO website check.`
    );
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailto;
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: `📩 Sent my details ${lead.name} (${lead.email})`,
        },
        {
          role: "assistant",
          content: `Got it, ${lead.name.split(" ")[0]}. Georgia will personally review ${lead.website} and email you within 24 hours.`,
          quickReplies: ["How long until results?", "What is included?"],
        },
      ]);
      setStage("post_lead");
      setLead({ name: "", email: "", website: "" });
      setLeadSubmitting(false);
    }, 400);
  };

  const lastMsg = messages[messages.length - 1];
  const showQuickReplies =
    !isTyping &&
    lastMsg?.role === "assistant" &&
    lastMsg.quickReplies &&
    lastMsg.quickReplies.length > 0;
  const showLeadForm = !isTyping && lastMsg?.role === "assistant" && lastMsg.showLeadForm;

  return (
    <>
      {/* Floating bubble button — bottom right, ABOVE WhatsApp button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat with Georgia's SEO assistant"
          className="fixed z-50 right-5 bottom-24 h-14 w-14 rounded-full bg-[#22c55e] text-white shadow-[0_8px_30px_rgba(34,197,94,0.55)] flex items-center justify-center hover:scale-105 transition-transform animate-pulse"
        >
          <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
          {!hasOpened && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-[#050a18]">
              1
            </span>
          )}
        </button>
      )}

      {/* Floating WhatsApp button — bottom right, below chat */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Georgia, I'm interested in your SEO services")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Georgia on WhatsApp"
        className="fixed z-40 right-5 bottom-5 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] flex items-center justify-center hover:scale-105 transition-transform"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.86 11.86 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.44ZM12.05 21.3h-.01a9.45 9.45 0 0 1-4.82-1.32l-.34-.2-3.8 1 1.02-3.7-.22-.38a9.43 9.43 0 0 1-1.45-5.06c0-5.22 4.25-9.47 9.47-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.31 9.47Zm5.2-7.1c-.28-.14-1.69-.83-1.95-.93-.26-.1-.45-.14-.64.14-.19.28-.74.93-.9 1.12-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.18-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.46-.48-.64-.49l-.55-.01a1.06 1.06 0 0 0-.77.36c-.26.28-1 .98-1 2.39 0 1.41 1.03 2.78 1.17 2.97.14.19 2.02 3.08 4.9 4.32.69.3 1.22.47 1.64.6.69.22 1.31.19 1.81.12.55-.08 1.69-.69 1.93-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.54-.33Z" />
        </svg>
      </a>

      {/* Chat window — bottom right */}
      {open && (
        <div
          className="fixed z-50 right-5 bottom-5 flex flex-col rounded-2xl border border-[#22c55e]/30 bg-[#050a18] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-in"
          style={{
            width: "min(340px, calc(100vw - 2.5rem))",
            height: "min(540px, calc(100vh - 2.5rem))",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1e] border-b border-[#22c55e]/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-[#22c55e] flex items-center justify-center text-white font-semibold text-sm">
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
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-[#050a18]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm px-3 py-2 text-sm bg-[#22c55e] text-white whitespace-pre-wrap break-words"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm px-3 py-2 text-sm bg-[#0a0f1e] text-white/90 border border-[#22c55e]/40 whitespace-pre-wrap break-words"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isTyping && (
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

            {/* Quick replies */}
            {showQuickReplies && (
              <div className="pt-2 flex flex-wrap gap-2">
                {lastMsg.quickReplies!.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-transparent text-[#22c55e] border border-[#22c55e] hover:bg-[#22c55e] hover:text-white transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Lead capture form */}
            {showLeadForm && (
              <form
                onSubmit={submitLead}
                className="mt-2 space-y-2 rounded-xl border border-[#22c55e]/40 bg-[#0a0f1e] p-3"
              >
                <p className="text-xs text-white/70">Free website check. Georgia replies in 24h</p>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  className="w-full bg-[#050a18] text-white placeholder-white/40 text-sm rounded-md px-3 py-2 border border-[#22c55e]/30 focus:outline-none focus:border-[#22c55e]"
                />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  className="w-full bg-[#050a18] text-white placeholder-white/40 text-sm rounded-md px-3 py-2 border border-[#22c55e]/30 focus:outline-none focus:border-[#22c55e]"
                />
                <input
                  type="url"
                  required
                  placeholder="https://yourbusiness.com"
                  value={lead.website}
                  onChange={(e) => setLead({ ...lead, website: e.target.value })}
                  className="w-full bg-[#050a18] text-white placeholder-white/40 text-sm rounded-md px-3 py-2 border border-[#22c55e]/30 focus:outline-none focus:border-[#22c55e]"
                />
                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white text-sm font-semibold rounded-md py-2 transition-colors disabled:opacity-60"
                >
                  {leadSubmitting ? "Sending..." : "Send my details"}
                </button>
              </form>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 px-3 py-3 bg-[#0a0f1e] border-t border-[#22c55e]/30"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about SEO, pricing, results..."
              disabled={isTyping}
              className="flex-1 bg-[#050a18] text-white placeholder-white/40 text-sm rounded-full px-4 py-2 border border-[#22c55e]/30 focus:outline-none focus:border-[#22c55e] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              aria-label="Send message"
              className="h-9 w-9 flex items-center justify-center rounded-full bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
