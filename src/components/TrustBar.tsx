const platforms = [
  "WordPress", "Shopify", "Wix", "Webflow", "Squarespace",
  "WooCommerce", "Magento", "BigCommerce", "Google Search Console",
  "Ahrefs", "SEMrush",
];

const TrustBar = () => (
  <section className="py-6 bg-secondary">
    <div className="container mx-auto px-4">
      <p className="text-center text-sm text-muted-foreground mb-3 font-medium">Works with:</p>
      <div className="flex flex-wrap justify-center gap-3">
        {platforms.map((p) => (
          <span
            key={p}
            className="px-3 py-1.5 bg-background rounded-full text-xs font-medium text-muted-foreground border border-border"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
