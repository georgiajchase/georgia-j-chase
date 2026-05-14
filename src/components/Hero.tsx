import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSection from "./AnimatedSection";
import HeroBackground from "./HeroBackground";

gsap.registerPlugin(ScrollTrigger);

// Headline copy split into lines exactly as it should render on desktop.
// On mobile the lines wrap naturally because each word is an inline-block
// inside a normal text flow (we use real spaces, not margins).
const headlineLines = [
  ["Your", "Competitors", "Are", "Showing", "Up", "on", "Google."],
  ["You're", "Not.", "Here's", "Why."],
];

const subheadParagraphs = [
  "Most businesses are invisible online and do not know why. I find exactly what is holding your website back and fix it so your business shows up on Google, Google Maps, and AI search where your customers are already looking.",
  "We are a team of SEO specialists, content strategists and technical experts, working as one unit inside your business.",
];

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const buttons = buttonsRef.current;
    if (!section || !headline) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const headlineWords = headline.querySelectorAll<HTMLSpanElement>(".hero-word");
    const subheadWords = subhead
      ? subhead.querySelectorAll<HTMLSpanElement>(".hero-sub-word")
      : ([] as unknown as NodeListOf<HTMLSpanElement>);
    const buttonEls = buttons ? buttons.querySelectorAll<HTMLElement>(".hero-cta") : [];

    if (prefersReducedMotion) {
      gsap.set([headlineWords, subheadWords, buttonEls], { opacity: 1, y: 0 });
      return;
    }

    gsap.set(headlineWords, { opacity: 0, y: 40 });
    gsap.set(subheadWords, { opacity: 0, y: 16 });
    gsap.set(buttonEls, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        once: true,
      },
    });

    tl.to(headlineWords, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
    })
      .to(
        subheadWords,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.025,
        },
        "-=0.2"
      )
      .to(
        buttonEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.15"
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const goToContact = () => {
    navigate("/contact");
  };

  const goToCalculator = () => {
    navigate("/calculator");
  };

  return (
    <section
      ref={sectionRef}
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
              <div ref={headlineRef}>
                <h1 className="fluid-h1 font-extrabold leading-tight text-foreground md:text-warm-white text-glow-orange">
                  {headlineLines.map((line, lineIdx) => (
                    <span key={lineIdx} className="block">
                      {line.map((word, wordIdx) => (
                        <span
                          key={wordIdx}
                          className="hero-word inline-block"
                          style={{ willChange: "transform, opacity" }}
                        >
                          {word}
                          {wordIdx < line.length - 1 ? "\u00A0" : ""}
                        </span>
                      ))}
                    </span>
                  ))}
                </h1>
              </div>

              <div ref={subheadRef}>
                {subheadParagraphs.map((para, pIdx) => {
                  const words = para.split(" ");
                  return (
                    <p
                      key={pIdx}
                      className={`${pIdx === 0 ? "mt-6" : "mt-4 text-base"} fluid-lead text-muted-foreground md:text-warm-white/80 max-w-2xl mx-auto md:mx-0 leading-relaxed`}
                    >
                      {words.map((word, wIdx) => (
                        <span
                          key={wIdx}
                          className="hero-sub-word inline-block"
                          style={{ willChange: "transform, opacity" }}
                        >
                          {word}
                          {wIdx < words.length - 1 ? "\u00A0" : ""}
                        </span>
                      ))}
                    </p>
                  );
                })}
              </div>

              <div
                ref={buttonsRef}
                className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center md:justify-start"
              >
                <Button
                  onClick={goToContact}
                  size="lg"
                  className="hero-cta w-full sm:w-auto bg-conversion text-conversion-foreground hover:bg-conversion-dark rounded-full px-8 text-base animate-pulse-glow-green"
                >
                  Send Me Your Site →
                </Button>
                <Button
                  onClick={goToCalculator}
                  variant="outline"
                  size="lg"
                  className="hero-cta w-full sm:w-auto rounded-full px-8 text-base border-conversion text-conversion hover:bg-conversion hover:text-conversion-foreground"
                >
                  Free Revenue Calculator →
                </Button>
              </div>

              <p className="mt-4 text-sm text-muted-foreground md:text-warm-white/70">
                128 business owners have already done this.
              </p>
              <p className="mt-4 text-sm text-muted-foreground md:text-warm-white/70">
                I keep things simple and honest. I will never waste your time.
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
