import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { useIsMobile } from "@/hooks/use-mobile";
import heroImg from "@/assets/georgia-hero.png";
import * as THREE from "three";

const Hero = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const isMobile = useIsMobile();

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isMobile) {
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
      return;
    }

    if (!vantaEffect && vantaRef.current) {
      import("vanta/dist/vanta.globe.min").then((GLOBE: any) => {
        const effect = (GLOBE.default || GLOBE)({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xff7a1a,
          color2: 0xff7a1a,
          backgroundColor: 0x0a1a2f,
          size: 1.0,
        });
        setVantaEffect(effect);
      });
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <section
      id="home"
      ref={vantaRef}
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-background overflow-hidden"
    >
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <AnimatedSection>
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground md:text-warm-white animate-float text-glow-orange">
               Your Website Should Be{" "}
               <span className="text-primary md:text-gold">Bringing You Customers.</span>
               <br />
               Let Me Help You Figure Out Why It Isn't.
             </h1>
             <p className="mt-6 text-lg text-muted-foreground md:text-warm-white/80 max-w-lg leading-relaxed">
               Most business owners don't realise their website has hidden problems that are quietly blocking their traffic, sales, and growth. I'll find those problems, explain them to you in plain language, and fix them properly.
             </p>
             <div className="mt-8 flex flex-col sm:flex-row gap-4">
               <Button
                 onClick={scrollToForm}
                 size="lg"
                 className="bg-primary text-primary-foreground hover:bg-forest-dark rounded-full px-8 text-base animate-pulse-glow"
               >
                 Get Found on Google Today →
               </Button>
               <Button
                 onClick={scrollToHowItWorks}
                 size="lg"
                 variant="outline"
                 className="border-primary text-primary hover:bg-forest-light md:border-warm-white md:text-warm-white md:hover:bg-warm-white/10 rounded-full px-8 text-base"
               >
                 See How It Works ↓
               </Button>
             </div>
             <p className="mt-4 text-sm text-muted-foreground md:text-warm-white/70">
               I keep things simple and honest, and I'll never waste your time.
             </p>
          </AnimatedSection>

          {/* Photo */}
          <AnimatedSection delay={0.2} className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-gold/20 rounded-2xl blur-2xl" />
              <img
                src={heroImg}
                alt="Georgia J. Chase, SEO Specialist"
                className="relative rounded-2xl shadow-xl w-full object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
