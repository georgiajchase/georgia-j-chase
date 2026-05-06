import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const AnnouncementBar = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("announceClosed") === "1") setOpen(false);
  }, []);

  if (!open) return null;

  const close = () => {
    sessionStorage.setItem("announceClosed", "1");
    setOpen(false);
  };

  return (
    <div className="relative z-[60] bg-gradient-to-r from-primary via-orange-500 to-primary text-white text-xs sm:text-sm font-semibold">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
        <span className="hidden sm:inline">🚀</span>
        <span>
          Limited spots open this month —{" "}
          <Link to="/contact" className="underline underline-offset-2 hover:text-white/90">
            claim your free website check
          </Link>{" "}
          before they're gone.
        </span>
        <button
          onClick={close}
          aria-label="Close announcement"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
