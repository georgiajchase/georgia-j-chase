import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PricingInquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
}

const PricingInquiryDialog = ({ open, onOpenChange, planName }: PricingInquiryDialogProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", website: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", phone: "", website: "" });
      }, 200);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mreyovlw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `New Lead: ${planName} Plan Inquiry`,
          _replyto: form.email,
          plan: planName,
          name: form.name,
          email: form.email,
          phone: form.phone,
          website: form.website,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground">
            {submitted ? "Thank you!" : `${planName} Plan Inquiry`}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {submitted
              ? "I've received your details and will be in touch within 24 hours."
              : "Tell me a bit about your business and I'll get back to you within 24 hours."}
          </DialogDescription>
        </DialogHeader>

        {!submitted && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <Input
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-11 rounded-lg bg-background"
              name="name"
            />
            <Input
              type="email"
              placeholder="your@email.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-11 rounded-lg bg-background"
              name="email"
            />
            <Input
              type="tel"
              placeholder="Phone number"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="h-11 rounded-lg bg-background"
              name="phone"
            />
            <Input
              type="url"
              placeholder="https://yourbusiness.com"
              required
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="h-11 rounded-lg bg-background"
              name="website"
            />
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground hover:bg-forest-dark rounded-full"
            >
              {submitting ? "Sending..." : `Request ${planName} Plan →`}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PricingInquiryDialog;
