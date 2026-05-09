const items = [
  "★ 128 Businesses Grown",
  "★ $127K+ Revenue Generated",
  "★ 340% Average Traffic Growth",
  "★ 100/100 SEO Score Achieved",
  "★ Results in 30 to 90 Days",
];

const MarqueeTicker = () => (
  <section
    className="relative overflow-hidden py-2.5 border-y"
    style={{ backgroundColor: "#0a1628", borderColor: "rgba(34, 197, 94, 0.35)" }}
  >
    <div className="flex whitespace-nowrap animate-marquee">
      {[...items, ...items, ...items].map((t, i) => (
        <span
          key={i}
          className="mx-8 text-xs sm:text-sm font-medium"
          style={{ color: "#ffffff" }}
        >
          <span style={{ color: "#22c55e" }}>★</span>
          {t.slice(1)}
        </span>
      ))}
    </div>
  </section>
);

export default MarqueeTicker;
