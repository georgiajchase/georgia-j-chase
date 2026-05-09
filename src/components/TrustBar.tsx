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
  <section className="py-12 sm:py-16" style={{ backgroundColor: "#0d1f35" }}>
    <div className="container mx-auto px-4">
      <AnimatedSection>
        <p className="text-center text-sm sm:text-base font-heading font-semibold mb-6 tracking-wide" style={{ color: "#ffffff" }}>
          We Work With Every Major Platform
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
          {platforms.map((p) => (
            <span
              key={p.name}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors"
              style={{
                backgroundColor: "#1a2f4a",
                border: "1px solid #22c55e",
                color: "#ffffff",
              }}
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
        <p className="text-center text-xs sm:text-sm mt-5 italic" style={{ color: "rgba(255,255,255,0.6)" }}>
          If your site is built on it, we can grow it.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default TrustBar;
