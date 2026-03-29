import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";

const LeadForm = () => {
  const [form, setForm] = useState({ name: "", email: "", website: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks! I'll be in touch within 24 hours.");
    setForm({ name: "", email: "", website: "" });
  };

  return (
    <section id="lead-form" className="py-20 bg-forest-light">
      <div className="container mx-auto px-4 max-w-xl">
        <AnimatedSection className="text-center mb-10">
          <p className="section-label mb-3">Get Started</p>
          <h2 className="section-title mb-4">Let's Find What's Blocking Your Website</h2>
          <p className="text-muted-foreground leading-relaxed">
            Send me your website. I'll take a quick look and tell you what I find. You decide what to do from there. No pressure.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-12 rounded-lg bg-background"
            />
            <Input
              type="email"
              placeholder="your@email.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-12 rounded-lg bg-background"
            />
            <Input
              type="url"
              placeholder="https://yourwebsite.com"
              required
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="h-12 rounded-lg bg-background"
            />
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-forest-dark rounded-full text-base h-12"
            >
              Show Me What's Blocking My Website →
            </Button>
          </form>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Free. No obligation. I'll respond within 24 hours.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LeadForm;
