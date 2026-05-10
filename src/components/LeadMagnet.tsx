import { useState } from "react";
import { CheckCircle2, Star, Clock } from "lucide-react";

const EMAILJS_SERVICE_ID = "service_3eyouwf";
const EMAILJS_TEMPLATE_ID = "template_8b0ilw8";
const EMAILJS_PUBLIC_KEY = "twvOQk5nIwNWJNXvj";

export const formatURL = (value: string) => {
  if (!value) return value;
  const v = value.trim();
  if (!v.startsWith("http://") && !v.startsWith("https://")) {
    return "https://" + v;
  }
  return v;
};

declare global {
  interface Window {
    emailjs?: {
      init: (publicKey: string) => void;
      send: (
        serviceId: string,
        templateId: string,
        params: Record<string, string>,
        publicKey?: string,
      ) => Promise<{ status: number; text: string }>;
    };
  }
}

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

const MiniAuditForm = ({ compact = false }: FormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [challenge, setChallenge] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !website || !challenge) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      if (!window.emailjs) throw new Error("EmailJS not loaded");
      try { window.emailjs.init(EMAILJS_PUBLIC_KEY); } catch {}
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          website: formatURL(website),
          challenge,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8 px-4 rounded-2xl" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.4)" }}>
        <div className="flex justify-center mb-4">
          <CheckCircle2 size={56} style={{ color: "#22c55e" }} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#FAFAF8" }}>
          We Have Got Your Site.
        </h3>
        <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(250, 250, 248, 0.85)" }}>
          Georgia will personally review your website and email you back within 24 hours with 3 specific things she found. Check your inbox tomorrow.
        </p>
      </div>
    );
  }

  const inputStyle = {
    backgroundColor: "#0d1f35",
    borderColor: "rgba(34, 197, 94, 0.3)",
    color: "#FAFAF8",
  } as const;

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="audit-name" className="block text-sm font-medium mb-1.5" style={{ color: "#FAFAF8" }}>
          Your name
        </label>
        <input
          id="audit-name"
          type="text"
          required
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-sm border outline-none focus:border-[#22c55e]"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="audit-email" className="block text-sm font-medium mb-1.5" style={{ color: "#FAFAF8" }}>
          Your email
        </label>
        <input
          id="audit-email"
          type="email"
          required
          placeholder="jane@yourbusiness.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-sm border outline-none focus:border-[#22c55e]"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="audit-website" className="block text-sm font-medium mb-1.5" style={{ color: "#FAFAF8" }}>
          Your website URL
        </label>
        <input
          id="audit-website"
          type="url"
          required
          placeholder="https://yourbusiness.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-sm border outline-none focus:border-[#22c55e]"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="audit-challenge" className="block text-sm font-medium mb-1.5" style={{ color: "#FAFAF8" }}>
          What is your biggest challenge right now?
        </label>
        <select
          id="audit-challenge"
          required
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-sm border outline-none focus:border-[#22c55e]"
          style={inputStyle}
        >
          <option value="" disabled>
            Select an option
          </option>
          {CHALLENGES.map((c) => (
            <option key={c} value={c} style={{ backgroundColor: "#0d1f35", color: "#FAFAF8" }}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg px-6 py-4 text-base font-bold transition-all hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: "#22c55e", color: "#FFFFFF" }}
      >
        {status === "loading" ? "Sending..." : "Send Me Your Free Mini Audit →"}
      </button>
      {status === "error" && (
        <p className="text-sm text-center" style={{ color: "#fca5a5" }}>
          Something went wrong. Please email us directly at chasegeorgiaj@gmail.com
        </p>
      )}
      {!compact && (
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 text-xs" style={{ color: "rgba(250, 250, 248, 0.75)" }}>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} style={{ color: "#22c55e" }} /> Reviewed personally by Georgia</span>
          <span className="inline-flex items-center gap-1.5"><Star size={14} style={{ color: "#C9A84C" }} fill="#C9A84C" /> 5.0 average client rating</span>
          <span className="inline-flex items-center gap-1.5"><Clock size={14} style={{ color: "#22c55e" }} /> Response within 24 hours</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} style={{ color: "#22c55e" }} /> No tools or automation</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} style={{ color: "#22c55e" }} /> Completely free</span>
        </div>
      )}
    </form>
  );
};

// Backwards-compat export used by ExitIntentPopup and LeadMagnetSlideIn
const LeadMagnetForm = ({ compact }: { compact?: boolean }) => <MiniAuditForm compact={compact} />;

const LeadMagnet = () => {
  return (
    <section className="py-16 sm:py-20 px-4" style={{ backgroundColor: "#1a2f4a" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold tracking-[0.2em] mb-4" style={{ color: "#22c55e" }}>
            FREE MINI AUDIT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{ color: "#FAFAF8" }}>
            Find Out Exactly What Is Holding Your Site Back For Free
          </h2>
          <p className="text-base sm:text-lg" style={{ color: "rgba(250, 250, 248, 0.8)" }}>
            Submit your site below. Georgia looks at it personally within 24 hours and sends you back 3 specific things she found that are hurting your traffic. No tools. No automation. Just a real human review.
          </p>
        </div>
        <div
          className="rounded-2xl p-6 sm:p-8 border"
          style={{
            backgroundColor: "#0d1f35",
            borderColor: "rgba(34, 197, 94, 0.3)",
            boxShadow: "0 0 60px rgba(34, 197, 94, 0.1)",
          }}
        >
          <MiniAuditForm />
        </div>
      </div>
    </section>
  );
};

export { LeadMagnetForm };
export default LeadMagnet;
