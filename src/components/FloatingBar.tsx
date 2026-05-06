import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";

const FloatingBar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/contact") {
      setShow(false);
      return;
    }
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl animate-fade-in pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-full border border-primary/40 bg-[#0a0f1e]/95 backdrop-blur-xl px-4 py-2.5 shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider shrink-0">
            <Flame size={12} /> 3 left
          </span>
          <span className="text-xs sm:text-sm text-white/80 truncate">
            Limited spots this month
          </span>
        </div>
        <Link
          to="/contact"
          className="shrink-0 inline-flex items-center gap-1.5 bg-conversion text-conversion-foreground hover:bg-conversion-dark rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all"
        >
          Claim Yours <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default FloatingBar;
