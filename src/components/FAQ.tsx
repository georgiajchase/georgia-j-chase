import AnimatedSection from "./AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    q: "How quickly will I see results?",
    a: "Most clients see measurable ranking improvements within 30 to 60 days. Page 1 results typically happen between 60 and 90 days. I show you exactly where you stand before we start.",
  },
  {
    q: "What makes this different from other SEO agencies?",
    a: "I do not outsource, use bots, or sell you monthly reports that change nothing. I personally audit your site, fix the real problems, and stay until results happen.",
  },
  {
    q: "Do I need to sign a long contract?",
    a: "No. Every plan is month to month. You stay because results keep coming, not because you are locked in.",
  },
  {
    q: "What if my website is on WordPress, Shopify, or Squarespace?",
    a: "All of them. I have worked on every major platform and know exactly how to optimize each one properly.",
  },
  {
    q: "How much does it cost?",
    a: "Plans start at $997 per month. Before any money changes hands I do a free website audit so you know exactly what needs fixing and whether working together makes sense.",
  },
  {
    q: "Will you work with my industry?",
    a: "If your customers search on Google I can help you rank. I have worked across 40 plus industries.",
  },
];

const FAQ = () => (
  <section id="faq" className="py-14 sm:py-20 bg-background">
    <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
      <AnimatedSection className="text-center mb-10">
        <p className="section-label mb-3">Common Questions</p>
        <h2 className="section-title mb-4">Everything You Need to Know Before We Start</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-2 border-primary/30 rounded-xl px-5 sm:px-7 bg-white/[0.03] backdrop-blur-xl hover:border-primary/60 transition-colors"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-white hover:no-underline hover:text-primary [&>svg]:text-primary [&>svg]:h-5 [&>svg]:w-5 py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/75 leading-relaxed pb-6 text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedSection>
    </div>
  </section>
);

export default FAQ;
