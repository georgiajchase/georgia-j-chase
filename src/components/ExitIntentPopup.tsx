import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { LeadMagnetForm } from "./LeadMagnet";

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
        className="relative max-w-md w-full rounded-2xl p-8 shadow-2xl animate-scale-in border-2"
        style={{ backgroundColor: "#050a18", borderColor: "#f97316", color: "#FAFAF8" }}
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
          style={{ backgroundColor: "rgba(249, 115, 22, 0.18)", color: "#f97316" }}
        >
          <Download size={14} /> Free Download
        </div>
        <h3 className="text-2xl font-bold mb-3" style={{ color: "#FAFAF8" }}>
          Wait, grab this before you go
        </h3>
        <p className="text-sm mb-6" style={{ color: "rgba(250, 250, 248, 0.8)" }}>
          The 27-Point SEO Checklist I use to audit every client website. Find out exactly what is
          holding your site back.
        </p>
        <LeadMagnetForm />
      </div>
    </div>
  );
};

export default ExitIntentPopup;
