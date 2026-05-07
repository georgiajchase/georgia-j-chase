import rank from "@/assets/blog-rank-90-days.jpg";
import local from "@/assets/blog-local-seo.jpg";
import audit from "@/assets/blog-audit.jpg";
import backlinks from "@/assets/blog-backlinks.jpg";
import speed from "@/assets/blog-speed.jpg";
import keywords from "@/assets/blog-keywords.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  focusKeyword: string;
  metaDescription: string;
  /** Array of paragraphs/HTML blocks. Rendered via dangerouslySetInnerHTML. */
  content: string[];
};

const AUTHOR = "Georgia J. Chase";

const SERVICES_LINK =
  '<a href="/services" class="text-primary font-semibold hover:underline">SEO services</a>';
const CONTACT_LINK =
  '<a href="/contact" class="text-primary font-semibold hover:underline">Get a free website check</a>';

export const blogPosts: BlogPost[] = [
  {
    slug: "rank-number-1-on-google-in-90-days",
    title: "How to Rank on Google #1 in 90 Days: A Step by Step Plan",
    image: rank,
    imageAlt: "How to rank on Google in 90 days search results illustration",
    date: "April 12, 2026",
    readTime: "7 min read",
    author: AUTHOR,
    focusKeyword: "how to rank on Google",
    metaDescription:
      "Learn how to rank on Google in 90 days with a proven 3 step plan covering technical SEO, content, and authority. Real tactics, no hacks.",
    excerpt:
      "How to rank on Google in 90 days is not magic. It is a focused process built on three things working together: a technically clean website, content that genuinely answers what people are searching for, and trust signals that prove your business deserves the top spot.",
    content: [
      "<p>Figuring out <strong>how to rank on Google</strong> inside ninety days is absolutely possible, but only if you stop chasing hacks and start treating your website like the asset it is. Google rewards three things: a technically clean site it can crawl easily, content that matches search intent, and clear signals that your business is trustworthy. When all three line up, rankings move quickly.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Weeks 1 and 2: Fix the Technical Foundation</h2>",
      "<p>The first two weeks are entirely about the foundation. Run a full technical audit looking for broken links, slow page speed, missing meta titles, duplicate content, poor mobile usability, and indexing issues. These problems quietly cap your growth no matter how much content you publish. Once the foundation is solid, Google starts trusting your site again and crawling it more often.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Weeks 3 and 4: Rewrite Your Money Pages</h2>",
      "<p>Weeks three and four focus on your money pages — the service and product pages that actually make you money. Rewrite each around the specific phrases your customers use. Each page gets one clear target keyword, a benefit driven headline, real proof, and a strong call to action. If you want this done for you, see my " + SERVICES_LINK + ".</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Month 2: Build Authority With Content and Links</h2>",
      "<p>The second month is about authority. Publish two or three deeply useful articles that answer the questions your prospects ask before they buy. Alongside content, work on local citations, Google Business Profile optimisation, and outreach to relevant industry sites for genuine backlinks.</p>",
      "<p>By month three the work compounds. Rankings that were stuck on page three start jumping to page one. Branded searches increase. Calls and form submissions go up. Done properly, ninety days is more than enough time to see real movement when you understand <strong>how to rank on Google</strong> the right way. Want me to look at your site first? " + CONTACT_LINK + " and I'll reply within 24 hours.</p>",
    ],
  },
  {
    slug: "local-seo-2026-what-actually-works",
    title: "Local SEO for Small Business in 2026: What Actually Moves the Needle",
    image: local,
    imageAlt: "Local SEO for small business map pin and storefront illustration",
    date: "April 5, 2026",
    readTime: "8 min read",
    author: AUTHOR,
    focusKeyword: "local SEO for small business",
    metaDescription:
      "Local SEO for small business in 2026: the Google Business Profile, review, and service area page tactics that win the map pack today.",
    excerpt:
      "Local SEO for small business has changed more in the last two years than in the previous ten. Google now blends map results, AI overviews, reviews, and proximity in ways that punish lazy listings and reward businesses that show up consistently across the web.",
    content: [
      "<p><strong>Local SEO for small business</strong> in 2026 is a different animal than it was even two years ago. Google has rebuilt the local algorithm around three pillars: relevance, distance, and prominence. Prominence is the one most owners ignore, and it is the one that decides whether you rank in the map pack or sit on page two forever.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Your Google Business Profile Is the New Homepage</h2>",
      "<p>Your Google Business Profile is the single most important asset in local SEO for small business. The primary category must match your main service exactly, secondary categories should cover your real offerings, and your description should read naturally while including the key terms customers use. Add photos every month and answer questions within 24 hours.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Reviews Are the New Backlinks</h2>",
      "<p>Google heavily weights both volume and velocity of reviews — a steady stream every week beats a one off burst of fifty. When customers mention the service they bought and the city they are in, Google reads those keywords as relevance signals. Need help building a review system? Browse my " + SERVICES_LINK + ".</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Service Area Pages Win the Long Tail</h2>",
      "<p>Instead of one generic services page, build a dedicated page for each city or suburb you serve. Each page should have unique content, real local references, embedded maps, and customer stories specific to that area. Done well, these pages rank for dozens of long tail searches your competitors miss completely.</p>",
      "<p>Consistency across the web still matters. Your business name, address, and phone number should be identical on every directory and citation site. <strong>Local SEO for small business</strong> is not glamorous, but the businesses that do these basics consistently are the ones that own their map pack year after year. " + CONTACT_LINK + " and I'll show you exactly what's holding your listing back.</p>",
    ],
  },
  {
    slug: "audit-your-website-in-30-minutes",
    title: "Free SEO Audit Checklist: Audit Your Own Website in 30 Minutes",
    image: audit,
    imageAlt: "Free SEO audit checklist clipboard with website checkmarks",
    date: "March 22, 2026",
    readTime: "6 min read",
    author: AUTHOR,
    focusKeyword: "free SEO audit checklist",
    metaDescription:
      "Use this free SEO audit checklist to find every issue costing you traffic and leads in 30 minutes. No tools to buy, no agency required.",
    excerpt:
      "You do not need to pay anyone to find the biggest problems on your website. With a free SEO audit checklist and thirty focused minutes you can uncover the exact issues that are quietly costing you traffic and leads.",
    content: [
      "<p>Auditing your own website sounds intimidating, but with a proper <strong>free SEO audit checklist</strong> the biggest issues on most sites are easy to spot once you know where to look. In thirty focused minutes, you can identify the problems that are quietly costing you traffic and leads.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Step 1: Check Indexing in Google Search Console</h2>",
      "<p>Start with Google Search Console. It is free, takes ten minutes, and shows you exactly which pages Google has indexed, which queries bring traffic, and which pages have errors. Look at the coverage report — any page that should rank but is excluded needs attention immediately.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Step 2: Run Page Speed and On Page Checks</h2>",
      "<p>Run your homepage and three most important pages through PageSpeed Insights. Anything below seventy on mobile is hurting your rankings. Then click through your site like a customer — can you find what you sell within five seconds? Is the call to action obvious? Most websites fail this test.</p>",
      "<p>Finally, check meta titles and descriptions. Every page should have a unique title under sixty characters and a description under one hundred sixty characters. If you'd rather have me run this <strong>free SEO audit checklist</strong> on your site personally, " + CONTACT_LINK + " or learn more about my " + SERVICES_LINK + ".</p>",
      "<p>Working through this checklist once a quarter is enough to keep most small business websites in good shape. The fixes you uncover usually pay for themselves within weeks because the issues are nearly always the simple ones every other site is also ignoring.</p>",
    ],
  },
  {
    slug: "backlinks-that-actually-work",
    title: "Link Building for Small Business: Backlinks That Actually Work in 2026",
    image: backlinks,
    imageAlt: "Link building for small business chain links connecting websites",
    date: "March 8, 2026",
    readTime: "7 min read",
    author: AUTHOR,
    focusKeyword: "link building for small business",
    metaDescription:
      "Link building for small business in 2026: the safe, high-impact backlink tactics that actually move rankings and the ones that get you penalised.",
    excerpt:
      "Link building for small business still matters in 2026, but the rules have completely changed. Google has spent years training its algorithm to ignore the kind of cheap directory links and guest posts that used to move the needle.",
    content: [
      "<p><strong>Link building for small business</strong> remains one of the strongest ranking signals in 2026, but the kind of links that work has changed dramatically. The safest and most effective strategy now is to focus on a small number of high quality links from sites that are genuinely respected in your industry or community.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Local News and Industry Mentions</h2>",
      "<p>The single best link you can earn is a mention from a trusted local news outlet. Tools like HARO and Qwoted let you respond to journalist requests every day. A single feature in a regional newspaper often does more for your rankings than months of generic outreach.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Resource Pages and Broken Link Building</h2>",
      "<p>Resource pages and broken link building still work in 2026. Find pages on authoritative sites that list helpful resources in your industry. If you have a useful free tool or guide, suggest it as an addition. For broken link building, find dead links and offer your content as a replacement. Want me to handle this for you? See my " + SERVICES_LINK + ".</p>",
      "<p>What absolutely does not work anymore: paid link networks, guest post farms, comment spam, and any service promising volume. Google can detect these patterns and the penalties cost more to recover from than the links ever provided.</p>",
      "<p>Quality always beats quantity in modern <strong>link building for small business</strong>. If you suspect old tactics are dragging your site down, " + CONTACT_LINK + " and I'll review your backlink profile within 24 hours.</p>",
    ],
  },
  {
    slug: "core-web-vitals-page-speed-2026",
    title: "Improve Website Speed for SEO: Core Web Vitals Decide Your Rankings",
    image: speed,
    imageAlt: "Improve website speed for SEO speedometer showing fast page load",
    date: "February 19, 2026",
    readTime: "6 min read",
    author: AUTHOR,
    focusKeyword: "improve website speed for SEO",
    metaDescription:
      "Improve website speed for SEO: the practical Core Web Vitals fixes that boost rankings and conversions on any small business website.",
    excerpt:
      "If you want to improve website speed for SEO, you need to understand Core Web Vitals. Google now uses them as a direct ranking factor, which means slow sites are pushed down in search results and never get a chance to convert.",
    content: [
      "<p>Page speed used to be a nice to have. In 2026 it is a make or break ranking factor, which is why every business owner needs to <strong>improve website speed for SEO</strong>. Google measures three Core Web Vitals: largest contentful paint, interaction to next paint, and cumulative layout shift. Failing any of the three drags down rankings and conversion rate at the same time.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Largest Contentful Paint: Compress Your Hero Image</h2>",
      "<p>Largest contentful paint should happen in under 2.5 seconds on mobile. The biggest culprit is almost always an oversized hero image. Compressing images to under 200KB and serving them in WebP or AVIF often shaves a full second off load time without any noticeable quality loss.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Interaction to Next Paint: Audit Third Party Scripts</h2>",
      "<p>Anything above 200ms counts as poor. The most common cause is too many third party scripts: chat widgets, analytics, ad pixels, and heatmap tools. Audit every script on your site and ask whether it is genuinely earning its place. Most businesses can remove half of them with no negative impact.</p>",
      "<p>Cumulative layout shift is the easiest to fix — reserve explicit width and height on every image and avoid interstitials. Combined with caching, lazy loading, and limiting fonts, your scores will move from red to green within a week.</p>",
      "<p>If you'd rather have someone do this for you, my " + SERVICES_LINK + " include full Core Web Vitals optimisation. Or " + CONTACT_LINK + " and I'll tell you exactly which fixes will <strong>improve website speed for SEO</strong> on your site fastest.</p>",
    ],
  },
  {
    slug: "keyword-research-that-finds-buyers",
    title: "Keyword Research for Business Owners: Find Buyers, Not Browsers",
    image: keywords,
    imageAlt: "Keyword research for business owners magnifying glass over search terms",
    date: "February 1, 2026",
    readTime: "7 min read",
    author: AUTHOR,
    focusKeyword: "keyword research for business owners",
    metaDescription:
      "Keyword research for business owners: a simple, free process to find buyer intent keywords that actually convert into leads and revenue.",
    excerpt:
      "Most keyword research is a complete waste of time. Keyword research for business owners should focus on buyer intent, not search volume. A keyword with 200 searches a month and clear commercial intent will produce more revenue than 20,000 searches with no intent.",
    content: [
      "<p><strong>Keyword research for business owners</strong> done badly is the single biggest reason businesses waste money on SEO. Chasing massive search volumes feels productive, but high volume keywords usually have low intent and crushing competition. Smart keyword research is about matching the words real customers type when they are ready to spend money.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Start With Intent, Not Volume</h2>",
      "<p>Group every potential keyword into one of four buckets: informational, navigational, commercial investigation, and transactional. As a service business, the keywords that pay your bills sit in the bottom two categories. Phrases like best plumber in Calgary or affordable bookkeeping for small business signal that someone is ready to buy.</p>",
      "<h2 class='font-heading font-bold text-2xl text-foreground mt-8 mb-3'>Use Free Tools to Find Real Questions</h2>",
      "<p>Free tools are enough to do excellent keyword research. Google Search Console shows queries already bringing traffic. Google Autocomplete and People Also Ask boxes show real questions users are asking right now. Answer the Public groups these into themes you can build content clusters around. Want this done for you? See my " + SERVICES_LINK + ".</p>",
      "<p>Long tail keywords are where the real money lives. Instead of fighting for plumber Calgary, target emergency plumber for burst pipe in southwest Calgary. The traffic is smaller, but conversion rates are often ten times higher.</p>",
      "<p>Validate every keyword by looking at the search results before you write. <strong>Keyword research for business owners</strong> is the discipline that quietly outperforms every clever SEO tactic. " + CONTACT_LINK + " and I'll send back the three highest intent keywords your site should target this quarter.</p>",
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
