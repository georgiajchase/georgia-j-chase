import AnimatedSection from "./AnimatedSection";
import aboutImg from "@/assets/georgia-about.png";

const skills = [
  "Technical SEO", "Local SEO", "On-Page SEO", "Ecommerce SEO",
  "WordPress", "Shopify", "Wix", "Webflow", "Squarespace",
  "Google Search Console", "Joomla", "Drupal", "Magento 1 & 2",
  "GoDaddy", "Google Tag Manager", "Google Analytics",
  "Google Data Studio", "Ahrefs", "SEMrush",
  "Conversion Rate Optimization",
];

const About = () => (
  <section id="about" className="py-20 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <AnimatedSection className="flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 bg-gold/15 rounded-2xl blur-2xl" />
            <img
              src={aboutImg}
              alt="Georgia J. Chase — SEO Specialist"
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
              Is your website not bringing in traffic or customers from Google? You're not alone — and honestly, it's usually not your fault.
            </p>
            <p>
              Most websites have hidden SEO issues quietly blocking their growth. Technical errors, indexing problems, weak on-page signals, poor local visibility — these are the real reasons good businesses stay invisible online.
            </p>
            <p className="font-semibold text-foreground">I find those hidden problems and fix them properly.</p>
            <p>
              As an SEO Specialist with hands-on experience across WordPress, Shopify, Wix, Webflow, and more — I've helped business owners across industries get found, get trusted, and get more paying customers from Google.
            </p>
            <p>
              I don't chase shortcuts or quick fixes. I build strong SEO foundations that hold long term and keep delivering results.
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
