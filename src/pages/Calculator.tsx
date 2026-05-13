import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import RevenueCalculator from "@/components/RevenueCalculator";

const Calculator = () => (
  <div className="min-h-screen" style={{ backgroundColor: "#0a1628" }}>
    <SEO
      title="Free Revenue Loss Calculator | How Much Is Your Site Costing You?"
      description="Find out how much traffic and revenue your website is leaving on the table every month. Free 10-second calculator from Georgia J. Chase, SEO Specialist."
      path="/calculator"
    />
    <Navbar />
    <main className="pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: "#22c55e" }}>
            FREE REVENUE CALCULATOR
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#FAFAF8" }}>
            How Much Is Your Website Costing You Every Month?
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgba(250,250,248,0.75)" }}>
            Answer 3 quick questions. Get your estimated monthly revenue loss in 10 seconds. Free.
          </p>
        </header>
        <RevenueCalculator />
      </div>
    </main>
    <Footer />
  </div>
);

export default Calculator;
