import { Link } from "react-router-dom";
import { Star, BadgeCheck, ShieldCheck, Trophy, Clock, Users, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";
import { reviews } from "@/data/reviews";

const trustBadges = [
  { icon: Trophy, label: "340% Average Traffic Growth" },
  { icon: Users, label: "47+ Businesses Helped" },
  { icon: Clock, label: "Results in 30 to 90 Days" },
  { icon: ShieldCheck, label: "No Lock In Contracts" },
];

const SocialProof = () => {
  const top = reviews.slice(0, 3);
  const avgRating =
    reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1);

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <AnimatedSection className="text-center mb-10 max-w-3xl mx-auto">
          <p className="section-label mb-3">Proof, Not Promises</p>
          <h2 className="section-title mb-4">
            Real Businesses. Real Results. Real Reviews.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Every quote below is from a paying client. Every number is verified. No fluff. No fabricated stories.
          </p>
        </AnimatedSection>

        {/* Rating header strip */}
        <AnimatedSection className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  size={18}
                  className={
                    n <= Math.round(avgRating)
                      ? "text-primary fill-primary"
                      : "text-white/20"
                  }
                />
              ))}
            </div>
            <span className="text-foreground font-semibold">
              {avgRating.toFixed(1)} / 5.0
            </span>
            <span className="text-muted-foreground text-sm">
              from {reviews.length}+ verified clients
            </span>
          </div>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="inline-flex items-center gap-1.5 text-conversion text-sm font-semibold">
            <BadgeCheck size={16} /> 100% Verified Reviews
          </span>
        </AnimatedSection>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {top.map((r, i) => (
            <AnimatedSection key={r.name} delay={i * 0.08}>
              <TiltCard>
                <article className="h-full rounded-2xl bg-card border border-primary/30 p-6 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          size={14}
                          className={
                            n <= r.rating
                              ? "text-primary fill-primary"
                              : "text-white/20"
                          }
                        />
                      ))}
                    </div>
                    {r.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-conversion font-semibold">
                        <BadgeCheck size={12} /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-foreground/90 leading-relaxed text-sm sm:text-base mb-5 flex-1">
                    "{r.text}"
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-foreground font-semibold text-sm">
                      {r.name}
                    </p>
                    <p className="text-muted-foreground text-xs">{r.business}</p>
                  </div>
                </article>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Trust badges */}
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {trustBadges.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.label}
                  className="flex items-center gap-3 rounded-xl bg-card border border-white/10 px-4 py-3.5"
                >
                  <span className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <Icon size={18} />
                  </span>
                  <span className="text-foreground font-semibold text-xs sm:text-sm leading-tight">
                    {b.label}
                  </span>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Guarantee + CTA */}
        <AnimatedSection className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-4 py-2 mb-5">
            <ShieldCheck className="text-primary" size={18} />
            <span className="text-primary font-semibold text-sm">
              Free audit. No commitment. No obligation.
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-forest-dark rounded-full px-7 py-3 font-semibold transition-colors"
            >
              Get My Free Audit <ArrowRight size={18} />
            </Link>
            <Link
              to="/reviews"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 text-foreground hover:border-primary/60 hover:bg-primary/10 px-7 py-3 font-semibold transition-colors"
            >
              Read All Reviews
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SocialProof;
