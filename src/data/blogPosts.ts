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
  /** Array of paragraphs forming the full article body. May contain inline HTML for links/headings. */
  content: string[];
};

const AUTHOR = "Georgia J. Chase";

export const blogPosts: BlogPost[] = [
  {
    slug: "rank-number-1-on-google-in-90-days",
    title: "How to Rank #1 on Google in 90 Days",
    image: rank,
    date: "April 12, 2026",
    readTime: "7 min read",
    author: AUTHOR,
    excerpt:
      "Ranking number one on Google in 90 days is not magic. It is a focused process built on three things working together: a technically clean website, content that genuinely answers what people are searching for, and trust signals that prove your business deserves the top spot. Most business owners try to shortcut this with cheap tricks and end up frustrated when nothing moves. In this guide I will walk you through the exact 90 day plan I use with my own clients. We will start with a deep technical audit in week one, fix crawl and indexing issues by week two, then spend the rest of the first month rebuilding your most important pages around real keywords your customers actually type. Months two and three are where the rankings start climbing as Google rewards consistency, internal linking, and earned authority. By day 90 you should be on page one for several commercial keywords, with a clear path to the top three.",
    content: [
      "Ranking number one on Google inside ninety days is absolutely possible, but only if you stop chasing hacks and start treating your website like the asset it is. Most business owners waste months posting random blog content, buying cheap backlinks, or paying agencies who hide behind jargon. The reality is far simpler. Google rewards three things: a technically clean website it can crawl easily, content that matches the exact intent behind a search, and clear signals that your business is trustworthy. When all three line up, rankings move quickly.",
      "The first two weeks are entirely about the foundation. I run a full technical audit looking for broken links, slow page speed, missing meta titles, duplicate content, poor mobile usability, and indexing issues. These problems quietly cap your growth no matter how much content you publish. Fixing them is the highest leverage work you can do, and it is usually invisible to the business owner. Once the foundation is solid, Google starts trusting your site again and crawling it more often.",
      "Weeks three and four focus on your money pages. These are the service pages and product pages that actually make you money. I rewrite them around the specific phrases your customers use, not the corporate language you might be tempted to use. Each page gets one clear target keyword, a benefit driven headline, real proof such as testimonials or case studies, and a strong call to action. Internal links between these pages tell Google which pages matter most.",
      "The second month is about authority. I publish two or three deeply useful articles that answer the questions your prospects ask before they buy. These pieces are designed to earn links naturally and to keep visitors on your site longer, both of which Google reads as positive signals. Alongside content, I work on local citations, Google Business Profile optimisation, and outreach to relevant industry sites for genuine backlinks.",
      "By month three the work compounds. Rankings that were stuck on page three start jumping to page one. Branded searches increase. Calls and form submissions go up. The final weeks are about doubling down on the keywords that are climbing fastest, expanding the content cluster around them, and tightening conversion on the pages now receiving traffic. Done properly, ninety days is more than enough time to see real movement, real leads, and a clear roadmap for the rest of the year.",
    ],
  },
  {
    slug: "local-seo-2026-what-actually-works",
    title: "Local SEO in 2026: What Actually Moves the Needle",
    image: local,
    date: "April 5, 2026",
    readTime: "8 min read",
    author: AUTHOR,
    excerpt:
      "Local SEO has changed more in the last two years than in the previous ten. Google now blends map results, AI overviews, reviews, and proximity in ways that punish lazy listings and reward businesses that show up consistently across the web. If you run a local business and you are not in the map pack for your main service, you are losing customers every single day to competitors who are. The good news is that local SEO is one of the fastest moving channels you can fix. With the right Google Business Profile setup, the right review strategy, and a handful of properly written service area pages, most local businesses can dominate their map pack within a few months. In this article I will explain exactly which signals matter most in 2026, which ones have lost weight, and the simple weekly habits that keep your listing climbing instead of slipping.",
    content: [
      "Local SEO in 2026 is a different animal than it was even two years ago. Google has rebuilt the local algorithm around three pillars: relevance, distance, and prominence. Relevance means your listing clearly matches what someone is searching for. Distance is obvious. Prominence is the one most business owners ignore, and it is the one that decides whether you rank in the map pack or sit on page two forever.",
      "Your Google Business Profile is the single most important asset in local SEO. Treat it like a mini website. The primary category must match your main service exactly, secondary categories should cover your real offerings without stuffing, and your business description should read naturally while including the key terms customers use. Add photos every month, post weekly updates, and answer every question that comes through the profile within twenty four hours.",
      "Reviews are the new backlinks. Google heavily weights both the volume and the velocity of reviews, meaning a steady stream every week beats a one off burst of fifty. The wording matters too. When customers mention the service they bought and the city they are in, Google reads those keywords as genuine relevance signals. I coach clients to ask happy customers right after the moment of delight, not days later when the enthusiasm has faded.",
      "Service area pages are the most underused tactic in local SEO. Instead of one generic services page, build a dedicated page for each city or suburb you serve. Each page should have unique content, real local references, embedded maps, and customer stories specific to that area. Done well, these pages rank for dozens of long tail searches that your competitors are completely missing.",
      "Finally, consistency across the web still matters. Your business name, address, and phone number should be identical on every directory, social profile, and citation site. Inconsistencies confuse Google and hurt prominence. Spend a weekend cleaning up old listings, claim the major directories in your industry, and then maintain it quarterly. Local SEO is not glamorous, but the businesses that do these basics consistently are the ones that own their map pack year after year.",
    ],
  },
  {
    slug: "audit-your-website-in-30-minutes",
    title: "How to Audit Your Own Website in 30 Minutes",
    image: audit,
    date: "March 22, 2026",
    readTime: "6 min read",
    author: AUTHOR,
    excerpt:
      "You do not need to pay anyone to find the biggest problems on your website. With thirty focused minutes, a free Google account, and the checklist in this article, you can uncover the exact issues that are quietly costing you traffic and leads. Most websites I review have the same handful of problems repeating again and again: slow page speed, broken internal links, missing meta tags, weak headlines, and pages that are not even indexed by Google. These are not advanced issues. They are basics that get overlooked because no one is checking. By the end of this article you will know how to run a full self audit, prioritise the fixes that matter most, and decide which ones you can do yourself versus which ones you should hand off to a specialist. This is the same checklist I run on every new client site before I quote any work.",
    content: [
      "Auditing your own website sounds intimidating, but the truth is the biggest issues on most sites are easy to spot once you know where to look. In thirty focused minutes, you can identify the problems that are quietly costing you traffic and leads, and decide which ones to fix yourself.",
      "Start with Google Search Console. If you do not already have it set up, do that first. It is free, takes ten minutes, and shows you exactly which of your pages Google has indexed, which queries are bringing traffic, and which pages have errors. Look for the coverage report. Any page that should rank but is marked as excluded or not indexed needs immediate attention. This single step alone surfaces issues that most business owners never know about.",
      "Next, run your homepage and three most important pages through PageSpeed Insights. Anything below seventy on mobile is hurting your rankings. Pay attention to the largest contentful paint and cumulative layout shift scores. Common fixes include compressing images, removing unused scripts, and switching to modern image formats. You do not need to fix everything, just the issues flagged as critical.",
      "Now do a manual click through. Open your site in a private browsing window and behave like a customer. Can you find what you sell within five seconds of landing on the homepage? Is the call to action obvious on every page? Do internal links work? Are headlines benefit driven or just clever? Most websites fail this test, and the fixes are usually copy and layout changes you can make yourself.",
      "Finally, check your meta titles and descriptions. View the source of each main page or use a free Chrome extension to inspect them. Every page should have a unique title under sixty characters and a description under one hundred sixty characters that includes the keyword someone would search to find that page. Generic or duplicate titles are one of the most common reasons pages fail to rank, and one of the easiest to fix.",
    ],
  },
  {
    slug: "backlinks-that-actually-work",
    title: "Backlinks That Actually Work in 2026",
    image: backlinks,
    date: "March 8, 2026",
    readTime: "7 min read",
    author: AUTHOR,
    excerpt:
      "Backlinks still matter in 2026, but the rules have completely changed. Google has spent years training its algorithm to ignore the kind of cheap directory links and guest posts that used to move the needle. What works now is a much smaller number of links from sites that are genuinely respected in your industry. One link from a trusted local newspaper or a respected industry blog will outperform fifty random directory submissions. In this article I explain exactly what kind of backlinks Google rewards in 2026, the outreach techniques that still get responses, and the link building habits that quietly destroy rankings if you are not careful. If you have ever bought links, used a private blog network, or paid for a service promising hundreds of backlinks per month, you need to read this before you do any more damage.",
    content: [
      "Backlinks remain one of the strongest ranking signals in 2026, but the kind of links that work has changed dramatically. Google has become extremely good at spotting manipulated link profiles, and the penalties for getting it wrong are severe. The safest and most effective strategy now is to focus on a small number of high quality links from sites that are genuinely respected in your industry or community.",
      "The single best link you can earn is a mention from a trusted local news outlet. Local journalists are constantly looking for quotes from real business owners on stories about their industry. Tools like HARO and Qwoted let you respond to journalist requests every day. A single feature in a regional newspaper often does more for your rankings than months of generic outreach.",
      "Industry publications are the next tier. Identify the top five blogs or magazines in your niche and study what they publish. Then pitch a piece that fits their style and offers original insight, not a recycled list post. Editors receive hundreds of pitches a week, so being specific about what you will write and why their audience will care matters more than your credentials.",
      "Resource pages and broken link building still work in 2026. Find pages on authoritative sites that list helpful resources in your industry. If you have a genuinely useful free tool, calculator, or guide, reach out and suggest it as an addition. For broken link building, find dead links on those resource pages and offer your content as a replacement. Both tactics have low response rates but high conversion when you target the right pages.",
      "What absolutely does not work anymore: paid link networks, guest post farms, comment spam, and any service promising volume. Google can detect these patterns and the penalties cost more to recover from than the links ever provided. If you have used these tactics in the past, audit your backlink profile, disavow obvious junk, and rebuild slowly with the methods above. Quality always beats quantity in modern link building.",
    ],
  },
  {
    slug: "core-web-vitals-page-speed-2026",
    title: "Core Web Vitals: Why Page Speed Decides Your Rankings",
    image: speed,
    date: "February 19, 2026",
    readTime: "6 min read",
    author: AUTHOR,
    excerpt:
      "If your website takes more than three seconds to load, you are losing roughly half your visitors before they even see your offer. Worse, Google now uses Core Web Vitals as a direct ranking factor, which means slow sites are pushed down in search results and never get a chance to convert. Most business owners assume page speed is a developer problem, but the biggest fixes are usually content decisions that anyone can make: oversized images, autoplay videos, bloated fonts, and tracking scripts that should have been removed years ago. In this guide I explain what each Core Web Vital actually measures, what numbers you should be aiming for, and the practical fixes that bring scores up fast. By the end you will know exactly what to ask your developer and what you can fix yourself this afternoon.",
    content: [
      "Page speed used to be a nice to have. In 2026 it is a make or break ranking factor. Google measures three Core Web Vitals: largest contentful paint, which tracks how fast your main content appears, interaction to next paint, which measures responsiveness, and cumulative layout shift, which catches pages that jump around as they load. Failing any of the three drags down your rankings and your conversion rate at the same time.",
      "Largest contentful paint should happen in under two and a half seconds on mobile. The biggest culprit is almost always an oversized hero image. Photos straight from a phone or stock site can be five megabytes or more. Compressing them to under two hundred kilobytes and serving them in modern formats like WebP or AVIF often shaves a full second off your load time without any noticeable quality loss.",
      "Interaction to next paint replaced the old first input delay metric and is much stricter. Anything above two hundred milliseconds counts as poor. The most common cause is too many third party scripts: chat widgets, analytics, ad pixels, and heatmap tools all add up. Audit every script on your site and ask whether it is genuinely earning its place. Most businesses can remove half of them with no negative impact.",
      "Cumulative layout shift is the most overlooked Core Web Vital and one of the easiest to fix. It happens when elements like images, ads, or pop ups push other content around as the page loads. Reserving explicit width and height on every image and avoiding interstitials that appear after the page loads will usually fix the score completely.",
      "Beyond the three vitals, focus on caching, lazy loading, and reducing the number of fonts you load. Limit yourself to one or two font families, two weights each, and load them with font display swap. Combine these with a fast modern host and a content delivery network, and your scores will move from red to green within a week. The traffic and conversion gains usually pay for the work many times over within the first month.",
    ],
  },
  {
    slug: "keyword-research-that-finds-buyers",
    title: "Keyword Research That Finds Buyers, Not Browsers",
    image: keywords,
    date: "February 1, 2026",
    readTime: "7 min read",
    author: AUTHOR,
    excerpt:
      "Most keyword research is a complete waste of time. Business owners chase high volume keywords with massive competition, then wonder why none of the traffic turns into customers. The truth is that buyer intent matters far more than search volume. A keyword with two hundred searches a month and clear commercial intent will produce more revenue than a keyword with twenty thousand searches and no intent to purchase. In this guide I show you the exact process I use to find keywords that real customers type when they are ready to buy, the free tools that surface them, and how to build a content plan that targets a mix of quick wins and long term authority terms. If you have spent money writing content that nobody reads or paying for keywords that bring no leads, this article will save you months of frustration.",
    content: [
      "Keyword research done badly is the single biggest reason businesses waste money on SEO. Chasing massive search volumes feels productive, but high volume keywords usually have low intent and crushing competition. Smart keyword research is about matching the words your actual customers type when they are ready to spend money, even when those phrases have modest search volumes.",
      "Start with intent, not volume. Group every potential keyword into one of four intent buckets: informational, navigational, commercial investigation, and transactional. As a service business, the keywords that pay your bills sit in the bottom two categories. Phrases like best plumber in Calgary, hire a copywriter for SaaS, or affordable bookkeeping for small business signal that someone is comparing options or ready to buy. These are the keywords your money pages should target.",
      "Free tools are enough to do excellent keyword research. Google Search Console shows you the queries already bringing traffic to your site, often surfacing winning keywords you never targeted on purpose. Google Autocomplete and the People Also Ask boxes show real questions that real users are asking right now. Answer the Public groups these into themes you can build entire content clusters around.",
      "Long tail keywords are where the real money lives. Instead of fighting for plumber Calgary, target emergency plumber for burst pipe in southwest Calgary. The traffic is smaller, but conversion rates are often ten times higher because the searcher knows exactly what they need. A hundred pages targeting clear long tail intent will outperform five pages targeting head terms almost every time.",
      "Finally, validate every keyword by looking at the search results before you write. If the top ten results are all giant sites with thousands of backlinks, choose a different angle. If the top results are thin, outdated, or do not fully answer the question, that keyword is a real opportunity. Build a simple spreadsheet that maps each target keyword to a single page on your site, prioritise by intent and difficulty, and work through the list one piece of content at a time. This single discipline will outperform every clever tactic in the SEO world.",
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
