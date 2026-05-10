import { useState, useRef } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Search, FileText, TrendingUp, Zap, Award, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatURL } from "@/components/LeadMagnet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mreyovlw";

type Plan = {
  id: string;
  icon: typeof Search;
  name: string;
  subtext: string;
  badge?: string;
  formTitle: string;
  button: string;
};

const PLANS: Plan[] = [
  {
    id: "free-audit",
    icon: Search,
    name: "Free Growth Audit",
    subtext:
      "Not sure where to start. Let Georgia personally review your site at no cost.",
    badge: "Most popular",
    formTitle: "Tell Us About Your Site",
    button: "Send My Site for Review →",
  },
  {
    id: "seo-audit",
    icon: FileText,
    name: "SEO Audit $197",
    subtext:
      "Full PDF report with screenshots and proof of every issue on your site.",
    formTitle: "Let Us Start Your Audit",
    button: "Request My Audit Report →",
  },
  {
    id: "foundation",
    icon: TrendingUp,
    name: "Foundation $597/mo",
    subtext:
      "Up to 10 pages optimized. Google Maps. Rankings. Monthly reports.",
    formTitle: "Let Us Grow Your Business",
    button: "Send My Details →",
  },
  {
    id: "growth",
    icon: Zap,
    name: "Growth $1,497/mo",
    subtext:
      "30 pages, link building, AEO, GEO and competitor analysis.",
    badge: "RECOMMENDED",
    formTitle: "Let Us Grow Your Business",
    button: "Send My Details →",
  },
  {
    id: "authority",
    icon: Award,
    name: "Authority $2,997/mo",
    subtext:
      "Full market dominance. Dedicated strategist. Unlimited pages.",
    formTitle: "Let Us Grow Your Business",
    button: "Send My Details →",
  },
];

const CHALLENGES = [
  "Not enough traffic from Google",
  "Not ranking for my main keywords",
  "Not showing up on Google Maps",
  "Site is slow or not working properly",
  "Not getting leads or inquiries",
  "Tried SEO before and saw no results",
  "Just launched and need to get found",
  "Not sure where to start",
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Your name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  website: z
    .string()
    .trim()
    .min(1, "Your website URL is required")
    .max(255)
    .refine(
      (v) => /^(https?:\/\/)?[^\s]+\.[^\s]+/.test(v),
      "Please enter a valid website URL"
    ),
  challenge: z.enum(CHALLENGES, {
    errorMap: () => ({ message: "Please pick your biggest challenge" }),
  }),
});

const Contact = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    challenge: "" as "" | (typeof CHALLENGES)[number],
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const selectedPlan = PLANS.find((p) => p.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `New ${selectedPlan.name} Request from ${parsed.data.name}`,
          _replyto: parsed.data.email,
          source: "Contact Page",
          plan: selectedPlan.name,
          ...parsed.data,
        }),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", website: "", challenge: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d1f35" }}>
      <SEO
        title="Contact Georgia J. Chase | Pick Your SEO Plan"
        description="Pick the option that fits you. Fill in 4 quick fields and Georgia personally replies within 24 hours."
        path="/contact"
      />
      <Navbar />

      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <AnimatedSection className="text-center mb-12">
            <h1 className="section-title mb-5 text-white">
              Where Would You Like to Start?
            </h1>
            <p className="fluid-lead text-slate-300">
              Pick the option that fits you right now. Fill in 4 quick fields
              and we will get back to you personally within 24 hours.
            </p>
          </AnimatedSection>

          {/* Plan cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
          >
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              const isSelected = selectedId === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => handleSelect(plan.id)}
                  aria-pressed={isSelected}
                  className="text-left transition-all duration-200 relative cursor-pointer hover:-translate-y-0.5"
                  style={{
                    backgroundColor: isSelected ? "#1e3a5f" : "#1a2f4a",
                    border: isSelected
                      ? "3px solid #22c55e"
                      : "1px solid rgba(34,197,94,0.4)",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: isSelected
                      ? "0 0 0 4px rgba(34,197,94,0.15), 0 8px 24px rgba(34,197,94,0.25)"
                      : "none",
                  }}
                >
                  {plan.badge && (
                    <span
                      className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded"
                      style={{
                        backgroundColor: "#22c55e",
                        color: "#0d1f35",
                      }}
                    >
                      {plan.badge}
                    </span>
                  )}
                  <Icon
                    className="mb-3"
                    style={{ color: "#22c55e" }}
                    size={28}
                  />
                  <h3 className="text-white font-bold text-lg mb-1.5">
                    {plan.name}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {plan.subtext}
                  </p>
                  {isSelected && (
                    <p className="mt-3 text-xs font-semibold" style={{ color: "#22c55e" }}>
                      ✓ Selected see form below
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Form */}
          {selectedPlan && (
            <div
              ref={formRef}
              className="animate-fade-in"
              style={{ animationDuration: "0.4s" }}
            >
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <p className="text-sm" style={{ color: "#22c55e" }}>
                  You selected: <span className="font-semibold">{selectedPlan.name}</span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs underline text-slate-400 hover:text-white"
                >
                  change
                </button>
              </div>

              <div
                className="rounded-2xl p-6 sm:p-8"
                style={{
                  backgroundColor: "#1a2f4a",
                  border: "1px solid #22c55e",
                }}
              >
                <h2 className="font-heading font-bold text-2xl text-white mb-6">
                  {selectedPlan.formTitle}
                </h2>

                {sent ? (
                  <div className="text-center py-10">
                    <p className="font-heading font-bold text-2xl text-white mb-2">
                      Thank you.
                    </p>
                    <p className="text-slate-300">
                      Georgia will personally review your details and reply within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <input type="hidden" name="plan" value={selectedPlan.name} />

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">
                        Your name
                      </label>
                      <Input
                        id="name"
                        required
                        maxLength={100}
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="h-11 rounded-lg text-white border-white/10 focus-visible:ring-[#22c55e] focus-visible:border-[#22c55e]"
                        style={{ backgroundColor: "#0d1f35" }}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
                        Your email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        maxLength={255}
                        placeholder="jane@yourbusiness.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="h-11 rounded-lg text-white border-white/10 focus-visible:ring-[#22c55e] focus-visible:border-[#22c55e]"
                        style={{ backgroundColor: "#0d1f35" }}
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-white mb-1.5">
                        Your website URL
                      </label>
                      <Input
                        id="website"
                        type="text"
                        required
                        placeholder="https://yourbusiness.com"
                        maxLength={255}
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                        className="h-11 rounded-lg text-white border-white/10 focus-visible:ring-[#22c55e] focus-visible:border-[#22c55e]"
                        style={{ backgroundColor: "#0d1f35" }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">
                        What is your biggest challenge right now?
                      </label>
                      <Select
                        value={form.challenge || undefined}
                        onValueChange={(v) =>
                          setForm({ ...form, challenge: v as (typeof CHALLENGES)[number] })
                        }
                      >
                        <SelectTrigger
                          className="h-11 rounded-lg text-white border-white/10"
                          style={{ backgroundColor: "#0d1f35" }}
                        >
                          <SelectValue placeholder="Select your biggest challenge" />
                        </SelectTrigger>
                        <SelectContent>
                          {CHALLENGES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-12 rounded-full font-semibold text-base text-white"
                      style={{ backgroundColor: "#22c55e" }}
                    >
                      {submitting ? "Sending..." : selectedPlan.button}
                    </Button>

                    <p className="text-xs text-slate-400 text-center leading-relaxed pt-1">
                      Georgia reviews every submission personally. You will hear back within 24 hours. No payment is taken until we have spoken and confirmed everything is right for you.
                    </p>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* WhatsApp CTA */}
          <div
            className="mt-12 rounded-2xl p-6 sm:p-8 text-center"
            style={{
              backgroundColor: "#1a2f4a",
              border: "1px solid #22c55e",
            }}
          >
            <h2 className="font-heading font-bold text-2xl text-white mb-2">
              Prefer to Talk First?
            </h2>
            <p className="text-slate-300 mb-5">
              Message us directly on WhatsApp and we will reply within a few hours.
            </p>
            <a
              href="https://wa.me/16397632098?text=Hi%20Georgia%2C%20I%20am%20interested%20in%20your%20SEO%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#22c55e" }}
            >
              <MessageCircle size={18} />
              Open WhatsApp →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
