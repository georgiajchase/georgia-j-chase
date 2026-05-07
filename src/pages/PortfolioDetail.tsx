import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import ContactSection from "@/components/ContactSection";

type Detail = {
  slug: string;
  name: string;
  industry: string;
  challenge: string[];
  solution: string[];
  included: string[];
  results: string[];
  beforeAfter: { before: string; after: string };
};

const details: Record<string, Detail> = {
  "barclay-group": {
    slug: "barclay-group",
    name: "The Barclay Group Insurance",
    industry: "Insurance · NJ and PA",
    challenge: [
      "30 plus pages had zero SEO optimization with no keyphrases set on any page.",
      "Google was generating random, unhelpful descriptions in search results.",
      "Local visibility for New Jersey and Pennsylvania searches was nonexistent.",
    ],
    solution: [
      "Full On Page SEO and AEO optimization across every single page.",
      "35 plus images tagged with descriptive AEO alt text.",
      "Locally targeted keyphrases written for NJ and PA insurance buyers.",
      "Meta descriptions handcrafted for each page with local intent.",
      "Page Speed audit completed with performance fixes applied.",
    ],
    included: [
      "30 plus pages optimized with unique keyphrases",
      "35 plus images tagged with AEO alt text",
      "Meta descriptions written for NJ and PA local searches",
      "PageSpeed audit completed",
      "Schema markup added across the site",
    ],
    results: [
      "SEO score 100 out of 100",
      "Performance 89 out of 100",
      "Every page fully ranked and optimized",
    ],
    beforeAfter: {
      before: "Pages with no keyphrases, generic Google snippets, no local targeting.",
      after: "Every page fully optimized, unique keyphrases, local NJ and PA targeting in place.",
    },
  },
  "brightchatter-media": {
    slug: "brightchatter-media",
    name: "BrightChatter Media",
    industry: "Marketing and PR",
    challenge: [
      "Mobile score sitting at 67 out of 100.",
      "Domain Rating of 0 with no backlink authority.",
      "19 SEO issues identified across the site.",
      "No schema markup. No social tags.",
    ],
    solution: [
      "Complete SEO and AEO audit with growth roadmap.",
      "GTmetrix Grade A 97 percent performance confirmed.",
      "Roadmap created for mobile improvement from 67 to 90 plus.",
      "Schema markup strategy and rollout plan.",
      "Backlink growth plan tailored to the marketing and PR niche.",
    ],
    included: [
      "Full technical SEO audit document",
      "GTmetrix Grade A performance report",
      "Mobile score improvement roadmap",
      "Schema markup strategy",
      "Backlink growth plan",
    ],
    results: [
      "GTmetrix Grade A 97 percent performance",
      "Clear roadmap to page 1",
      "19 issues documented and solved",
    ],
    beforeAfter: {
      before: "Mobile 67, DR 0, 19 unresolved SEO issues, no schema, no social tags.",
      after: "Grade A performance, full roadmap delivered, every issue documented and solved.",
    },
  },
  "travel-gifts-online": {
    slug: "travel-gifts-online",
    name: "Travel Gifts Online",
    industry: "Ecommerce",
    challenge: [
      "46 products invisible to search engines.",
      "Generic product titles with no keyword optimization.",
      "No presence on Google Shopping, Pinterest, or Instagram.",
    ],
    solution: [
      "All 46 product titles rewritten with keywords.",
      "Descriptions rewritten at 250 to 400 words each.",
      "Google Merchant Center account created and configured.",
      "Pinterest Business account set up with 5 destination boards and 15 pins.",
      "9 Instagram captions delivered.",
      "1200 word blog post written.",
      "All image alt text and filenames optimized.",
    ],
    included: [
      "46 product titles rewritten with keywords",
      "46 descriptions at 250 to 400 words each",
      "Google Merchant Center account configured",
      "Pinterest Business with 5 boards and 15 pins",
      "9 Instagram captions delivered",
      "1200 word blog post",
      "All image alt text and filenames optimized",
    ],
    results: [
      "Discoverable on Google Shopping",
      "Pinterest and Instagram presence live",
      "Full content strategy ready",
    ],
    beforeAfter: {
      before: "46 products invisible, generic titles, zero social or shopping presence.",
      after: "All products optimized, live on Google Shopping, Pinterest and Instagram active.",
    },
  },
};

const PortfolioDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? details[slug] : undefined;

  if (!data) return <Navigate to="/portfolio" replace />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050a18" }}>
      <SEO
        title={`${data.name} Case Study | Georgia J. Chase`}
        description={`See the full ${data.name} SEO project: challenge, solution, and verified results.`}
        path={`/portfolio/${data.slug}`}
      />
      <Navbar />

      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              {data.industry}
            </p>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mb-5">
              {data.name}
            </h1>
            <div className="aspect-[16/7] rounded-2xl border border-primary/40 bg-gradient-to-br from-[#050a18] via-[#0a1530] to-primary/30 mt-6 flex items-center justify-center">
              <span className="font-heading font-bold text-2xl sm:text-3xl text-primary/80 px-4 text-center">
                {data.name}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-10">
          <AnimatedSection>
            <div className="rounded-2xl bg-white/[0.03] border border-primary/30 p-7">
              <p className="text-xs uppercase tracking-wider text-primary mb-3">Challenge</p>
              <ul className="space-y-2">
                {data.challenge.map((c) => (
                  <li key={c} className="text-gray-200 leading-relaxed">• {c}</li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-2xl bg-white/[0.03] border border-primary/30 p-7">
              <p className="text-xs uppercase tracking-wider text-primary mb-3">Solution</p>
              <ul className="space-y-2">
                {data.solution.map((c) => (
                  <li key={c} className="text-gray-200 leading-relaxed">• {c}</li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white/[0.03] border border-primary/30 p-6">
                <p className="text-xs uppercase tracking-wider text-primary mb-2">Before</p>
                <p className="text-gray-200 leading-relaxed">{data.beforeAfter.before}</p>
              </div>
              <div className="rounded-2xl bg-conversion/10 border border-conversion/40 p-6">
                <p className="text-xs uppercase tracking-wider text-conversion mb-2">After</p>
                <p className="text-gray-100 leading-relaxed">{data.beforeAfter.after}</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-2xl bg-white/[0.03] border border-primary/30 p-7">
              <p className="text-xs uppercase tracking-wider text-primary mb-3">What Was Included</p>
              <ul className="space-y-2">
                {data.included.map((c) => (
                  <li key={c} className="text-gray-200 leading-relaxed">• {c}</li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <p className="text-xs uppercase tracking-wider text-primary mb-3">Results</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.results.map((r) => (
                <div
                  key={r}
                  className="flex items-center gap-2 rounded-lg bg-conversion/10 border border-conversion/40 px-4 py-3"
                >
                  <CheckCircle2 size={18} className="text-conversion shrink-0" />
                  <span className="text-sm font-semibold text-conversion">{r}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ContactSection />

      <Footer />
    </div>
  );
};

export default PortfolioDetail;
