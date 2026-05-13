import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatURL } from "./LeadMagnet";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqbolyq";

export const INDUSTRIES = [
  { id: "local", label: "Local Services", hint: "plumber, HVAC, dentist", mult: 1.4 },
  { id: "ecom", label: "Ecommerce Store", hint: "online retail", mult: 1.6 },
  { id: "pro", label: "Professional Services", hint: "lawyer, consultant", mult: 1.3 },
  { id: "rest", label: "Restaurant or Hospitality", hint: "food, hotels", mult: 1.1 },
  { id: "real", label: "Real Estate", hint: "agents, brokers", mult: 1.5 },
  { id: "other", label: "Other Business", hint: "everything else", mult: 1.2 },
];

export const SALE_VALUES = [
  { id: "lt500", label: "Under $500", mid: 300 },
  { id: "500_2k", label: "$500 to $2,000", mid: 1200 },
  { id: "2k_10k", label: "$2,000 to $10,000", mid: 5000 },
  { id: "gt10k", label: "Over $10,000", mid: 15000 },
];

export const RANKINGS = [
  { id: "p1", label: "Page 1", hint: "top 10 results", lost: 2 },
  { id: "p23", label: "Page 2 or 3", hint: "rarely clicked", lost: 8 },
  { id: "p4", label: "Page 4 or beyond", hint: "essentially invisible", lost: 18 },
  { id: "idk", label: "I have no idea", hint: "we will check for you", lost: 14 },
];

const cardBase: React.CSSProperties = {
  backgroundColor: "#1a2f4a",
  border: "1px solid #1e3a5f",
  borderRadius: 12,
  padding: 20,
  cursor: "pointer",
  transition: "all 0.2s ease",
  textAlign: "left",
  color: "#FAFAF8",
  position: "relative",
};

const selectedStyle: React.CSSProperties = {
  border: "2px solid #22c55e",
  backgroundColor: "#1e3a5f",
  padding: 19,
};

interface Props {
  /** When true, only show step 1 as a teaser; redirect to /calculator on selection */
  teaser?: boolean;
}

const useCountUp = (target: number, duration = 1500, run = true) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVal(target); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, run]);
  return val;
};

const RevenueCalculator = ({ teaser = false }: Props) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState<typeof INDUSTRIES[number] | null>(null);
  const [sale, setSale] = useState<typeof SALE_VALUES[number] | null>(null);
  const [ranking, setRanking] = useState<typeof RANKINGS[number] | null>(null);
  const [showResults, setShowResults] = useState(false);

  const advance = (n: number) => setTimeout(() => setStep(n), 250);

  const pickIndustry = (i: typeof INDUSTRIES[number]) => {
    setIndustry(i);
    if (teaser) {
      setTimeout(() => navigate("/calculator", { state: { industry: i.id } }), 300);
      return;
    }
    advance(2);
  };

  const loss = industry && sale && ranking
    ? Math.round(ranking.lost * sale.mid * industry.mult)
    : 0;
  const fixed = industry && sale
    ? Math.round(2 * sale.mid * industry.mult)
    : 0;

  const animatedLoss = useCountUp(loss, 1500, showResults);

  const reset = () => {
    setStep(1); setIndustry(null); setSale(null); setRanking(null); setShowResults(false);
  };

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError(false);
    const timeout = setTimeout(() => { setSubmitting(false); setError(true); }, 8000);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name, email, website: formatURL(website),
          calculator_result: `$${loss.toLocaleString()}`,
          industry: industry?.label,
          sale_value: sale?.label,
          ranking: ranking?.label,
          form_source: "Revenue Loss Calculator",
        }),
      });
      clearTimeout(timeout);
      if (res.ok) setSubmitted(true); else setError(true);
    } catch {
      clearTimeout(timeout);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
    <div className="animate-fade-in">
      <p className="text-xs font-bold tracking-[0.2em] mb-2" style={{ color: "#22c55e" }}>
        STEP {n} OF 3
      </p>
      <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: "#FAFAF8" }}>{title}</h3>
      {children}
    </div>
  );

  const Card = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      style={{ ...cardBase, ...(selected ? selectedStyle : {}) }}
      className="hover:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/40"
    >
      {selected && (
        <CheckCircle2 size={20} style={{ color: "#22c55e", position: "absolute", top: 12, right: 12 }} />
      )}
      {children}
    </button>
  );

  return (
    <div style={{ backgroundColor: "#0d1f35", borderRadius: 16, padding: "24px", border: "1px solid rgba(34,197,94,0.2)" }} className="sm:p-8">
      {/* Progress bar */}
      {!showResults && (
        <div className="mb-6">
          <div className="flex justify-between text-xs font-medium mb-2" style={{ color: "#94a3b8" }}>
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div style={{ height: 6, backgroundColor: "#1a2f4a", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${(step / 3) * 100}%`, height: "100%", backgroundColor: "#22c55e", transition: "width 0.4s ease" }} />
          </div>
        </div>
      )}

      {!showResults && step === 1 && (
        <Step n={1} title="What industry is your business in?">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {INDUSTRIES.map((i) => (
              <Card key={i.id} selected={industry?.id === i.id} onClick={() => pickIndustry(i)}>
                <p className="font-bold text-base mb-1">{i.label}</p>
                <p className="text-xs" style={{ color: "#94a3b8" }}>{i.hint}</p>
              </Card>
            ))}
          </div>
          {teaser && (
            <p className="text-center text-xs mt-6" style={{ color: "#94a3b8" }}>
              Pick one to start. Full calculator opens on the next page.
            </p>
          )}
        </Step>
      )}

      {!teaser && !showResults && step === 2 && (
        <Step n={2} title="What is your average sale or client value?">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SALE_VALUES.map((s) => (
              <Card key={s.id} selected={sale?.id === s.id} onClick={() => { setSale(s); advance(3); }}>
                <p className="font-bold text-base">{s.label}</p>
              </Card>
            ))}
          </div>
        </Step>
      )}

      {!teaser && !showResults && step === 3 && (
        <Step n={3} title="Where does your website currently rank on Google for your main service?">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RANKINGS.map((r) => (
              <Card key={r.id} selected={ranking?.id === r.id} onClick={() => setRanking(r)}>
                <p className="font-bold text-base mb-1">{r.label}</p>
                <p className="text-xs" style={{ color: "#94a3b8" }}>{r.hint}</p>
              </Card>
            ))}
          </div>
          <button
            type="button"
            disabled={!ranking}
            onClick={() => setShowResults(true)}
            className="mt-6 w-full sm:w-auto rounded-lg px-6 py-3 text-base font-bold transition-all disabled:opacity-50"
            style={{ backgroundColor: "#22c55e", color: "#fff" }}
          >
            Calculate My Loss →
          </button>
        </Step>
      )}

      {showResults && industry && sale && ranking && (
        <div className="animate-fade-in">
          <div
            className="text-center mb-8"
            style={{
              backgroundColor: "#0a1628",
              border: "2px solid #22c55e",
              borderRadius: 16,
              padding: "32px 20px",
              boxShadow: "0 0 40px rgba(34,197,94,0.15)",
            }}
          >
            <p className="text-sm font-medium mb-3" style={{ color: "#94a3b8" }}>
              Estimated Monthly Revenue Loss:
            </p>
            <p
              className="text-4xl sm:text-6xl font-extrabold mb-3"
              style={{ color: "#ef4444", animation: "pulse 2s infinite", textShadow: "0 0 30px rgba(239,68,68,0.4)" }}
            >
              ${Math.round(animatedLoss).toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm" style={{ color: "#94a3b8" }}>
              Based on average search volumes and conversion rates for {industry.label.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div style={{ backgroundColor: "#1a2f4a", border: "1px solid #f97316", borderRadius: 12, padding: 20 }}>
              <p className="text-xs font-bold tracking-wide mb-2" style={{ color: "#f97316" }}>ESTIMATED LOST LEADS / MONTH</p>
              <p className="text-2xl font-extrabold mb-1" style={{ color: "#FAFAF8" }}>{ranking.lost} potential customers</p>
              <p className="text-xs" style={{ color: "#94a3b8" }}>Slipping past your site every month.</p>
            </div>
            <div style={{ backgroundColor: "#1a2f4a", border: "1px solid #ef4444", borderRadius: 12, padding: 20 }}>
              <p className="text-xs font-bold tracking-wide mb-2" style={{ color: "#ef4444" }}>YOUR CURRENT GOOGLE VISIBILITY</p>
              <p className="text-2xl font-extrabold mb-1" style={{ color: "#FAFAF8" }}>{ranking.label}</p>
              <p className="text-xs" style={{ color: "#94a3b8" }}>{ranking.hint} — most buyers never see you.</p>
            </div>
            <div style={{ backgroundColor: "#1a2f4a", border: "1px solid #22c55e", borderRadius: 12, padding: 20 }}>
              <p className="text-xs font-bold tracking-wide mb-2" style={{ color: "#22c55e" }}>WHAT FIXING THIS COULD MEAN</p>
              <p className="text-2xl font-extrabold mb-1" style={{ color: "#FAFAF8" }}>${fixed.toLocaleString()} / mo</p>
              <p className="text-xs" style={{ color: "#94a3b8" }}>Estimated revenue at page 1 rankings.</p>
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight" style={{ color: "#FAFAF8" }}>
              This Is Fixable.<br />Here Is How We Start.
            </h3>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3">
              <p className="text-sm mb-2" style={{ color: "#94a3b8" }}>
                Get a free personal review of your site and a plan to fix this:
              </p>
              <input required type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg px-3 py-3 text-sm border outline-none focus:border-[#22c55e]"
                style={{ backgroundColor: "#0d1f35", borderColor: "rgba(34,197,94,0.3)", color: "#FAFAF8" }} />
              <input required type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg px-3 py-3 text-sm border outline-none focus:border-[#22c55e]"
                style={{ backgroundColor: "#0d1f35", borderColor: "rgba(34,197,94,0.3)", color: "#FAFAF8" }} />
              <input required type="text" placeholder="yourbusiness.com" value={website} onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded-lg px-3 py-3 text-sm border outline-none focus:border-[#22c55e]"
                style={{ backgroundColor: "#0d1f35", borderColor: "rgba(34,197,94,0.3)", color: "#FAFAF8" }} />
              <button type="submit" disabled={submitting}
                className="w-full rounded-lg px-6 py-4 text-base font-bold transition-all hover:opacity-90 inline-flex items-center justify-center gap-2"
                style={{ backgroundColor: "#22c55e", color: "#fff" }}>
                {submitting ? "Sending..." : <>Show Me How to Fix This <ArrowRight size={18} /></>}
              </button>
              {error && (
                <p className="text-center text-xs" style={{ color: "#ef4444" }}>
                  Something went wrong. Email chasegeorgiaj@gmail.com directly.
                </p>
              )}
              <button type="button" onClick={reset} className="block mx-auto text-xs underline mt-3" style={{ color: "#94a3b8" }}>
                Recalculate
              </button>
            </form>
          ) : (
            <div className="max-w-xl mx-auto text-center rounded-2xl"
              style={{ padding: 28, backgroundColor: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.4)" }}>
              <CheckCircle2 size={56} style={{ color: "#22c55e", margin: "0 auto 12px" }} />
              <h4 className="font-bold text-xl mb-2" style={{ color: "#FAFAF8" }}>We have got your details.</h4>
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Georgia will personally review your site and email you back within 24 hours with a clear plan based on your situation.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RevenueCalculator;
