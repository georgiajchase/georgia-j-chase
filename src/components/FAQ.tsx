import AnimatedSection from "./AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does an SEO audit take?",
    a: "Most audits are completed within 2 to 3 business days. You will receive a clear report explaining exactly what was found and what needs to be fixed.",
  },
  {
    q: "Do I need to be technical to understand your reports?",
    a: "Not at all. I write everything in plain, simple English so it's easy to understand. You won't need to Google any of it.",
  },
  {
    q: "What platforms do you work with?",
    a: "I work with WordPress, Shopify, Wix, Webflow, Squarespace, WooCommerce, Magento, BigCommerce, GoDaddy, and more. If you have a website, I can work with it.",
  },
  {
    q: "I already paid for SEO before and got no results. How is this different?",
    a: "Most agencies focus on keywords and traffic without fixing the foundation first. I start with what is actually broken before anything else. That is the difference.",
  },
  {
    q: "How much does it cost?",
    a: "Send me your website first. I will take a look and give you a clear, honest answer based on what your site actually needs.",
  },
  {
    q: "How do I get started?",
    a: "Just fill in the form below with your name, email, and website URL. I'll take a look and get back to you within 24 hours. There's absolutely no obligation.",
  },
];

const FAQ = () => (
  <section id="faq" className="py-20 bg-background">
    <div className="container mx-auto px-4 max-w-3xl">
      <AnimatedSection className="text-center mb-10">
        <p className="section-label mb-3">Common Questions</p>
        <h2 className="section-title mb-4">Frequently Asked Questions</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-xl px-6 bg-card shadow-sm"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
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
