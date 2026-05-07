import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import Results from "@/components/Results";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import WhatHappens from "@/components/WhatHappens";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ReviewsPreview from "@/components/ReviewsPreview";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import MarqueeTicker from "@/components/MarqueeTicker";
import LeadMagnet from "@/components/LeadMagnet";
import SEO from "@/components/SEO";
import { faqs } from "@/components/FAQ";
import { reviews } from "@/data/reviews";

const SITE = "https://georgia-j-chase.lovable.app";

const allFaqs = faqs;
const avgRating =
  reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1);

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Georgia J. Chase SEO Specialist",
    url: SITE,
    description: "SEO Specialist helping business owners get found on Google",
    email: "chasegeorgiaj@gmail.com",
    areaServed: "United States",
    serviceType: [
      "Local SEO",
      "Technical SEO Audit",
      "Ecommerce SEO",
      "Link Building",
      "Content Strategy",
      "Website SEO Design and Redesign",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Georgia J. Chase",
    jobTitle: "SEO Specialist",
    url: SITE,
    email: "chasegeorgiaj@gmail.com",
    sameAs: [
      "https://www.linkedin.com",
      "https://twitter.com",
      "https://www.instagram.com",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Georgia J. Chase",
    url: SITE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="SEO Specialist for Business Owners | Get Found on Google | Georgia J. Chase"
      description="Georgia J. Chase is an SEO Specialist helping US business owners rank on Google, drive organic traffic, and turn websites into lead machines. Free website check available."
      path="/"
      jsonLd={jsonLd}
    />
    <Navbar />
    <main>
      <Hero />
      <LeadMagnet />
      <MarqueeTicker />
      <TrustBar />
      <SectionDivider />
      <PainPoints />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <Results />
      <SectionDivider />
      <Stats />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <WhatHappens />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <ReviewsPreview />
      <SectionDivider />
      <FAQ />
    </main>
    <Footer />
  </div>
);

export default Index;

