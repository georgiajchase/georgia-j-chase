import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const FinalCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 p-10 sm:p-14 text-center max-w-3xl mx-auto overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-conversion/15 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="section-title mb-4">
                Ready to See What Your Site Is Missing?
              </h2>
              <p className="fluid-lead text-muted-foreground mb-8 max-w-xl mx-auto">
                One submission. One personal review. One straight answer within 24 hours.
              </p>
              <Button
                onClick={() => navigate("/contact")}
                size="lg"
                className="w-full sm:w-auto bg-conversion text-conversion-foreground hover:bg-conversion-dark rounded-full px-10 h-12 text-base font-semibold animate-pulse-glow-green"
              >
                Get Your Free Growth Audit
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCTA;
