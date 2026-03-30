import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import Results from "@/components/Results";
import Services from "@/components/Services";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <TrustBar />
    <PainPoints />
    <HowItWorks />
    <Results />
    <Services />
    <About />
    <FAQ />
    <LeadForm />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Index;
