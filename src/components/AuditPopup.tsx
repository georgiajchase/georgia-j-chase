import { useEffect, useState } from "react";
import { X, CheckCircle2, Star, Clock } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqbolyq";

const CHALLENGES = [
  "Not enough traffic from Google",
  "Not ranking for my main keywords",
  "Not showing up on Google Maps",
  "Site is slow or not working properly",
  "Not getting leads or inquiries",
  "Tried SEO before and saw no results",
  "Just launched and need to get found",
  "Not sure where to start",
];


export const openAuditPopup = () => {
  window.dispatchEvent(new CustomEvent("open-audit-popup"));
};

const AuditPopup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [challenge, setChallenge] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // Open via custom event
  useEffect(() => {
    const handler = () => {
      setOpen(true);
      window.dispatchEvent(new CustomEvent("audit-popup-state", { detail: { open: true } }));
    };
    window.addEventListener("open-audit-popup", handler);
    return () => window.removeEventListener("open-audit-popup", handler);
  }, []);

  // Scroll trigger 40%
  useEffect(() => {
    if (sessionStorage.getItem("auditPopupSeen")) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      if (pct > 40 && !sessionStorage.getItem("auditPopupSeen")) {
        sessionStorage.setItem("auditPopupSeen", "true");
        setOpen(true);
        window.dispatchEvent(new CustomEvent("audit-popup-state", { detail: { open: true } }));
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem("auditPopupSeen", "true");
    window.dispatchEvent(new CustomEvent("audit-popup-state", { detail: { open: false } }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !website || !challenge) return;
    setLoading(true);
    setStatus("idle");

    const timeout = window.setTimeout(() => {
      setLoading(false);
      setStatus("error");
    }, 10000);

    try {
      if (!window.emailjs) throw new Error("EmailJS not loaded");
      try { window.emailjs.init(EMAILJS_PUBLIC_KEY); } catch {}
      const websiteValue = website.startsWith("http") ? website : "https://" + website;
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: name, from_email: email, website: websiteValue, challenge },
        EMAILJS_PUBLIC_KEY,
      );
      window.clearTimeout(timeout);
      setLoading(false);
      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      window.clearTimeout(timeout);
      setLoading(false);
      setStatus("error");
    }
  };

  if (!open) return null;

  const inputStyle = {
    backgroundColor: "#050d1c",
    borderColor: "rgba(34, 197, 94, 0.3)",
    color: "#FAFAF8",
  } as const;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-[90] bg-black/60 md:hidden animate-fade-in"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="fixed z-[100] animate-fade-in
          inset-x-0 bottom-0 w-full rounded-t-2xl
          md:inset-auto md:bottom-5 md:right-5 md:w-[360px] md:rounded-2xl"
        style={{
          backgroundColor: "#0a1628",
          border: "1px solid #22c55e",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-shrink-0">
              <div className="h-9 w-9 rounded-full bg-[#22c55e] flex items-center justify-center text-white font-semibold text-sm">
                GJ
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[#0a1628]" />
            </div>
            <div className="flex-1 leading-tight">
              <p className="text-white text-sm font-semibold">Georgia J. Chase Team</p>
              <p className="text-[11px] text-green-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
                Online now
              </p>
            </div>
            <button
              onClick={close}
              aria-label="Close"
              className="text-white/70 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {status === "success" ? (
            <div className="text-center py-6">
              <div className="flex justify-center mb-3">
                <CheckCircle2 size={56} style={{ color: "#22c55e" }} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">We Have Got Your Site!</h3>
              <p className="text-sm text-white/80 mb-3">
                Georgia will email you within 24 hours with 3 specific things she found. Check your inbox tomorrow.
              </p>
              <p className="text-xs text-white/50">Sent to chasegeorgiaj@gmail.com</p>
            </div>
          ) : (
            <>
              <span className="inline-block text-[11px] font-bold tracking-[0.18em] mb-2" style={{ color: "#f97316" }}>
                FREE MINI AUDIT
              </span>
              <h3 className="text-lg font-bold text-white leading-snug mb-2">
                Is Your Website Getting the Traffic It Should?
              </h3>
              <p className="text-xs text-white/70 mb-4">
                Submit your site. Georgia reviews it personally and tells you exactly what she found. Takes 2 minutes.
              </p>

              <form onSubmit={submit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none focus:border-[#22c55e]"
                  style={inputStyle}
                />
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none focus:border-[#22c55e]"
                  style={inputStyle}
                />
                <input
                  type="text"
                  required
                  placeholder="Your website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none focus:border-[#22c55e]"
                  style={inputStyle}
                />
                <select
                  required
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none focus:border-[#22c55e]"
                  style={inputStyle}
                >
                  <option value="" disabled>Biggest challenge</option>
                  {CHALLENGES.map((c) => (
                    <option key={c} value={c} style={{ backgroundColor: "#0a1628", color: "#FAFAF8" }}>
                      {c}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg px-4 py-3 text-sm font-bold transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: "#22c55e", color: "#FFFFFF" }}
                >
                  {loading ? "Sending..." : "Send Me Your Free Mini Audit →"}
                </button>
                {status === "error" && (
                  <p className="text-xs text-center" style={{ color: "#fca5a5" }}>
                    Something went wrong. Email us directly at chasegeorgiaj@gmail.com
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuditPopup;
