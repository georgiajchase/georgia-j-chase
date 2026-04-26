import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import AnimatedSection from "@/components/AnimatedSection";
import { getPostBySlug } from "@/data/blogPosts";
import { useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Georgia J. Chase`;
    const desc = document.querySelector('meta[name="description"]');
    const text = post.excerpt.slice(0, 155);
    if (desc) desc.setAttribute("content", text);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <AnimatedSection>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Back to all articles
            </Link>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-5">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center gap-1.5">
                <User size={14} className="text-primary" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} className="text-primary" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-primary" /> {post.readTime}
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
              <img
                src={post.image}
                alt={post.title}
                width={1280}
                height={720}
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 ring-1 ring-primary/20 rounded-2xl pointer-events-none" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="prose prose-invert max-w-none">
              {post.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-foreground/90 text-base sm:text-lg leading-relaxed mb-6"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/10 p-6 sm:p-7">
              <p className="font-heading font-bold text-lg text-foreground mb-2">
                Want results like this for your business?
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Pick the contact option below that suits you best. I reply within 24 hours.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
              >
                Jump to contact options ↓
              </a>
            </div>
          </AnimatedSection>
        </article>
      </main>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default BlogPost;
