import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Mail, MessageCircle, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import AnimatedSection from "./AnimatedSection";
import { z } from "zod";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mreyovlw";
const EMAIL_ADDRESS = "chasegeorgiaj@gmail.com";
const WHATSAPP_NUMBER = "16397632098";
const WHATSAPP_MESSAGE = "Hi Georgia, I'm interested in your SEO services";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
const MAILTO_URL = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
  "SEO Services Inquiry"
)}`;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const planSchema = z.object({
  plan: z.enum(["Starter", "Growth", "Enterprise"]),
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  website: z.string().trim().url("Invalid URL").max(255).or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const cardClass =
  "relative bg-white/[0.03] backdrop-blur-xl backdrop-saturate-150 border border-primary/30 rounded-2xl p-6 sm:p-7 h-full flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_30px_hsl(var(--primary)/0.35)] hover:-translate-y-1";

const iconWrapClass =
  "w-12 h-12 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-center mb-4 text-primary shrink-0";

const orangeBtnClass =
  "w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11 font-semibold";

const ContactSection = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactSent, setContactSent] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  const [planForm, setPlanForm] = useState({
    plan: "" as "" | "Starter" | "Growth" | "Enterprise",
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });
  const [planSent, setPlanSent] = useState(false);
  const [planSubmitting, setPlanSubmitting] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");
    if (plan === "Starter" || plan === "Growth" || plan === "Enterprise") {
      setPlanForm((p) => ({ ...p, plan }));
    }
    if (location.hash === "#plan-form" || plan) {
      setTimeout(() => {
        document.getElementById("plan-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location.search, location.hash]);

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(contactForm);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    setContactSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "New Contact Form Message",
          _replyto: parsed.data.email,
          source: "Contact Form",
          ...parsed.data,
        }),
      });
      if (res.ok) {
        setContactSent(true);
        setContactForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  const submitPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = planSchema.safeParse(planForm);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    setPlanSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `New Lead: ${parsed.data.plan} Plan Inquiry`,
          _replyto: parsed.data.email,
          source: "Pricing Plan Selector",
          ...parsed.data,
        }),
      });
      if (res.ok) {
        setPlanSent(true);
        setPlanForm({ plan: "", name: "", email: "", website: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setPlanSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-14 sm:py-20 bg-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 max-w-2xl mx-auto">
          <p className="section-label mb-3">Get In Touch</p>
          <h2 className="section-title mb-4">Pick the Way That Works Best for You</h2>
          <p className="fluid-lead text-muted-foreground">
            Four simple ways to reach me. Whichever you choose, I'll get back to you within 24 hours.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {/* 1. Contact Form */}
          <AnimatedSection className="h-full">
            <div className={cardClass}>
              <div className={iconWrapClass}>
                <Send size={22} />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                Send Me a Message
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Tell me about your business and what you're trying to fix.
              </p>

              {contactSent ? (
                <div className="rounded-xl bg-primary/15 border border-primary/30 p-5 text-center mt-auto">
                  <p className="font-heading font-semibold text-foreground mb-1">Thank you!</p>
                  <p className="text-sm text-muted-foreground">
                    I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitContact} className="space-y-3 mt-auto">
                  <Input
                    placeholder="Your name"
                    required
                    maxLength={100}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="h-11 rounded-lg bg-background/60 border-white/10"
                  />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    required
                    maxLength={255}
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="h-11 rounded-lg bg-background/60 border-white/10"
                  />
                  <Textarea
                    placeholder="Your message"
                    required
                    maxLength={1000}
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="rounded-lg bg-background/60 border-white/10 resize-none"
                  />
                  <Button type="submit" disabled={contactSubmitting} className={orangeBtnClass}>
                    {contactSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* 2. WhatsApp */}
          <AnimatedSection delay={0.1} className="h-full">
            <div className={cardClass}>
              <div className={iconWrapClass}>
                <MessageCircle size={22} />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                WhatsApp Me
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Quickest way to chat. Pre filled message ready to send.
              </p>
              <p className="text-sm text-primary font-semibold mb-5 break-all">
                +1 (639) 763 2098
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${orangeBtnClass} mt-auto inline-flex items-center justify-center gap-2`}
              >
                <MessageCircle size={18} /> Open WhatsApp
              </a>
            </div>
          </AnimatedSection>

          {/* 3. Email */}
          <AnimatedSection delay={0.15} className="h-full">
            <div className={cardClass}>
              <div className={iconWrapClass}>
                <Mail size={22} />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                Email Me Directly
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Opens your email app with the subject already filled in.
              </p>
              <a
                href={MAILTO_URL}
                className="text-primary font-semibold text-sm hover:underline break-all mb-5 block"
              >
                {EMAIL_ADDRESS}
              </a>
              <a
                href={MAILTO_URL}
                className={`${orangeBtnClass} mt-auto inline-flex items-center justify-center gap-2`}
              >
                <Mail size={18} /> Send Email
              </a>
            </div>
          </AnimatedSection>

          {/* 4. Pricing Plan Selector */}
          <AnimatedSection delay={0.2} className="h-full">
            <div className={cardClass}>
              <div className={iconWrapClass}>
                <Sparkles size={22} />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                Already Know Your Plan?
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Pick a plan and send your details. I'll confirm within 24 hours.
              </p>

              {planSent ? (
                <div className="rounded-xl bg-primary/15 border border-primary/30 p-5 text-center mt-auto">
                  <p className="font-heading font-semibold text-foreground mb-1">Thank you!</p>
                  <p className="text-sm text-muted-foreground">
                    Your plan request has been sent.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitPlan} className="space-y-3 mt-auto">
                  <Select
                    value={planForm.plan || undefined}
                    onValueChange={(v) =>
                      setPlanForm({
                        ...planForm,
                        plan: v as "Starter" | "Growth" | "Enterprise",
                      })
                    }
                  >
                    <SelectTrigger className="h-11 rounded-lg bg-background/60 border-white/10">
                      <SelectValue placeholder="Select a plan…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Starter">Starter — $997/mo</SelectItem>
                      <SelectItem value="Growth">Growth — $1,997/mo</SelectItem>
                      <SelectItem value="Enterprise">Enterprise — $3,997/mo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Your name"
                    required
                    maxLength={100}
                    value={planForm.name}
                    onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                    className="h-11 rounded-lg bg-background/60 border-white/10"
                  />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    required
                    maxLength={255}
                    value={planForm.email}
                    onChange={(e) => setPlanForm({ ...planForm, email: e.target.value })}
                    className="h-11 rounded-lg bg-background/60 border-white/10"
                  />
                  <Input
                    type="url"
                    placeholder="https://yourbusiness.com (optional)"
                    maxLength={255}
                    value={planForm.website}
                    onChange={(e) => setPlanForm({ ...planForm, website: e.target.value })}
                    className="h-11 rounded-lg bg-background/60 border-white/10"
                  />
                  <Button
                    type="submit"
                    disabled={planSubmitting || !planForm.plan}
                    className={orangeBtnClass}
                  >
                    {planSubmitting
                      ? "Sending..."
                      : planForm.plan
                      ? `Submit ${planForm.plan} Request`
                      : "Pick a plan to continue"}
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
