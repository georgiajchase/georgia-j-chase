import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { LeadMagnetForm } from "./LeadMagnet";

const LeadMagnetSlideIn = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("slideInShown") === "1") return;
    const t = window.setTimeout(() => {
      sessionStorage.setItem("slideInShown", "1");
      setOpen(true);
    }, 30000);
    return () => window.clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-40 w-[calc(100%-2rem)] sm:w-96 rounded-2xl p-5 shadow-2xl border-2 animate-fade-in"
      style={{
        backgroundColor: "#050a18",
        borderColor: "#f97316",
        color: "#FAFAF8",
      }}
    >
      <button
        onClick={() => setOpen(false)}
        aria-label="Close"
        className="absolute right-2 top-2 p-1.5 opacity-70 hover:opacity-100"
        style={{ color: "#FAFAF8" }}
      >
        <X size={16} />
      </button>
      <div className="flex items-center gap-2 mb-2">
        <Download size={18} style={{ color: "#f97316" }} />
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#f97316" }}>
          Free Download
        </span>
      </div>
      <h3 className="text-lg font-bold mb-2">The 27-Point SEO Checklist</h3>
      <p className="text-xs mb-4" style={{ color: "rgba(250, 250, 248, 0.75)" }}>
        The exact checklist I use to audit every client website.
      </p>
      <LeadMagnetForm compact />
    </div>
  );
};

export default LeadMagnetSlideIn;
