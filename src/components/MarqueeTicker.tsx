const items = [
  "✓ 27 sites ranked on page 1",
  "★ 5.0 average client rating",
  "🔥 3 spots left this month",
  "✓ Verified results in 30 to 90 days",
  "💼 Trusted by US business owners",
  "📈 Average 312% organic traffic lift",
  "✓ No long term contracts",
  "⚡ Free website check in 24 hours",
];

const MarqueeTicker = () => (
  <section className="relative bg-[#050a18] border-y border-primary/20 overflow-hidden py-3">
    <div className="flex whitespace-nowrap animate-marquee">
      {[...items, ...items].map((t, i) => (
        <span
          key={i}
          className="mx-8 text-sm font-medium text-white/80"
        >
          {t}
        </span>
      ))}
    </div>
  </section>
);

export default MarqueeTicker;
