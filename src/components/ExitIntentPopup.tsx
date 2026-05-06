import { useEffect, useState } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("exitShown") === "1") return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 8000);

    const onMouseLeave = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY <= 0) {
        sessionStorage.setItem("exitShown", "1");
        setOpen(true);
        document.removeEventListener("mouseleave", onMouseLeave);
      }
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-md w-full rounded-2xl border border-primary/40 bg-[#0a0f1e] p-8 shadow-2xl animate-scale-in"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 p-2 text-white/60 hover:text-white"
        >
          <X size={18} />
        </button>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-4">
          <Sparkles size={14} /> Wait — before you go
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Get a free 15 minute SEO audit on me.
        </h3>
        <p className="text-white/70 text-sm mb-6">
          I'll personally check your site for the 3 biggest issues blocking your traffic. No pitch, no pressure.
        </p>
        <Link
          to="/contact"
          onClick={() => setOpen(false)}
          className="inline-flex items-center justify-center gap-2 w-full bg-conversion text-conversion-foreground hover:bg-conversion-dark rounded-full px-6 py-3 text-sm font-semibold transition-all"
        >
          Claim My Free Audit <ArrowRight size={16} />
        </Link>
        <button
          onClick={() => setOpen(false)}
          className="block w-full mt-3 text-xs text-white/40 hover:text-white/70"
        >
          No thanks, I'll pass
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
