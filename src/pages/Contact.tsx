import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mreyovlw";

const CHALLENGES = [
  "Not enough traffic",
  "Not ranking on Google",
  "Site not showing on Maps",
  "Not getting inquiries",
  "Site is slow or broken",
  "Other",
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
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    challenge: "" as "" | (typeof CHALLENGES)[number],
    notes: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          _subject: `New Site Review Request from ${parsed.data.name}`,
          _replyto: parsed.data.email,
          source: "Contact Page",
          ...parsed.data,
        }),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", website: "", challenge: "", notes: "" });
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
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Georgia J. Chase | Free SEO Growth Audit"
        description="Tell Georgia about your business. Every submission is reviewed personally with a reply within 24 hours."
        path="/contact"
      />
      <Navbar />

      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <AnimatedSection className="text-center mb-10">
            <p className="section-label mb-3">Contact</p>
            <h1 className="section-title mb-5">Tell Me About Your Business</h1>
            <p className="fluid-lead text-muted-foreground">
              I look at every submission personally and reply within 24 hours. No automated response. No sales team.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-primary/30 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
              {sent ? (
                <div className="text-center py-10">
                  <p className="font-heading font-bold text-2xl text-foreground mb-2">
                    Thank you.
                  </p>
                  <p className="text-muted-foreground">
                    I'll personally review your site and reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                      Your name
                    </label>
                    <Input
                      id="name"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-11 rounded-lg bg-background/60 border-white/10"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                      Your email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="h-11 rounded-lg bg-background/60 border-white/10"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-foreground mb-1.5">
                      Your website URL
                    </label>
                    <Input
                      id="website"
                      type="url"
                      required
                      placeholder="https://yourbusiness.com"
                      maxLength={255}
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      className="h-11 rounded-lg bg-background/60 border-white/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Your biggest challenge right now
                    </label>
                    <Select
                      value={form.challenge || undefined}
                      onValueChange={(v) =>
                        setForm({ ...form, challenge: v as (typeof CHALLENGES)[number] })
                      }
                    >
                      <SelectTrigger className="h-11 rounded-lg bg-background/60 border-white/10">
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

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1.5">
                      Anything else I should know?{" "}
                      <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <Textarea
                      id="notes"
                      rows={4}
                      maxLength={1000}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="rounded-lg bg-background/60 border-white/10 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-conversion text-conversion-foreground hover:bg-conversion-dark rounded-full font-semibold text-base shadow-lg shadow-conversion/30 animate-pulse-glow-green"
                  >
                    {submitting ? "Sending..." : "Send My Details, I Will Review Your Site"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center leading-relaxed pt-1">
                    Georgia personally reviews every submission. No automated replies. No sales team. Just a straight answer within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
