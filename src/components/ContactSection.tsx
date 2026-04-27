import { useState } from "react";
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
const WHATSAPP_NUMBER = "16397632098"; // +1 (639) 763-2098
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
  phone: z.string().trim().min(5, "Phone is required").max(30),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const planSchema = z.object({
  plan: z.enum(["Starter", "Growth", "Enterprise"]),
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  website: z.string().trim().url("Invalid URL").max(255).or(z.literal("")),
});

const cardClass =
  "relative bg-white/[0.03] backdrop-blur-xl backdrop-saturate-150 border border-white/10 rounded-2xl p-6 sm:p-7 h-full shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_30px_hsl(var(--primary)/0.35)] hover:-translate-y-1";

const iconWrapClass =
  "w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 text-primary";

const ContactSection = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [contactSent, setContactSent] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  const [planForm, setPlanForm] = useState({
    plan: "" as "" | "Starter" | "Growth" | "Enterprise",
    name: "",
    email: "",
    website: "",
  });
  const [planSent, setPlanSent] = useState(false);
  const [planSubmitting, setPlanSubmitting] = useState(false);

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
        setContactForm({ name: "", email: "", phone: "", message: "" });
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
      {/* Ambient orange glow */}
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

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
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
                <div className="rounded-xl bg-primary/15 border border-primary/30 p-5 text-center">
                  <p className="font-heading font-semibold text-foreground mb-1">
                    Thank you!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitContact} className="space-y-3">
                  <Input
                    placeholder="Your name"
                    required
                    maxLength={100}
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="h-11 rounded-lg bg-background/60 border-white/10"
                  />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    required
                    maxLength={255}
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="h-11 rounded-lg bg-background/60 border-white/10"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    required
                    maxLength={30}
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    className="h-11 rounded-lg bg-background/60 border-white/10"
                  />
                  <Textarea
                    placeholder="Your message"
                    required
                    maxLength={1000}
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    className="rounded-lg bg-background/60 border-white/10 resize-none"
                  />
                  <Button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-forest-dark rounded-full h-11"
                  >
                    {contactSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* 2. WhatsApp + 3. Email stacked */}
          <div className="grid grid-rows-2 gap-6 lg:gap-8 h-full">
            <AnimatedSection delay={0.1} className="h-full">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} flex flex-col justify-between group`}
              >
                <div>
                  <div className={iconWrapClass}>
                    <MessageCircle size={22} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    WhatsApp Me
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Quickest way to chat. Pre-filled message ready to send.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Open WhatsApp →
                </span>
              </a>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="h-full">
              <a
                href={MAILTO_URL}
                className={`${cardClass} flex flex-col justify-between group`}
              >
                <div>
                  <div className={iconWrapClass}>
                    <Mail size={22} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    Email Me Directly
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Opens your email app with the subject already filled in.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all break-all">
                  {EMAIL_ADDRESS} →
                </span>
              </a>
            </AnimatedSection>
          </div>

          {/* 4. Pricing Plan Selector — full width on its own row */}
          <AnimatedSection delay={0.15} className="md:col-span-2 h-full">
            <div className={cardClass}>
              <div className="flex items-start gap-4">
                <div className={`${iconWrapClass} mb-0 shrink-0`}>
                  <Sparkles size={22} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    Already Know Which Plan You Want?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Pick a plan and send me your details. I'll confirm everything within 24 hours.
                  </p>
                </div>
              </div>

              {planSent ? (
                <div className="mt-5 rounded-xl bg-primary/15 border border-primary/30 p-5 text-center">
                  <p className="font-heading font-semibold text-foreground mb-1">
                    Thank you!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your plan request has been sent. I'll be in touch shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={submitPlan}
                  className="mt-5 grid sm:grid-cols-2 gap-3"
                >
                  <Select
                    value={planForm.plan || undefined}
                    onValueChange={(v) =>
                      setPlanForm({
                        ...planForm,
                        plan: v as "Starter" | "Growth" | "Enterprise",
                      })
                    }
                  >
                    <SelectTrigger className="h-11 rounded-lg bg-background/60 border-white/10 sm:col-span-2">
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
                    className="sm:col-span-2 w-full bg-primary text-primary-foreground hover:bg-forest-dark rounded-full h-11"
                  >
                    {planSubmitting
                      ? "Sending..."
                      : planForm.plan
                      ? `Request ${planForm.plan} Plan →`
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
