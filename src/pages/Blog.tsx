import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Search,
  MapPin,
  ListChecks,
  Link as LinkIcon,
  Gauge,
  SearchCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ContactSection from "@/components/ContactSection";
import AnimatedSection from "@/components/AnimatedSection";
import TiltCard from "@/components/TiltCard";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

const slugIcon: Record<string, typeof Search> = {
  "rank-number-1-on-google-in-90-days": Search,
  "local-seo-2026-what-actually-works": MapPin,
  "audit-your-website-in-30-minutes": ListChecks,
  "backlinks-that-actually-work": LinkIcon,
  "core-web-vitals-page-speed-2026": Gauge,
  "keyword-research-that-finds-buyers": SearchCheck,
};

const Blog = () => {
  const preload = blogPosts.slice(0, 2);
  return (
  <div className="min-h-screen bg-background">
    <SEO
      title="SEO Blog | Tips, Strategies and Insights | Georgia J. Chase"
      description="Free SEO tips, strategies, and insights for business owners who want to rank on Google and grow organic traffic."
      path="/blog"
    />
    <Helmet>
      {preload.map((p) => (
        <link
          key={p.slug}
          rel="preload"
          as="image"
          href={p.image}
          imageSrcSet={`${p.image} 800w, ${p.image2x} 1600w`}
          imageSizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          fetchpriority="high"
        />
      ))}
    </Helmet>
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <AnimatedSection className="mb-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
          <p className="section-label mb-3">Blog</p>
          <h1 className="section-title mb-4">SEO Insights, Plain and Simple</h1>
          <p className="fluid-lead text-muted-foreground max-w-2xl">
            Honest, jargon free articles about getting your website to actually work for your business.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post, i) => {
            const Icon = slugIcon[post.slug] ?? Search;
            return (
            <AnimatedSection key={post.slug} delay={i * 0.08}>
              <TiltCard>
                <article className="group bg-card border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.25)] transition-all">
                  <div className="relative aspect-[16/9] overflow-hidden bg-card">
                    <img
                      src={post.image}
                      srcSet={`${post.image} 800w, ${post.image2x} 1600w`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      alt={post.imageAlt}
                      loading={i < 3 ? "eager" : "lazy"}
                      decoding="async"
                      width={1600}
                      height={900}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={12} className="text-primary" /> {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={12} className="text-primary" /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-xl text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-5">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <User size={12} className="text-primary" /> {post.author}
                      </span>
                      <Button
                        asChild
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-forest-dark rounded-full"
                      >
                        <Link to={`/blog/${post.slug}`}>
                          Read More <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </AnimatedSection>
          );})}
        </div>
      </div>
    </main>

    <ContactSection />
    <Footer />
  </div>
  );
};

export default Blog;
