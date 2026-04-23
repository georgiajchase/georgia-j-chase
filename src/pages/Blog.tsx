import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import TiltCard from "@/components/TiltCard";

const posts = [
  {
    title: "5 Hidden Reasons Your Website Is Not Ranking on Google",
    excerpt:
      "Most business owners blame content. The real culprits are usually technical issues you cannot see from the front end.",
    readTime: "6 min read",
    date: "Apr 2026",
  },
  {
    title: "Local SEO in 2026: What Actually Moves the Needle",
    excerpt:
      "Forget the gimmicks. Here is what I focus on first when I want a local business to dominate their map pack.",
    readTime: "8 min read",
    date: "Mar 2026",
  },
  {
    title: "How to Audit Your Own Website in 30 Minutes",
    excerpt:
      "A simple checklist you can run yourself before paying anyone for an SEO audit.",
    readTime: "10 min read",
    date: "Feb 2026",
  },
];

const Blog = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <AnimatedSection className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
          <p className="section-label mb-3">Blog</p>
          <h1 className="section-title mb-4">SEO Insights, Plain and Simple</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Honest, jargon-free articles about getting your website to actually work for your business.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.title} delay={i * 0.1}>
              <TiltCard>
                <article className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-xl text-foreground mb-3 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                </article>
              </TiltCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Blog;
