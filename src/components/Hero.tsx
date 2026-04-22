import { Button } from "@/components/ui/button";
import { Suspense, lazy } from "react";
import AnimatedSection from "./AnimatedSection";
import { useIsMobile } from "@/hooks/use-mobile";

const Spline = lazy(() => import("@splinetool/react-spline"));

const Hero = () => {
  const isMobile = useIsMobile();

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-background overflow-hidden"
    >
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text - LEFT */}
          <AnimatedSection>
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
               Your Website Should Be{" "}
               <span className="text-primary">Bringing You Customers.</span>
               <br />
               Let Me Help You Figure Out Why It Isn't.
             </h1>
             <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
               Most business owners don't realise their website has hidden problems that are quietly blocking their traffic, sales, and growth. I'll find those problems, explain them to you in plain language, and fix them properly.
             </p>
             <div className="mt-8 flex flex-col sm:flex-row gap-4">
               <Button
                 onClick={scrollToForm}
                 size="lg"
                 className="bg-primary text-primary-foreground hover:bg-forest-dark rounded-full px-8 text-base"
               >
                 Show Me What's Blocking My Website
               </Button>
               <Button
                 onClick={scrollToHowItWorks}
                 size="lg"
                 variant="outline"
                 className="border-primary text-primary hover:bg-forest-light rounded-full px-8 text-base"
               >
                 See How It Works ↓
               </Button>
             </div>
             <p className="mt-4 text-sm text-muted-foreground">
               I keep things simple and honest, and I'll never waste your time.
             </p>
          </AnimatedSection>

          {/* Spline 3D Globe - RIGHT (desktop only) */}
          <AnimatedSection delay={0.2} className="hidden md:flex justify-center">
            <div className="relative w-full aspect-square max-w-xl">
              <div className="absolute -inset-4 bg-gold/20 rounded-2xl blur-2xl pointer-events-none" />
              {!isMobile && (
                <Suspense fallback={<div className="w-full h-full rounded-2xl bg-forest-light animate-pulse" />}>
                  <Spline
                    scene="https://prod.spline.design/F2KD6iBm6WMoQ7sO/scene.splinecode"
                    className="!w-full !h-full relative rounded-2xl"
                  />
                </Suspense>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
