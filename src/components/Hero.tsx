import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import HeroParticles from "./HeroParticles";
import VantaGlobeBackground from "./VantaGlobeBackground";

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
      {/* Vanta animated globe (desktop only) */}
      <VantaGlobeBackground />

      {/* Parallax background layer (particles only; Vanta handles the globe) */}
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform" aria-hidden="true">
        <HeroParticles />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <AnimatedSection className="animate-float-soft">
            <div className="text-center md:text-left">
              <h1 className="fluid-h1 font-extrabold leading-tight text-foreground md:text-warm-white text-glow-orange">
                Your Website Should Be{" "}
                <span className="text-primary md:text-gold">Bringing You Customers.</span>
                <br className="hidden sm:inline" />
                {" "}Let Me Help You Figure Out Why It Isn't.
              </h1>
              <p className="mt-6 fluid-lead text-muted-foreground md:text-warm-white/80 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                Most business owners don't realise their website has hidden problems that are quietly blocking their traffic, sales, and growth. I'll find those problems, explain them to you in plain language, and fix them properly.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
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
            </div>
          </AnimatedSection>

          {/* Right column spacer so globe sits behind right side */}
          <div aria-hidden="true" className="hidden md:block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
