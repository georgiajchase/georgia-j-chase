import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import HeroBackground from "./HeroBackground";

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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

  const goToContact = () => {
    navigate("/contact");
  };


  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-background overflow-hidden"
    >
      {/* Pure CSS animated background — no JS libraries */}
      <HeroBackground />

      {/* Parallax wrapper kept for subtle scroll motion on the bg layer */}
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform pointer-events-none" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <AnimatedSection className="animate-float-soft">
            <div className="text-center md:text-left">
              <h1 className="fluid-h1 font-extrabold leading-tight text-foreground md:text-warm-white text-glow-orange">
                Your Competitors Are Showing Up on Google.
                <br className="hidden sm:inline" />
                {" "}You're Not. Here's Why.
              </h1>
              <p className="mt-6 fluid-lead text-muted-foreground md:text-warm-white/80 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                I personally audit your website and show you the exact problems blocking your traffic. For free. No jargon. No pitch. Just answers.
              </p>
              <div className="mt-8 flex justify-center md:justify-start">
                <Button
                  onClick={goToContact}
                  size="lg"
                  className="w-full sm:w-auto bg-conversion text-conversion-foreground hover:bg-conversion-dark rounded-full px-8 text-base animate-pulse-glow-green"
                >
                  Get My Free Website Audit →
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground md:text-warm-white/70">
                I keep things simple and honest, and I'll never waste your time.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-warm-white/70">
                <span className="inline-flex items-center gap-1.5"><span className="text-conversion">✓</span> 27 sites ranked on page 1</span>
                <span className="inline-flex items-center gap-1.5"><span className="text-gold">★</span> 5.0 average rating</span>
                <span className="inline-flex items-center gap-1.5"><span className="text-primary">●</span> Verified results in 30 to 90 days</span>
              </div>
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
