import { Link } from "react-router-dom";
import { Star, BadgeCheck, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { reviews } from "@/data/reviews";

const SocialProof = () => {
  const top = reviews.slice(0, 3);
  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <AnimatedSection className="text-center mb-6 max-w-3xl mx-auto">
          <p className="section-label mb-3">Proof, Not Promises</p>
          <h2 className="section-title mb-4">
            Real Businesses. Real Results. Real Reviews.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Every quote below is from a paying client. No fluff. No fabricated stories.
          </p>
        </AnimatedSection>

        <AnimatedSection className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-10 text-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={16} style={{ color: "#f97316", fill: "#f97316" }} />
              ))}
            </div>
            <span className="text-white font-semibold">5.0 / 5.0</span>
            <span className="text-white/60">from {reviews.length}+ verified clients</span>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-10">
          {top.map((r, i) => (
            <AnimatedSection key={r.name + i} delay={i * 0.08}>
              <article
                className="h-full"
                style={{
                  backgroundColor: "#1a2f4a",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: "12px",
                  padding: "24px",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        size={14}
                        style={n <= r.rating ? { color: "#f97316", fill: "#f97316" } : undefined}
                        className={n <= r.rating ? "" : "text-white/20"}
                      />
                    ))}
                  </div>
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: "#22c55e" }}>
                      <BadgeCheck size={12} /> Verified
                    </span>
                  )}
                </div>
                <p className="text-white leading-relaxed text-sm mb-4">"{r.text}"</p>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white font-bold text-sm">{r.name}</p>
                  <p className="text-white/50 text-xs">{r.business} · {r.date}</p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 font-semibold"
            style={{
              border: "2px solid #22c55e",
              color: "#22c55e",
              padding: "12px 28px",
              borderRadius: "30px",
              transition: "all 0.2s",
            }}
          >
            Read All Reviews <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SocialProof;
