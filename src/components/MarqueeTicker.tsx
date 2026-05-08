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
    style={{ backgroundColor: "#1B4332", borderColor: "rgba(201, 168, 76, 0.35)" }}
  >
    <div className="flex whitespace-nowrap animate-marquee">
      {[...items, ...items, ...items].map((t, i) => (
        <span
          key={i}
          className="mx-8 text-xs sm:text-sm font-medium"
          style={{ color: "#FAFAF8" }}
        >
          <span style={{ color: "#C9A84C" }}>★</span>
          {t.slice(1)}
        </span>
      ))}
    </div>
  </section>
);

export default MarqueeTicker;
