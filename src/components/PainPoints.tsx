import { Search, MousePointerClick, LinkIcon, Smartphone, MapPin, TrendingDown } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./TiltCard";

const cards = [
   { icon: Search, title: "Google Can't Find You", text: "Your website is out there, but it barely shows up when people search for what you offer." },
  { icon: MousePointerClick, title: "Visitors Come But Don't Buy", text: "People land on your site, look around, and leave without reaching out or making a purchase." },
  { icon: LinkIcon, title: "You've Tried SEO Before and Nothing Changed", text: "You've already paid an agency or freelancer and you're still not seeing any real difference." },
  { icon: Smartphone, title: "Your Site Looks Good But Feels Slow", text: "Speed and technical issues you can't even see are quietly dragging down your rankings every day." },
  { icon: MapPin, title: "Local Customers Can't Find You", text: "People nearby are actively searching for what you offer, but your business isn't showing up where it should be." },
  { icon: TrendingDown, title: "Your Competitor Keeps Showing Up Above You", text: "A business you know isn't as strong as yours is getting the traffic and the customers that should be coming to you." },
];

const PainPoints = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <AnimatedSection className="text-center mb-14">
        <p className="section-label mb-3">Does This Sound Familiar?</p>
         <h2 className="section-title max-w-2xl mx-auto">
           You Have a Website, But It's Not Doing What It Should Be Doing.
         </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <AnimatedSection key={c.title} delay={i * 0.08}>
            <TiltCard>
              <div className="bg-background border border-border rounded-xl p-6 h-full shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="w-11 h-11 rounded-lg bg-forest-light flex items-center justify-center mb-4">
                  <c.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-foreground">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.text}</p>
              </div>
            </TiltCard>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default PainPoints;
