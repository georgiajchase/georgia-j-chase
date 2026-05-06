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
        className="relative max-w-md w-full rounded-2xl p-8 shadow-2xl animate-scale-in border"
        style={{ backgroundColor: "#1B4332", borderColor: "rgba(201, 168, 76, 0.5)", color: "#FAFAF8" }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 p-2 hover:opacity-100 opacity-70"
          style={{ color: "#FAFAF8" }}
        >
          <X size={18} />
        </button>
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ backgroundColor: "rgba(201, 168, 76, 0.18)", color: "#C9A84C" }}
        >
          <Sparkles size={14} /> Wait, before you go
        </div>
        <h3 className="text-2xl font-bold mb-3" style={{ color: "#FAFAF8" }}>
          Get a free 15 minute SEO audit on me.
        </h3>
        <p className="text-sm mb-6" style={{ color: "rgba(250, 250, 248, 0.8)" }}>
          I'll personally check your site for the 3 biggest issues blocking your traffic. No pitch, no pressure.
        </p>
        <Link
          to="/contact"
          onClick={() => setOpen(false)}
          className="inline-flex items-center justify-center gap-2 w-full rounded-full px-6 py-3 text-sm font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: "#C9A84C", color: "#1B4332" }}
        >
          Claim My Free Audit <ArrowRight size={16} />
        </Link>
        <button
          onClick={() => setOpen(false)}
          className="block w-full mt-3 text-xs hover:opacity-100 opacity-60"
          style={{ color: "#FAFAF8" }}
        >
          No thanks, I'll pass
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
