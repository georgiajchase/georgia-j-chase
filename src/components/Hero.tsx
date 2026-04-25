import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-background overflow-hidden"
    >
      {/* Animated globe background */}
      <div aria-hidden="true" className="hero-globe-glow" />
      <div aria-hidden="true" className="hero-globe" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h1 className="fluid-h1 font-extrabold leading-tight text-foreground md:text-warm-white animate-float text-glow-orange">
              Your Website Should Be{" "}
              <span className="text-primary md:text-gold">Bringing You Customers.</span>
              <br className="hidden sm:inline" />
              {" "}Let Me Help You Figure Out Why It Isn't.
            </h1>
            <p className="mt-6 fluid-lead text-muted-foreground md:text-warm-white/80 max-w-2xl mx-auto leading-relaxed">
              Most business owners don't realise their website has hidden problems that are quietly blocking their traffic, sales, and growth. I'll find those problems, explain them to you in plain language, and fix them properly.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-forest-dark rounded-full px-8 text-base animate-pulse-glow"
              >
                Get Found on Google Today →
              </Button>
              <Button
                onClick={scrollToHowItWorks}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary text-primary hover:bg-forest-light md:border-warm-white md:text-warm-white md:hover:bg-warm-white/10 rounded-full px-8 text-base"
              >
                See How It Works ↓
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground md:text-warm-white/70">
              I keep things simple and honest, and I'll never waste your time.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
