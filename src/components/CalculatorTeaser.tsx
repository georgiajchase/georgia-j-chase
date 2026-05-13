import RevenueCalculator from "./RevenueCalculator";
import AnimatedSection from "./AnimatedSection";

const CalculatorTeaser = () => (
  <section className="py-16 sm:py-20 px-4" style={{ backgroundColor: "#0a1628" }}>
    <div className="max-w-4xl mx-auto">
      <AnimatedSection className="text-center mb-10">
        <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "#22c55e" }}>
          REVENUE LOSS CALCULATOR
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight" style={{ color: "#FAFAF8" }}>
          Find Out How Much Traffic and Revenue Your Site Is Leaving on the Table
        </h2>
        <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgba(250,250,248,0.75)" }}>
          Answer 3 quick questions. Get your estimated monthly revenue loss in 10 seconds. Free.
        </p>
      </AnimatedSection>
      <AnimatedSection>
        <RevenueCalculator teaser />
      </AnimatedSection>
    </div>
  </section>
);

export default CalculatorTeaser;
