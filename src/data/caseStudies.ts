import ecommerce from "@/assets/case-ecommerce.jpg";
import local from "@/assets/case-local.jpg";
import saas from "@/assets/case-saas.jpg";

export type Stat = { label: string; before: string; after: string };

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  headline: string;
  summary: string;
  image: string;
  duration: string;
  highlights: string[]; // top-line metric chips
  stats: Stat[]; // before / after table
  challenge: string[];
  approach: { title: string; detail: string }[];
  results: string[];
  testimonial: { quote: string; name: string; role: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ecommerce-page-5-to-1-in-60-days",
    client: "Northbridge Apparel",
    industry: "Ecommerce",
    headline: "From Page 5 to #1 in 60 Days. $127k in New Revenue",
    summary:
      "An online fashion retailer was buried on page 5 of Google for every product category that mattered. In 60 days we rebuilt their technical foundation, rewrote their top 40 product pages around real buyer keywords, and launched a topical content cluster that earned natural links. Organic traffic jumped 340%, average order value climbed by 18%, and the business added $127,000 in tracked organic revenue inside the first quarter.",
    image: ecommerce,
    duration: "60 days",
    highlights: ["Rank #1", "+340% Traffic", "$127k Revenue"],
    stats: [
      { label: "Google Ranking", before: "Page 5", after: "#1" },
      { label: "Organic Traffic", before: "4,200/mo", after: "18,480/mo" },
      { label: "Organic Revenue", before: "$11k/mo", after: "$53k/mo" },
      { label: "Conversion Rate", before: "0.9%", after: "2.4%" },
      { label: "Indexed Pages", before: "62", after: "418" },
    ],
    challenge: [
      "Northbridge Apparel had invested heavily in product photography and paid ads, but their organic search performance was almost non-existent. Despite a beautiful storefront, they sat on page 5 of Google for every commercial keyword that mattered to their buyers.",
      "A quick audit surfaced the real problem. Their site had 140+ duplicate product URLs, no canonical tags, broken internal links, and product descriptions copied straight from suppliers. Google had quietly stopped indexing most of their catalog.",
    ],
    approach: [
      {
        title: "Week 1. Technical Cleanup",
        detail:
          "Fixed canonical tags, deduplicated 140+ URLs, repaired broken internal links, compressed every product image, and submitted a clean XML sitemap. Within ten days indexed pages jumped from 62 to over 400.",
      },
      {
        title: "Weeks 2 to 4. Money Page Rewrites",
        detail:
          "Rewrote the top 40 product and category pages around the exact phrases real buyers were typing. Added structured data, real reviews, and a single clear call to action per page.",
      },
      {
        title: "Weeks 5 to 8. Content & Authority",
        detail:
          "Published a tightly themed cluster of buying guides that linked back to the rewritten product pages and earned natural backlinks from style blogs and a regional newspaper.",
      },
    ],
    results: [
      "Ranked #1 on Google for the brand's three highest-converting commercial keywords by day 58.",
      "Organic traffic grew from 4,200 to 18,480 visits per month. a 340% increase.",
      "Organic revenue tracked $127,000 in net new sales over the 90 day window after launch.",
      "Conversion rate on organic traffic improved from 0.9% to 2.4% thanks to cleaner page structure.",
    ],
    testimonial: {
      quote:
        "Georgia found problems on our store that three previous agencies completely missed. Sixty days later we were ranking #1 and the revenue spoke for itself. Best money we have ever spent on marketing.",
      name: "Priya R.",
      role: "Founder, Northbridge Apparel",
    },
  },
  {
    slug: "local-business-google-maps-1-in-30-days",
    client: "Cedar & Stone Dental",
    industry: "Local Business",
    headline: "#1 in Google Maps in 30 Days. Leads Up 280%",
    summary:
      "A dental practice was invisible in their own neighbourhood. Competitors with weaker reviews were ranking above them simply because their Google Business Profile was incomplete and citations were inconsistent. We rebuilt the profile, cleaned up 60+ citations, launched a structured review request flow, and added city-specific service pages. Within 30 days they ranked #1 in the Google Maps pack for their three primary services and lead volume climbed 280%.",
    image: local,
    duration: "30 days",
    highlights: ["#1 Map Pack", "+280% Leads", "60+ Citations Fixed"],
    stats: [
      { label: "Map Pack Position", before: "Not visible", after: "#1" },
      { label: "Monthly Leads", before: "12", after: "46" },
      { label: "Profile Views", before: "210/mo", after: "1,840/mo" },
      { label: "Direction Requests", before: "18/mo", after: "127/mo" },
      { label: "Reviews", before: "23", after: "118" },
    ],
    challenge: [
      "Cedar & Stone Dental had been operating for six years with great in-clinic reviews but almost no online visibility. Searches for their main services in their own city returned three competitors. and Cedar & Stone was nowhere to be seen.",
      "Their Google Business Profile was set up years ago and never optimised. Categories were wrong, photos were stale, and the business name and address were inconsistent across more than 60 directories.",
    ],
    approach: [
      {
        title: "Days 1 to 7. Profile Rebuild",
        detail:
          "Reset the primary category, added the right secondary categories, uploaded 40 fresh photos, wrote a keyword-rich description, and turned on messaging and bookings.",
      },
      {
        title: "Days 8 to 18. Citation Cleanup",
        detail:
          "Audited and corrected the business name, address, and phone number across 60+ directories. Inconsistent citations had been quietly capping local rankings for years.",
      },
      {
        title: "Days 19 to 30. Reviews & Service Area Pages",
        detail:
          "Launched a simple text-message review request flow that doubled monthly review velocity, and built three city-specific service pages targeting the surrounding suburbs.",
      },
    ],
    results: [
      "Hit #1 in the Google Maps pack for the three primary services on day 27.",
      "Monthly lead volume grew from 12 to 46. a 280% increase.",
      "Direction requests grew 7x, with most new patients citing 'found you on Google' at intake.",
      "Reviews grew from 23 to 118 in the first 30 days, locking in long-term local prominence.",
    ],
    testimonial: {
      quote:
        "We used to wonder why we were so quiet compared to clinics with worse reviews. Georgia explained exactly why in plain English and fixed it in less than 30 days.",
      name: "Dr. Marcus L.",
      role: "Owner, Cedar and Stone Dental",
    },
  },
  {
    slug: "saas-organic-growth-200-to-15000",
    client: "Loopwave Analytics",
    industry: "SaaS",
    headline: "From 200 to 15,000 Monthly Visitors in 6 Months",
    summary:
      "A B2B analytics SaaS was relying entirely on paid ads to bring in trials. Organic search was an afterthought, attracting just 200 visitors a month. We mapped their buyer journey to a long tail keyword universe, built a programmatic comparison engine, launched a 30-piece content cluster, and earned authority links from tier-one industry publications. Six months in, organic traffic hit 15,000 visits per month and SEO became their cheapest, highest-converting acquisition channel.",
    image: saas,
    duration: "6 months",
    highlights: ["+7,400% Traffic", "200 → 15,000", "Top of Funnel On Autopilot"],
    stats: [
      { label: "Monthly Organic Visitors", before: "200", after: "15,000" },
      { label: "Ranking Keywords", before: "37", after: "2,840" },
      { label: "Backlinks (referring domains)", before: "14", after: "186" },
      { label: "Trial Signups from Organic", before: "3/mo", after: "210/mo" },
      { label: "CAC vs Paid", before: "None", after: "82% lower" },
    ],
    challenge: [
      "Loopwave Analytics had a strong product but was burning runway on paid acquisition. Their blog was a graveyard of generic posts that attracted no qualified traffic. With investor pressure to lower CAC, organic search had to start working. fast.",
      "The competitive landscape was crowded with established players. Going head-to-head on broad keywords would take years. We needed an approach that compounded quickly while sidestepping the giants.",
    ],
    approach: [
      {
        title: "Month 1. Foundation & Strategy",
        detail:
          "Mapped the buyer journey to a 2,400 keyword universe focused on long tail commercial intent. Rebuilt the site architecture around clear topic clusters with strong internal linking.",
      },
      {
        title: "Months 2 to 3. Programmatic Comparison Engine",
        detail:
          "Launched 180 high-quality comparison and alternative pages targeting competitor brand searches. a fast lane to qualified traffic the giants ignored.",
      },
      {
        title: "Months 4 to 6. Content Cluster & Authority",
        detail:
          "Published 30 deep-dive articles answering the questions buyers ask before purchase. Earned backlinks from six tier-one industry publications through original data studies.",
      },
    ],
    results: [
      "Organic traffic grew from 200 to 15,000 monthly visitors. a 75x increase.",
      "Ranking keywords expanded from 37 to 2,840 across commercial and informational intent.",
      "Trial signups from organic grew from 3 to 210 per month at 82% lower CAC than paid.",
      "Organic became the company's primary acquisition channel within 6 months.",
    ],
    testimonial: {
      quote:
        "Georgia turned SEO from a side project into our biggest growth lever. We are now generating more qualified trials from organic than from any paid channel we have ever run.",
      name: "Daniel K.",
      role: "Head of Growth, Loopwave Analytics",
    },
  },
];

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
