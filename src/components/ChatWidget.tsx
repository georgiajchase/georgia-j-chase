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

const INITIAL_QUICK_REPLIES = [
  "What does SEO cost?",
  "Which plan is right for me?",
  "How long until I see results?",
  "What services do you offer?",
  "Get a free website check",
];

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "Hi, I'm Georgia's SEO assistant 👋 I can help with pricing, services, expected results, or set you up with a free website check. What can I help you with?",
  quickReplies: INITIAL_QUICK_REPLIES,
};

// Smart pre-written responses based on keyword matching
const getSmartReply = (text: string): Msg => {
  const t = text.toLowerCase();

  // Lead capture intent
  if (
    /\b(get started|sign me up|book|free check|free website check|review my site|audit|i'?m ready|ready to start|interested|let'?s do it|sign up)\b/.test(
      t
    )
  ) {
    return {
      role: "assistant",
      content:
        "Amazing! I'll set you up with a free website check from Georgia. Just drop your details below and she'll personally review your site within 24 hours.",
      showLeadForm: true,
    };
  }

  // Pricing
  if (/\b(price|pricing|cost|how much|plan|plans|package|fee|monthly|budget)\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Here are Georgia's monthly SEO plans:\n\n• Starter — $997/mo (great for local businesses)\n• Growth — $1,997/mo (most popular, for scaling traffic)\n• Enterprise — $3,997/mo (full-service for ecommerce & SaaS)\n\nWant me to help you pick the right one?",
      quickReplies: ["Which plan is right for me?", "Get a free website check"],
    };
  }

  // Plan recommendation
  if (/\b(which plan|right plan|recommend|best plan|which one|suggest)\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Quick guide:\n\n• Local business or service area? → Starter ($997)\n• Want serious traffic & lead growth? → Growth ($1,997)\n• Ecommerce or SaaS scaling fast? → Enterprise ($3,997)\n\nWhat type of business do you run?",
      quickReplies: ["Local business", "Ecommerce store", "SaaS / Software", "Get a free website check"],
    };
  }

  if (/\blocal business\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Perfect — the Starter plan ($997/mo) is built for local businesses. Georgia ranked a local client #1 in Google Maps in 30 days, with leads up 280%. Want a free check on your site?",
      quickReplies: ["Get a free website check", "What does Local SEO include?"],
    };
  }

  if (/\becommerce\b|\be-?commerce\b|\bonline store\b|\bshopify\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Ecommerce SEO is one of Georgia's specialties. One client went from page 5 to #1 in 60 days, traffic up 340%, revenue grew $127K. Growth ($1,997) or Enterprise ($3,997) plans work best for stores.",
      quickReplies: ["Get a free website check", "What does Ecommerce SEO include?"],
    };
  }

  if (/\bsaas\b|\bsoftware\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "For SaaS, Georgia grew one client from 200 to 15,000 organic visitors/mo in 6 months. The Enterprise plan ($3,997) is the right fit for SaaS scaling.",
      quickReplies: ["Get a free website check", "How long until I see results?"],
    };
  }

  // Results / timeline
  if (
    /\b(how long|results|when|timeline|time frame|how soon|quickly|fast|see results|take to)\b/.test(
      t
    )
  ) {
    return {
      role: "assistant",
      content:
        "Most clients see meaningful movement in 30–90 days:\n\n• 30 days — technical fixes ranking, early traffic lift\n• 60 days — keyword positions climbing, more leads\n• 90 days — compounding traffic & revenue growth\n\nSEO is a long game, but Georgia's approach gets early wins fast.",
      quickReplies: ["What does SEO cost?", "Get a free website check"],
    };
  }

  // Services
  if (
    /\b(service|services|what do you do|what does|offer|specialize|specialty|help with)\b/.test(t)
  ) {
    return {
      role: "assistant",
      content:
        "Georgia offers 5 core services:\n\n• Local SEO — rank in Google Maps & local search\n• Ecommerce SEO — drive product page traffic & revenue\n• Technical SEO Audit — fix what's holding your site back\n• Link Building — authority through quality backlinks\n• Content Strategy — content that ranks and converts\n\nWhich one sounds most relevant to you?",
      quickReplies: [
        "Local SEO",
        "Ecommerce SEO",
        "Technical Audit",
        "Link Building",
        "Content Strategy",
      ],
    };
  }

  if (/\blocal seo\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Local SEO gets you found by nearby customers — Google Maps rankings, local pack visibility, optimized Google Business Profile, location pages, and local citations. Typical timeline: 30–60 days for first ranking moves.",
      quickReplies: ["What does it cost?", "Get a free website check"],
    };
  }

  if (/\becommerce seo\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Ecommerce SEO covers product page optimization, category architecture, schema markup, technical performance, and content that drives buyers. Built for revenue, not just traffic.",
      quickReplies: ["What does it cost?", "Get a free website check"],
    };
  }

  if (/\btechnical (audit|seo)\b|\baudit\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "The Technical SEO Audit finds everything blocking your rankings — site speed, crawl issues, indexing, Core Web Vitals, broken links, and on-page issues. You get a prioritized fix list.",
      quickReplies: ["Get a free website check", "What does it cost?"],
    };
  }

  if (/\blink building\b|\bbacklinks?\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Quality over quantity — Georgia builds authority through editorial links, guest posts, digital PR, and niche-relevant placements. No spam, no PBNs.",
      quickReplies: ["What does it cost?", "Get a free website check"],
    };
  }

  if (/\bcontent (strategy|marketing)\b|\bblog\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Content Strategy = keyword research → content briefs → SEO-optimized articles → internal linking. Built to rank AND convert visitors into leads.",
      quickReplies: ["What does it cost?", "Get a free website check"],
    };
  }

  // Contact
  if (/\b(contact|email|reach|whatsapp|phone|call|talk to georgia)\b/.test(t)) {
    return {
      role: "assistant",
      content: `You can reach Georgia directly:\n\n📧 ${CONTACT_EMAIL}\n💬 WhatsApp: +1 (639) 763-2098\n\nOr drop your details below and she'll come to you within 24 hours.`,
      showLeadForm: true,
    };
  }

  // Greetings
  if (/^(hi|hey|hello|yo|sup|howdy)\b/.test(t)) {
    return {
      role: "assistant",
      content: "Hey! 👋 What would you like to know — pricing, services, or expected results?",
      quickReplies: INITIAL_QUICK_REPLIES,
    };
  }

  if (/\b(thanks|thank you|ty|cheers)\b/.test(t)) {
    return {
      role: "assistant",
      content: "Anytime! Want me to set you up with a free website check from Georgia?",
      quickReplies: ["Yes, get me started", "Maybe later"],
    };
  }

  if (/\bmaybe later\b|\bnot now\b/.test(t)) {
    return {
      role: "assistant",
      content: "No worries! I'm here whenever you're ready. Anything else I can help with?",
      quickReplies: INITIAL_QUICK_REPLIES,
    };
  }

  if (/\byes\b.*\b(get me started|started)\b|^yes$/.test(t)) {
    return {
      role: "assistant",
      content:
        "Great! Drop your details below and Georgia will personally review your site within 24 hours.",
      showLeadForm: true,
    };
  }

  // Fallback
  return {
    role: "assistant",
    content:
      "Good question! I can help with pricing, services, expected results, or set you up with a free website check. Or reach Georgia directly at " +
      CONTACT_EMAIL +
      ". What would you like?",
    quickReplies: INITIAL_QUICK_REPLIES,
  };
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_GREETING]);
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

    // Simulate thinking delay
    setTimeout(() => {
      const reply = getSmartReply(trimmed);
      setMessages((prev) => [...prev, reply]);
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
    const subject = encodeURIComponent(`Free Website Check — ${lead.name}`);
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
          content: `📩 Sent my details — ${lead.name} (${lead.email})`,
        },
        {
          role: "assistant",
          content: `Got it, ${lead.name.split(" ")[0]}! 🎉 Georgia will personally review ${lead.website} and email you back within 24 hours at ${lead.email}. Talk soon!`,
          quickReplies: ["What does SEO cost?", "How long until I see results?"],
        },
      ]);
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
          className="fixed z-50 right-5 bottom-24 h-14 w-14 rounded-full bg-[#f97316] text-white shadow-[0_8px_30px_rgba(249,115,22,0.55)] flex items-center justify-center hover:scale-105 transition-transform animate-pulse"
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
          className="fixed z-50 right-5 bottom-5 flex flex-col rounded-2xl border border-[#f97316]/30 bg-[#050a18] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-in"
          style={{
            width: "min(340px, calc(100vw - 2.5rem))",
            height: "min(540px, calc(100vh - 2.5rem))",
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
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-[#050a18]">
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
                  {m.content}
                </div>
              </div>
            ))}

            {isTyping && (
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

            {/* Quick replies */}
            {showQuickReplies && (
              <div className="pt-2 flex flex-wrap gap-2">
                {lastMsg.quickReplies!.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-transparent text-[#f97316] border border-[#f97316] hover:bg-[#f97316] hover:text-white transition-colors"
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
                className="mt-2 space-y-2 rounded-xl border border-[#f97316]/40 bg-[#0a0f1e] p-3"
              >
                <p className="text-xs text-white/70">Free website check — Georgia replies in 24h</p>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  className="w-full bg-[#050a18] text-white placeholder-white/40 text-sm rounded-md px-3 py-2 border border-[#f97316]/30 focus:outline-none focus:border-[#f97316]"
                />
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  className="w-full bg-[#050a18] text-white placeholder-white/40 text-sm rounded-md px-3 py-2 border border-[#f97316]/30 focus:outline-none focus:border-[#f97316]"
                />
                <input
                  type="url"
                  required
                  placeholder="https://yourbusiness.com"
                  value={lead.website}
                  onChange={(e) => setLead({ ...lead, website: e.target.value })}
                  className="w-full bg-[#050a18] text-white placeholder-white/40 text-sm rounded-md px-3 py-2 border border-[#f97316]/30 focus:outline-none focus:border-[#f97316]"
                />
                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="w-full bg-[#f97316] hover:bg-[#ea6a0a] text-white text-sm font-semibold rounded-md py-2 transition-colors disabled:opacity-60"
                >
                  {leadSubmitting ? "Sending..." : "Send my details"}
                </button>
              </form>
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
              disabled={isTyping}
              className="flex-1 bg-[#050a18] text-white placeholder-white/40 text-sm rounded-full px-4 py-2 border border-[#f97316]/30 focus:outline-none focus:border-[#f97316] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
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
