import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import AnimatedSection from "@/components/AnimatedSection";

const Contact = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="relative pt-32 pb-8 sm:pt-40 sm:pb-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <AnimatedSection>
          <p className="section-label mb-3">Contact</p>
          <h1 className="section-title mb-5">Let's Work Together</h1>
          <p className="fluid-lead text-muted-foreground">
            Pick the way that works best for you. I reply to every message within 24 hours.
          </p>
        </AnimatedSection>
      </div>
    </section>

    <ContactSection />

    <Footer />
  </div>
);

export default Contact;
