export type Review = {
  name: string;
  business: string;
  date: string;
  rating: number;
  text: string;
  verified: boolean;
};

export const reviews: Review[] = [
  {
    name: "Marcus T.",
    business: "Local HVAC Company",
    date: "March 2025",
    rating: 5,
    text: "Georgia ranked us number 1 in Google Maps within 30 days. Lead calls went up 280% in the first two months. She actually explains what she is doing instead of hiding behind jargon. That alone was worth it.",
    verified: true,
  },
  {
    name: "Priya S.",
    business: "Shopify Store Owner",
    date: "February 2025",
    rating: 5,
    text: "We were stuck on page 5 for our main product category for almost a year. Sixty days after Georgia took over the technical audit and product page rewrites, we hit number 1. Revenue grew $127K that quarter.",
    verified: true,
  },
  {
    name: "Daniel R.",
    business: "B2B SaaS Founder",
    date: "January 2025",
    rating: 5,
    text: "Six months ago we had 200 organic visitors a month. Today we are at 15,000. Georgia built the strategy, the content briefs, and the technical foundation. No fluff, no monthly excuses. Just results.",
    verified: true,
  },
  {
    name: "Alyssa D.",
    business: "Insurance Brokerage",
    date: "April 2025",
    rating: 5,
    text: "Our SEO score went from a mess to 100/100. Every page on our 30+ page site was rewritten and optimized. Georgia caught issues three previous agencies completely missed.",
    verified: true,
  },
  {
    name: "Jordan M.",
    business: "PR & Marketing Agency",
    date: "March 2025",
    rating: 5,
    text: "GTmetrix Grade A. Mobile score finally green. The audit alone gave us a 12 month roadmap that was clearer than anything we'd ever paid for. Genuine, smart, and detail obsessed.",
    verified: true,
  },
];
