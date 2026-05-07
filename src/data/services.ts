import { MapPin, ShoppingCart, Settings, Link2, FileText, Layout, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  deliverables: string[];
  timeline: string;
};

export const services: Service[] = [
  {
    slug: "local-seo",
    title: "Local SEO",
    icon: MapPin,
    tagline: "Be the business locals find first.",
    description:
      "I help local businesses dominate Google Maps and the local pack so the right customers in your area find you before they find your competitors. From Google Business Profile optimisation to local citations and review strategy, every move is built to bring more calls, foot traffic, and bookings from people in your service area.",
    deliverables: [
      "Google Business Profile audit & full optimisation",
      "Local keyword research mapped to service areas",
      "NAP consistency cleanup across 50+ citation sites",
      "On Page local SEO for every service & location page",
      "Review generation strategy & response templates",
      "Monthly local rank tracking & performance report",
    ],
    timeline: "Initial wins in 30 days. Strong local pack rankings in 60 to 90 days.",
  },
  {
    slug: "ecommerce-seo",
    title: "Ecommerce SEO",
    icon: ShoppingCart,
    tagline: "More shoppers. More revenue. Less ad spend.",
    description:
      "I help online stores rank higher for the products people actually buy. From category page architecture to product schema and conversion optimisation, every fix is designed to bring qualified shoppers to your store and turn more of them into paying customers. Without burning more on ads.",
    deliverables: [
      "Full ecommerce technical audit (Shopify, WooCommerce, Magento)",
      "Product & category page keyword strategy",
      "Schema markup for products, reviews, and offers",
      "Site architecture & internal linking overhaul",
      "Collection page optimisation & filter SEO",
      "Conversion rate review on top revenue pages",
    ],
    timeline: "First ranking improvements in 4 to 6 weeks. Measurable revenue lift in 90 days.",
  },
  {
    slug: "technical-seo-audit",
    title: "Technical SEO Audit",
    icon: Settings,
    tagline: "Find the hidden errors holding your site back.",
    description:
      "Most websites are leaking traffic from problems the owner has no idea exist. Broken crawl paths, slow pages, indexing issues, and Core Web Vitals failures. I'll dig into every layer of your site and hand you a plain-English report of exactly what's broken, why it matters, and how to fix it.",
    deliverables: [
      "Full crawl & indexation analysis",
      "Core Web Vitals & page speed deep dive",
      "Mobile usability & responsive testing",
      "Structured data & schema validation",
      "Internal linking & site architecture review",
      "Prioritised fix list with effort vs impact scoring",
    ],
    timeline: "Audit delivered in 7 to 10 business days.",
  },
  {
    slug: "link-building",
    title: "Link Building",
    icon: Link2,
    tagline: "Authority links from sites that actually matter.",
    description:
      "Google still treats links as votes of trust — but only the right ones count. I build relevant, editorially-earned backlinks from real publications and niche-relevant sites. No PBNs, no spam, no link farms. Just authority signals that move rankings and stand up to algorithm updates.",
    deliverables: [
      "Backlink profile audit & toxic link cleanup",
      "Competitor link gap analysis",
      "Digital PR & guest post outreach campaigns",
      "Niche edits & contextual placements",
      "HARO & expert quote sourcing",
      "Monthly link acquisition report with metrics",
    ],
    timeline: "First links live within 30 days. Consistent monthly placements ongoing.",
  },
  {
    slug: "content-strategy",
    title: "Content Strategy",
    icon: FileText,
    tagline: "Content that ranks, reads well, and converts.",
    description:
      "I build content strategies around what your customers actually search for — not vanity topics. Every piece is mapped to a stage of the buyer journey, optimised for search intent, and written to convert readers into leads. The result is a content engine that compounds in traffic and revenue month after month.",
    deliverables: [
      "Topic cluster & pillar page strategy",
      "Search intent mapped keyword research",
      "12 month editorial calendar",
      "SEO content briefs for every article",
      "Content refresh plan for existing pages",
      "Internal linking strategy across new content",
    ],
    timeline: "Strategy delivered in 2 weeks. Compounding traffic growth from month 3 onward.",
  },
  {
    slug: "website-seo-design",
    title: "Website SEO Design and Redesign",
    icon: Layout,
    tagline: "Websites built to rank and convert from day one.",
    description:
      "I design and redesign websites specifically built to rank on Google and convert visitors into paying clients. This is not just a pretty website. Every element is built with SEO structure, conversion psychology, and Google's ranking signals in mind.",
    deliverables: [
      "Custom website design or redesign",
      "On Page SEO built in from day one",
      "Conversion optimized layout and copywriting",
      "Mobile first responsive build",
      "Google Analytics and Search Console setup",
      "Page Speed score above 90",
    ],
    timeline: "2 to 4 weeks.",
  },
];
