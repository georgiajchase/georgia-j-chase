import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { reviews } from "@/data/reviews";
import { Star, BadgeCheck, Loader2 } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const FORMSPREE = "https://formspree.io/f/mzzvybkn";
const GOOGLE_REVIEW_URL = "https://g.page/r/georgia-j-chase/review";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  business: z.string().trim().min(1, "Business required").max(150),
  rating: z.number().int().min(1).max(5),
  review: z.string().trim().min(50, "Minimum 50 characters").max(2000),
});

const StarRow = ({ value }: { value: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={16}
        style={i <= value ? { color: "#f97316", fill: "#f97316" } : undefined}
        className={i <= value ? "" : "text-white/20"}
      />
    ))}
  </div>
);

const Reviews = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", business: "", rating: 5, review: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Check your review", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...parsed.data, _subject: "New Review Submitted" }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "Thank you!", description: "Your review has been submitted." });
      setForm({ name: "", business: "", rating: 5, review: "" });
    } catch {
      toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Client Reviews | Georgia J. Chase SEO Specialist"
        description="Real reviews from real businesses Georgia J. Chase has helped rank on Google."
        path="/reviews"
      />
      <Navbar />

      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <AnimatedSection>
            <p className="section-label mb-3">Reviews</p>
            <h1 className="section-title mb-5">What Clients Say</h1>
            <p className="fluid-lead text-muted-foreground">
              Real results from real business owners.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-5">
            {reviews.map((r, i) => (
              <AnimatedSection key={r.name + i} delay={i * 0.05}>
                <article className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-primary/30 p-6 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <StarRow value={r.rating} />
                    {r.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-conversion font-semibold">
                        <BadgeCheck size={14} /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-white/85 leading-relaxed mb-4 text-[15px]">"{r.text}"</p>
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-white font-semibold text-sm">{r.name}</p>
                    <p className="text-white/50 text-xs">
                      {r.business} · {r.date}
                    </p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          {/* ADD GOOGLE REVIEW LINK HERE AFTER GBP SETUP */}
        </div>
      </section>

      <section className="py-16 bg-[#0a0f1e]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <AnimatedSection className="text-center mb-8">
            <p className="section-label mb-3">Share Your Experience</p>
            <h2 className="section-title">Submit Your Review</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <form
              onSubmit={submit}
              className="space-y-4 rounded-2xl bg-white/[0.03] border border-primary/30 p-6 sm:p-8 backdrop-blur-xl"
            >
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Your Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg bg-background/50 border border-white/10 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Your Business or Website *</label>
                <input
                  required
                  value={form.business}
                  onChange={(e) => setForm({ ...form, business: e.target.value })}
                  className="w-full rounded-lg bg-background/50 border border-white/10 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
                  placeholder="acme.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Star Rating *</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, rating: n })}
                      className="transition-transform hover:scale-110"
                      aria-label={`${n} stars`}
                    >
                      <Star
                        size={28}
                        style={n <= form.rating ? { color: "#f97316", fill: "#f97316" } : undefined}
                        className={n <= form.rating ? "" : "text-white/20"}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Your Review * (min 50 characters)</label>
                <textarea
                  required
                  rows={5}
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  className="w-full rounded-lg bg-background/50 border border-white/10 px-4 py-2.5 text-white placeholder:text-white/40 focus:border-primary focus:outline-none resize-none"
                  placeholder="Tell others about your experience working with Georgia..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-conversion text-conversion-foreground hover:bg-conversion-dark px-6 py-3 font-semibold transition-all disabled:opacity-60"
              >
                {submitting && <Loader2 className="animate-spin" size={18} />}
                Send My Review
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;
