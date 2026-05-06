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
  "I run a local business",
  "I have an ecommerce store",
  "I run a SaaS",
  "Pricing",
  "Free website check",
];

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "Hey, I am Georgia's assistant. Quick question — what does your website do? I will tell you exactly what SEO issues are likely holding it back.",
  quickReplies: INITIAL_QUICK_REPLIES,
};

const getSmartReply = (text: string): Msg => {
  const t = text.toLowerCase();

  // Lead capture intent
  if (
    /\b(get started|sign me up|book|free check|free website check|review my site|audit|i'?m ready|ready to start|let'?s do it|sign up|yes please|drop my details)\b/.test(
      t
    )
  ) {
    return {
      role: "assistant",
      content:
        "Perfect — drop your name, email and website URL and Georgia personally reviews every site within 24 hours with a specific action plan.",
      showLeadForm: true,
    };
  }

  // Pricing → ask page count first
  if (/\b(price|pricing|cost|how much|plan|plans|package|fee|monthly|budget)\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Plans are $997, $1,997 or $3,997 a month. How many pages does your site have so I can tell you which one fits?",
      quickReplies: ["Under 10 pages", "10 to 50 pages", "Over 50 pages"],
    };
  }

  if (/\bunder 10\b|\b1[-\s]?10\b|\bsmall site\b|\bfew pages\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Starter at $997 a month is the right fit — under 10 pages means we can lock down on-page SEO and local rankings fast. Want a free check on your site?",
      quickReplies: ["Yes, free check", "What is included?"],
    };
  }
  if (/\b10 to 50\b|\b10[-\s]?50\b|\bmedium\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Growth at $1,997 a month is built for sites this size — enough pages to need real architecture, internal linking and content depth. Want me to set up your free check?",
      quickReplies: ["Yes, free check", "What is included?"],
    };
  }
  if (/\bover 50\b|\b50\+\b|\blarge\b|\bbig site\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Enterprise at $3,997 a month — sites over 50 pages need crawl budget management, schema at scale and ongoing technical work. Ready for a free site check?",
      quickReplies: ["Yes, free check", "What is included?"],
    };
  }

  // Business types — tailored pain
  if (/\blocal\b|\brestaurant\b|\bplumber\b|\bdentist\b|\bclinic\b|\bsalon\b|\bservice area\b|\bcontractor\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Local businesses usually lose to weak Google Business Profiles, missing location pages and zero review velocity. Are you ranking on Google Maps for your main service yet?",
      quickReplies: ["Not really", "Sometimes", "Free website check"],
    };
  }
  if (/\becommerce\b|\bonline store\b|\bshopify\b|\bwoocommerce\b|\bproducts?\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Ecommerce sites bleed traffic from thin product copy, broken category structure and missing schema. How many products are on the site so I can scope what is breaking?",
      quickReplies: ["Under 50", "50 to 500", "Over 500"],
    };
  }
  if (/\bsaas\b|\bsoftware\b|\bb2b\b|\bplatform\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "SaaS sites usually have a weak content engine and zero topic authority — that is what kills organic signups. Do you have a real blog or content strategy in place?",
      quickReplies: ["No content yet", "Some content", "Free website check"],
    };
  }
  if (/\bblog\b|\bcontent creator\b|\bpersonal\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Content sites usually fail at search intent matching and internal linking — meaning Google never sees the topic depth. What is the niche?",
      quickReplies: ["Tell me more", "Free website check"],
    };
  }
  if (/\bagency\b|\bmarketing\b|\bconsult\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Agencies usually have nice design and zero technical SEO — fast bounce rate, no schema, weak service pages. Want a free audit so I can show you what is actually broken?",
      quickReplies: ["Yes, free check", "Tell me more"],
    };
  }

  // Results / timeline
  if (/\b(how long|results|when|timeline|how soon|quickly|fast|see results|take to)\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Most clients see ranking movement in 30 to 60 days and page 1 results between 60 and 90 days. Want me to set up a free website check so you know exactly where you stand?",
      quickReplies: ["Yes, free check", "Pricing"],
    };
  }

  // Services
  if (/\b(service|services|what do you do|offer|specialize|specialty|help with)\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Six services — Local SEO, Ecommerce SEO, Technical Audit, Link Building, Content Strategy, and Website SEO Design. Which one matches what your business needs right now?",
      quickReplies: ["Local SEO", "Ecommerce SEO", "Technical Audit", "Free website check"],
    };
  }
  if (/\blocal seo\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Local SEO covers Google Business Profile, Maps rankings, location pages and citations — designed for service area businesses. Want me to check how visible your business is right now?",
      quickReplies: ["Yes, free check", "Pricing"],
    };
  }
  if (/\btechnical\b|\baudit\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "The Technical Audit hands you a prioritized fix list — speed, indexing, Core Web Vitals, schema, broken paths. Want yours started this week?",
      quickReplies: ["Yes, free check", "Pricing"],
    };
  }
  if (/\bcontent\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Content Strategy maps every article to real search intent and revenue — not vanity topics. Do you already have a blog live or starting from scratch?",
      quickReplies: ["Have a blog", "Starting fresh", "Free website check"],
    };
  }
  if (/\blink\b|\bbacklinks?\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Link Building here means editorial placements and digital PR — no PBNs, no spam. What does your current backlink profile look like, any idea?",
      quickReplies: ["No idea", "Few links", "Free website check"],
    };
  }

  // Contact
  if (/\b(contact|email|reach|whatsapp|call|talk to georgia)\b/.test(t)) {
    return {
      role: "assistant",
      content: `Reach Georgia direct at ${CONTACT_EMAIL} or via WhatsApp. Want to drop your details for a free site review instead?`,
      showLeadForm: true,
    };
  }

  // Greetings
  if (/^(hi|hey|hello|yo|sup|howdy)\b/.test(t)) {
    return {
      role: "assistant",
      content:
        "Hey, glad you stopped by. What does your website do — local service, ecommerce, SaaS, something else?",
      quickReplies: INITIAL_QUICK_REPLIES,
    };
  }

  // Catch-all — describe site triggers tailored response framework
  return {
    role: "assistant",
    content:
      "Got it. Most sites in that space lose rankings to weak technical SEO, thin content, or missing schema — Georgia can pinpoint the exact issue free in 24 hours. Want to send your URL?",
    quickReplies: ["Yes, free check", "Pricing", "Services"],
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
