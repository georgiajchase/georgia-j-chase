import { useState } from "react";
import { CheckCircle2, Star, Clock } from "lucide-react";
import { openAuditPopup } from "./AuditPopup";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqbolyq";

export const formatURL = (value: string) => {
  if (!value) return value;
  const v = value.trim();
  if (!v.startsWith("http://") && !v.startsWith("https://")) {
    return "https://" + v;
  }
  return v;
};

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

interface FormProps {
  compact?: boolean;
}

// Kept for backwards compatibility (used by ExitIntentPopup, LeadMagnetSlideIn)
export const LeadMagnetForm = ({ compact = false }: FormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [challenge, setChallenge] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !website || !challenge) {
      setStatus("error");
      return;
    }
    setLoading(true);
    setStatus("idle");

    const websiteValue = formatURL(website);

    const timeoutId = window.setTimeout(() => {
      setLoading(false);
      setStatus("error");
    }, 8000);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          website: websiteValue,
          challenge,
          form_source: "Mini Audit Popup",
        }),
      });
      window.clearTimeout(timeoutId);
      setStatus(response.ok ? "success" : "error");
    } catch (err) {
      window.clearTimeout(timeoutId);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="text-center rounded-2xl" style={{ padding: "24px", backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.4)" }}>
        <div className="flex justify-center mb-3">
          <CheckCircle2 size={56} style={{ color: "#22c55e" }} />
        </div>
        <h3 className="font-bold mb-2" style={{ fontSize: "20px", color: "#FAFAF8" }}>We Have Got Your Site!</h3>
        <p className="mb-3" style={{ fontSize: "14px", color: "#9ca3af" }}>
          Georgia will personally review your website and send you back 3 specific things she found within 24 hours. Check your inbox tomorrow.
        </p>
        <p style={{ fontSize: "12px", color: "#22c55e" }}>Confirmation sent to your email.</p>
      </div>
    );
  }

  const inputStyle = { backgroundColor: "#0d1f35", borderColor: "rgba(34, 197, 94, 0.3)", color: "#FAFAF8" } as const;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none focus:border-[#22c55e]" style={inputStyle} />
      <input type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none focus:border-[#22c55e]" style={inputStyle} />
      <input type="text" required placeholder="yourbusiness.com" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none focus:border-[#22c55e]" style={inputStyle} />
      <select required value={challenge} onChange={(e) => setChallenge(e.target.value)} className="w-full rounded-lg px-3 py-2.5 text-sm border outline-none focus:border-[#22c55e]" style={inputStyle}>
        <option value="" disabled>Biggest challenge</option>
        {CHALLENGES.map((c) => (
          <option key={c} value={c} style={{ backgroundColor: "#0d1f35", color: "#FAFAF8" }}>{c}</option>
        ))}
      </select>
      <button type="submit" disabled={loading} className="w-full rounded-lg px-4 py-3 text-sm font-bold transition-all hover:opacity-90" style={{ backgroundColor: "#22c55e", color: "#FFFFFF", opacity: loading ? 0.8 : 1 }}>
        {loading ? "Sending..." : "Send Me Your Free Mini Audit →"}
      </button>
      {status === "error" && (
        <p className="text-center" style={{ color: "#ef4444", fontSize: "12px" }}>
          Something went wrong. Please email us directly at chasegeorgiaj@gmail.com
        </p>
      )}
    </form>
  );
};

// Teaser card that opens the popup form
const LeadMagnet = () => {
  return (
    <section className="py-16 sm:py-20 px-4" style={{ backgroundColor: "#0d1f35" }}>
      <div className="max-w-2xl mx-auto">
        <div
          className="text-center"
          style={{
            backgroundColor: "#1a2f4a",
            border: "1px solid #22c55e",
            borderRadius: "12px",
            padding: "32px",
          }}
        >
          <span className="inline-block text-xs font-bold tracking-[0.2em] mb-4" style={{ color: "#22c55e" }}>
            FREE MINI AUDIT
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight" style={{ color: "#FAFAF8" }}>
            Find Out Exactly What Is Holding Your Site Back
          </h2>
          <p className="text-sm sm:text-base mb-6" style={{ color: "rgba(250, 250, 248, 0.75)" }}>
            Georgia personally reviews your site within 24 hours and sends you back 3 specific things hurting your traffic. Free. No obligation.
          </p>
          <button
            type="button"
            onClick={openAuditPopup}
            className="w-full rounded-lg px-6 py-4 text-base font-bold transition-all hover:opacity-90"
            style={{ backgroundColor: "#22c55e", color: "#FFFFFF" }}
          >
            Get My Free Mini Audit →
          </button>
          <a
            href="/calculator"
            className="block mt-3 text-sm underline underline-offset-2 hover:opacity-80"
            style={{ color: "#22c55e" }}
          >
            Or try our free revenue calculator →
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-5 text-xs" style={{ color: "rgba(250, 250, 248, 0.75)" }}>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} style={{ color: "#22c55e" }} /> Reviewed personally by Georgia</span>
            <span className="inline-flex items-center gap-1.5"><Star size={14} style={{ color: "#C9A84C" }} fill="#C9A84C" /> 5.0 average rating</span>
            <span className="inline-flex items-center gap-1.5"><Clock size={14} style={{ color: "#22c55e" }} /> Response within 24 hours</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
