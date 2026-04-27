import AnimatedSection from "./AnimatedSection";
import aboutImg from "@/assets/georgia-about.webp";

const skills = [
  "Technical SEO", "Local SEO", "On Page SEO", "Ecommerce SEO",
  "WordPress", "Shopify", "Wix", "Webflow", "Squarespace",
  "Google Search Console", "Joomla", "Drupal", "Magento 1 & 2",
  "GoDaddy", "Google Tag Manager", "Google Analytics",
  "Google Data Studio", "Ahrefs", "SEMrush",
  "Conversion Rate Optimization",
];

const About = () => (
  <section id="about" className="py-14 sm:py-20 bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <AnimatedSection className="flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 bg-gold/15 rounded-2xl blur-2xl" />
            <img
              src={aboutImg}
              alt="Georgia J. Chase, SEO Specialist"
              width="600"
              height="600"
              loading="lazy"
              decoding="async"
              className="relative rounded-2xl shadow-xl w-full object-cover"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="section-label mb-3">About Georgia</p>
          <h2 className="section-title mb-6">
            I Help Business Owners Go From Overlooked to Found
          </h2>
           <div className="space-y-4 text-muted-foreground leading-relaxed">
             <p>
               If your website isn't bringing in the traffic or customers you expected from Google, you're definitely not alone. And honestly, it's usually not your fault.
             </p>
             <p>
               Most websites have hidden SEO issues that are quietly holding them back. Things like technical errors, indexing problems, weak page signals, or poor local visibility. These are the real reasons why good businesses end up staying invisible online.
             </p>
             <p className="font-semibold text-foreground">That's where I come in. I find those hidden problems and fix them properly.</p>
             <p>
               I'm an SEO Specialist with hands on experience across WordPress, Shopify, Wix, Webflow, and plenty of other platforms. I've helped business owners in all kinds of industries get found on Google, build trust with their audience, and bring in more paying customers.
             </p>
             <p>
               I don't do shortcuts or quick fixes. I focus on building a strong SEO foundation that holds up over time and keeps delivering results long after the work is done.
             </p>
           </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="px-3 py-1.5 bg-forest-light rounded-full text-xs font-medium text-primary border border-border">
                {s}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default About;
