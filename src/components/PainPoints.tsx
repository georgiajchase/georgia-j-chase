import { Search, Users, AlertTriangle, Zap, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";

const cards = [
  {
    icon: Search,
    title: "Google Has No Idea You Exist",
    text: "You have a website. You have done everything right. But when customers search for what you sell, your competitors show up and you do not.",
  },
  {
    icon: Users,
    title: "People Visit But Nobody Reaches Out",
    text: "Traffic comes in, looks around, and leaves. No calls. No emails. No sales. The site looks fine but something is quietly killing conversions.",
  },
  {
    icon: AlertTriangle,
    title: "You Have Tried SEO Before and Got Burned",
    text: "You paid an agency. Got monthly reports full of charts. Saw zero real difference. Now you do not know who to trust.",
  },
  {
    icon: Zap,
    title: "Your Site Feels Slow and You Do Not Know Why",
    text: "Visitors leave in seconds on mobile. Speed and technical issues you cannot see are dragging your rankings down every single day.",
  },
  {
    icon: MapPin,
    title: "Local Customers Cannot Find You on Maps",
    text: "People nearby are searching for exactly what you offer right now. They just keep finding your competitors instead of you.",
  },
  {
    icon: TrendingUp,
    title: "A Weaker Competitor Keeps Outranking You",
    text: "A business you know is not as good as yours keeps showing up above you on Google. That gap is fixable. You just need to know how.",
  },
];

const PainPoints = () => (
  <section className="py-14 sm:py-20 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <p className="section-label mb-3">Does This Sound Familiar?</p>
        <h2 className="section-title max-w-3xl mx-auto">
          If Any of This Sounds Like Your Business, You Are in the Right Place.
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <AnimatedSection key={c.title} delay={i * 0.08}>
            <TiltCard>
              <div className="bg-forest-dark border border-border border-l-4 border-l-primary rounded-xl p-6 h-full shadow-sm hover:bg-forest hover:shadow-xl transition-all duration-300">
                <div className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                  <c.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-warm-white">{c.title}</h3>
                <p className="text-warm-white/70 text-sm leading-relaxed">{c.text}</p>
              </div>
            </TiltCard>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection className="mt-14 text-center max-w-2xl mx-auto">
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-3">
          Sound familiar? Here is the good news.
        </h3>
        <p className="text-muted-foreground mb-6">
          Every single one of these problems has a clear fix. We find it and we fix it properly.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Show Me What Is Wrong With My Site
          <ArrowRight size={18} />
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

export default PainPoints;
