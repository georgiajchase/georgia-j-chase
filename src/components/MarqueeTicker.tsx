const items = [
  "✓ 27 sites ranked on page 1",
  "★ 5.0 average client rating",
  "● 3 spots left this month",
  "✓ Verified results in 30 to 90 days",
  "✓ Trusted by US business owners",
  "✓ Average 312% organic traffic lift",
  "✓ No long term contracts",
  "✓ Free website check in 24 hours",
];

const MarqueeTicker = () => (
  <section
    className="relative overflow-hidden py-3 border-y"
    style={{ backgroundColor: "#1B4332", borderColor: "rgba(201, 168, 76, 0.35)" }}
  >
    <div className="flex whitespace-nowrap animate-marquee">
      {[...items, ...items].map((t, i) => (
        <span
          key={i}
          className="mx-8 text-sm font-medium"
          style={{ color: "#FAFAF8" }}
        >
          <span style={{ color: "#C9A84C" }}>{t.charAt(0)}</span>
          {t.slice(1)}
        </span>
      ))}
    </div>
  </section>
);

export default MarqueeTicker;
