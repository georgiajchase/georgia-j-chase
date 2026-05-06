import { ClipboardCheck, MessageSquareText, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    num: "01",
    icon: ClipboardCheck,
     title: "I Take a Look at Your Website",
    text: "Just send me your website URL and I'll run a full audit to find every hidden issue that could be hurting your traffic and sales.",
  },
  {
    num: "02",
    icon: MessageSquareText,
    title: "I Walk You Through What I Found",
    text: "I'll explain the real problems in plain language so you know exactly what's going on and what we can do about it.",
  },
  {
    num: "03",
    icon: Rocket,
    title: "We Fix It Together and Your Website Starts Working",
    text: "I make the right fixes in the right order so your website gets more visibility, more visitors, and more people turning into paying customers.",
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();
  const goToContact = () => navigate("/contact");

  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="section-label mb-3">The Process</p>
          <h2 className="section-title">Here's How We'll Work Together</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((s, i) => (
            <AnimatedSection key={s.num} delay={i * 0.15} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground font-heading font-bold text-lg mb-4">
                {s.num}
              </div>
              <div className="w-12 h-12 mx-auto rounded-xl bg-card border border-border flex items-center justify-center mb-4 shadow-sm">
                <s.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.text}</p>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Button
            onClick={goToContact}
            size="lg"
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-forest-dark rounded-full px-8"
          >
            Get My Free Website Check →
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HowItWorks;
