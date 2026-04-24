import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import Results from "@/components/Results";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <TrustBar />
    <PainPoints />
    <HowItWorks />
    <Results />
    <Stats />
    <Services />
    <Pricing />
    <About />
    <FAQ />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
