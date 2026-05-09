import { useState } from "react";
import { Download, CheckCircle2 } from "lucide-react";

const FORMSPREE = "https://formspree.io/f/mreyovlw";

interface Props {
  heading?: string;
  compact?: boolean;
}

const LeadMagnetForm = ({ compact = false }: { compact?: boolean }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          _subject: `New Checklist Download ${email}`,
          _replyto: email,
          message: "Requested the 27 Point SEO Checklist",
          source: "Lead Magnet 27 Point SEO Checklist",
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-4"
        style={{ backgroundColor: "rgba(34, 197, 94, 0.15)", border: "1px solid rgba(34, 197, 94, 0.5)", color: "#FAFAF8" }}
      >
        <CheckCircle2 style={{ color: "#22c55e" }} />
        <p className="text-sm font-medium">Check your inbox! Your checklist is on its way.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`flex ${compact ? "flex-col" : "flex-col sm:flex-row"} gap-3 w-full`}>
      <input
        type="email"
        required
        maxLength={255}
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        className="flex-1 rounded-full px-5 py-3 text-sm outline-none border"
        style={{
          backgroundColor: "rgba(250, 250, 248, 0.08)",
          borderColor: "rgba(249, 115, 22, 0.4)",
          color: "#FAFAF8",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: "#22c55e", color: "#0b1a12" }}
      >
        {status === "loading" ? "Sending..." : "Send Me the Checklist"}
      </button>
      {status === "error" && (
        <p className="text-xs sm:hidden" style={{ color: "#fca5a5" }}>
          Please enter a valid email.
        </p>
      )}
    </form>
  );
};

const LeadMagnet = ({ heading = "Free Download: The 27 Point SEO Checklist" }: Props) => {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: "#0d1f35" }}>
      <div
        className="max-w-4xl mx-auto rounded-2xl p-8 sm:p-12 border-2"
        style={{
          backgroundColor: "#1a2f4a",
          borderColor: "#22c55e",
          boxShadow: "0 0 60px rgba(34, 197, 94, 0.15)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div
            className="shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-2xl"
            style={{ backgroundColor: "rgba(34, 197, 94, 0.18)", color: "#22c55e" }}
          >
            <Download size={28} />
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#FAFAF8" }}>
              {heading}
            </h2>
            <p className="text-sm sm:text-base mb-6" style={{ color: "rgba(250, 250, 248, 0.8)" }}>
              The exact checklist I use to audit every client website. Download it free and find out
              exactly what is holding your site back.
            </p>
            <LeadMagnetForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export { LeadMagnetForm };
export default LeadMagnet;
