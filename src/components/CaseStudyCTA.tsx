import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const CaseStudyCTA = () => (
  <section className="py-16 sm:py-20 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
      <AnimatedSection>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 leading-tight">
          Want Results Like This for Your Business?
        </h2>
        <p className="fluid-lead text-muted-foreground mb-8 max-w-2xl mx-auto">
          Send us your site. We go through it personally within 24 hours and tell you exactly what is holding it back.
        </p>
        <Link
          to="/contact"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-conversion text-conversion-foreground hover:bg-conversion-dark rounded-full px-8 py-4 text-base font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-conversion/30"
        >
          Send Me Your Site <ArrowRight size={18} />
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

export default CaseStudyCTA;
