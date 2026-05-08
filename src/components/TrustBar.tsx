import AnimatedSection from "./AnimatedSection";

const platforms: { name: string; color: string }[] = [
  { name: "WordPress", color: "#21759B" },
  { name: "Shopify", color: "#95BF47" },
  { name: "Wix", color: "#0C6EFC" },
  { name: "Webflow", color: "#4353FF" },
  { name: "Squarespace", color: "#FFFFFF" },
  { name: "WooCommerce", color: "#7F54B3" },
  { name: "Magento", color: "#EE672F" },
  { name: "BigCommerce", color: "#121118" },
  { name: "Google Search Console", color: "#4285F4" },
  { name: "Ahrefs", color: "#0066FF" },
  { name: "SEMrush", color: "#FF642D" },
  { name: "Google Analytics", color: "#F9AB00" },
  { name: "Google Business Profile", color: "#34A853" },
  { name: "Screaming Frog", color: "#3DB54A" },
  { name: "PageSpeed Insights", color: "#0F9D58" },
];

const TrustBar = () => (
  <section className="py-12 sm:py-16 bg-forest-dark">
    <div className="container mx-auto px-4">
      <AnimatedSection>
        <p className="text-center text-sm sm:text-base font-heading font-semibold text-warm-white mb-6 tracking-wide">
          We Work With Every Major Platform
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
          {platforms.map((p) => (
            <span
              key={p.name}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-warm-white bg-forest border border-primary/40 hover:border-primary hover:bg-forest/80 transition-colors"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: p.color }}
                aria-hidden="true"
              />
              {p.name}
            </span>
          ))}
        </div>
        <p className="text-center text-xs sm:text-sm text-warm-white/60 mt-5 italic">
          If your site is built on it, we can grow it.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default TrustBar;
