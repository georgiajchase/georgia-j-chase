import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";

const LeadForm = () => {
  const [form, setForm] = useState({ name: "", email: "", website: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mreyovlw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          website: form.website,
          _replyto: form.email,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", website: "" });
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
    <section id="lead-form" className="py-20 bg-forest-light">
      <div className="container mx-auto px-4 max-w-xl">
        <AnimatedSection className="text-center mb-10">
          <p className="section-label mb-3">Get Started</p>
          <h2 className="section-title mb-4">Let's Find What's Blocking Your Website</h2>
           <p className="text-muted-foreground leading-relaxed">
             Just send me your website and I'll take a quick look. I'll tell you what I find, and you can decide what you'd like to do from there. It's completely up to you.
           </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          {submitted ? (
            <div className="rounded-xl bg-primary p-8 text-center text-primary-foreground shadow-lg">
              <h3 className="text-xl font-heading font-bold mb-3">Thank you!</h3>
              <p className="leading-relaxed">
                I have received your details and will review your website within 24 hours. Check your inbox for my reply from Georgia.
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-12 rounded-lg bg-background"
                  name="name"
                />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-12 rounded-lg bg-background"
                  name="email"
                />
                <Input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  required
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="h-12 rounded-lg bg-background"
                  name="website"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-forest-dark rounded-full text-base h-12"
                >
                  {submitting ? "Sending..." : "Show Me What's Blocking My Website →"}
                </Button>
              </form>
               <p className="text-center text-xs text-muted-foreground mt-4">
                 It's completely free and there's no obligation. I'll get back to you within 24 hours.
               </p>
            </>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LeadForm;
