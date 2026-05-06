import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

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
      <div
        className="pointer-events-auto flex items-center justify-between gap-3 rounded-full backdrop-blur-xl px-4 py-2.5 shadow-2xl shadow-black/40 border"
        style={{ backgroundColor: "rgba(27, 67, 50, 0.95)", borderColor: "rgba(201, 168, 76, 0.45)" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0"
            style={{ backgroundColor: "rgba(201, 168, 76, 0.18)", color: "#C9A84C" }}
          >
            <Star size={12} /> 3 left
          </span>
          <span className="text-xs sm:text-sm truncate" style={{ color: "#FAFAF8" }}>
            Limited spots this month
          </span>
        </div>
        <Link
          to="/contact"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: "#C9A84C", color: "#1B4332" }}
        >
          Claim Yours <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default FloatingBar;
