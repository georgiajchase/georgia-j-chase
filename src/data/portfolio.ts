export type PortfolioProject = {
  slug: string;
  name: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
};

export const portfolio: PortfolioProject[] = [
  {
    slug: "barclay-group-insurance",
    name: "The Barclay Group Insurance",
    industry: "Insurance",
    challenge:
      "30+ pages had zero SEO optimization and no keyphrases set. Google was generating random descriptions.",
    solution:
      "Full on-page SEO and AEO optimization across every page. 35+ images tagged with alt text. Locally targeted keyphrases for NJ and PA.",
    results: [
      "SEO score 100/100",
      "Performance 89/100",
      "Every page fully ranked",
    ],
  },
  {
    slug: "brightchatter-media",
    name: "BrightChatter Media",
    industry: "Marketing and PR",
    challenge:
      "Mobile score 67. Domain Rating 0. 19 SEO issues identified. No schema markup. No social tags.",
    solution:
      "Complete SEO audit with growth roadmap. GTmetrix Grade A confirmed. Mobile improvement plan, schema and backlink strategy.",
    results: [
      "GTmetrix Grade A 97% performance",
      "Clear roadmap to page 1",
      "19 issues documented and solved",
    ],
  },
  {
    slug: "travel-gifts-online",
    name: "Travel Gifts Online",
    industry: "Ecommerce",
    challenge:
      "46 products invisible to search engines with generic titles and no optimization.",
    solution:
      "All 46 product titles and descriptions rewritten with keywords. Google Merchant Center configured. Pinterest Business with 15 pins across 5 boards. 9 Instagram captions and a 1200 word blog post delivered.",
    results: [
      "Discoverable on Google Shopping",
      "Pinterest and Instagram presence",
      "Full content strategy ready",
    ],
  },
];
