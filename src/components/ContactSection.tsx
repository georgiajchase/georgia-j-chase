import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ContactSection = () => {
  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#0d1f35" }}>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div
            className="relative rounded-3xl p-10 sm:p-14 text-center max-w-3xl mx-auto overflow-hidden"
            style={{
              backgroundColor: "#1a2f4a",
              border: "1px solid #22c55e",
            }}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: "rgba(34,197,94,0.2)" }} />
            <div className="relative">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
                Ready to See What Your Site Is Missing?
              </h2>
              <p className="fluid-lead text-slate-300 mb-7 max-w-xl mx-auto">
                One submission. One personal review. One straight answer within 24 hours.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#22c55e" }}
              >
                Get Your Free Growth Audit <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
