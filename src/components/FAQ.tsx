import AnimatedSection from "./AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    q: "Is the free audit actually free?",
    a: "Yes. Completely free. Georgia personally looks at your site and emails you back with 3 specific things she found that are hurting your traffic. No payment required. No obligation after. You get a straight answer either way.",
  },
  {
    q: "How fast will I see results?",
    a: "Most clients see initial improvements within 30 days. Significant traffic and ranking changes typically happen between 60 and 90 days depending on your niche and how many issues your site has. We always fix in the right order so results compound over time.",
  },
  {
    q: "What if I tried SEO before and saw no results?",
    a: "This is the most common thing we hear. Most agencies optimise the easy things and ignore the technical foundation. We start with what Google actually cares about, crawlability, indexing, site structure and page intent. That is usually where the real problem is hiding.",
  },
  {
    q: "Do I need to sign a contract?",
    a: "No. Every plan except Authority is month to month. You can stop anytime. We prefer to keep clients because of results, not because they are locked in.",
  },
  {
    q: "Will this work for my industry?",
    a: "Yes. We have grown businesses in dental, ecommerce, law, real estate, SaaS, construction, restaurants, coaching and more. The SEO principles are the same. What changes is the keyword strategy and content approach which we customise for every client.",
  },
  {
    q: "What makes this different from other SEO agencies?",
    a: "Three things. Georgia personally reviews your site, not a junior employee or automated tool. We fix in the right order so you are not wasting money on tactics that do not move the needle yet. And we explain everything in plain English so you always know what is happening and why.",
  },
  {
    q: "How much does SEO cost?",
    a: "We start at $197 for a one time full audit report with PDF and screenshots. Monthly plans start at $597. Every engagement starts with a free personal review of your site before any money changes hands.",
  },
  {
    q: "What do I need to get started?",
    a: "Just your website URL and 60 seconds to fill in a short form. Georgia does the rest. No technical knowledge needed from your side.",
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
        <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-0 rounded-xl overflow-hidden"
              style={{
                backgroundColor: "#1a2f4a",
                borderBottom: "1px solid #1e3a5f",
              }}
            >
              <AccordionTrigger
                className="text-left font-bold text-white hover:no-underline [&>svg]:text-[#22c55e] [&>svg]:h-5 [&>svg]:w-5 [&>svg]:transition-transform [&>svg]:duration-300 data-[state=open]:[&>svg]:rotate-180"
                style={{ padding: "20px 24px", fontSize: "15px" }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                style={{
                  padding: "0 24px 20px",
                  color: "#94a3b8",
                  fontSize: "14px",
                  lineHeight: "1.7",
                }}
              >
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
