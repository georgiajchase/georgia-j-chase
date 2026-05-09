import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "announceClosed";

const AnnouncementBar = () => {
  // Start closed to avoid flash; flip to open after checking storage
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const closed =
      localStorage.getItem(STORAGE_KEY) === "1" ||
      sessionStorage.getItem(STORAGE_KEY) === "1";
    setOpen(!closed);
    setHydrated(true);
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  // Fully removed from DOM when closed: no height, no gap, no min-height
  if (!hydrated || !open) return null;

  return (
    <div
      className="relative z-[60] text-xs sm:text-sm font-semibold"
      style={{ background: "#1B4332", color: "#FAFAF8" }}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
        <span className="hidden sm:inline" style={{ color: "#C9A84C" }}>★</span>
        <span>
          Limited spots open this month,{" "}
          <Link to="/contact" className="underline underline-offset-2 hover:opacity-90" style={{ color: "#C9A84C" }}>
            claim your free growth audit
          </Link>{" "}
          before they're gone.
        </span>
        <button
          onClick={close}
          aria-label="Close announcement"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
