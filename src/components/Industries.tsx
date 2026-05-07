import AnimatedSection from "./AnimatedSection";

const industries = [
  "Custom Home Builders",
  "Dental and Medical Clinics",
  "Ecommerce Stores",
  "Landscaping and Garden Companies",
  "Law Firms",
  "Real Estate Agencies",
  "Restaurants and Cafes",
  "Coaches and Consultants",
  "Beauty and Wellness",
  "SaaS and Tech Companies",
  "Local Service Businesses",
  "Travel and Hospitality",
];

const Industries = () => (
  <section className="py-14 sm:py-20 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <AnimatedSection className="text-center mb-10">
        <p className="section-label mb-3">Niches</p>
        <h2 className="section-title max-w-2xl mx-auto">Industries We Have Grown</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {industries.map((n) => (
            <span
              key={n}
              className="px-4 py-2 rounded-full bg-white/[0.04] border border-primary/30 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              {n}
            </span>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <p className="mt-10 text-center fluid-lead text-muted-foreground max-w-2xl mx-auto">
          If your business has a website, we can grow it. Every niche. Every size. One goal, more customers.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default Industries;
