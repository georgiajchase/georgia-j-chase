import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=16397632098&text=Hi+Georgia+I+would+like+a+free+SEO+audit+for+my+website&type=phone_number&app_absent=0";

const WhatsAppButton = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="group fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg animate-bounce-slow"
    style={{ backgroundColor: "#25D366" }}
    aria-label="Chat with Georgia on WhatsApp"
  >
    {/* WhatsApp SVG icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="w-7 h-7 fill-white"
    >
      <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.5 1.128 6.742 3.046 9.378L1.06 31.29l6.156-1.96A15.905 15.905 0 0016.004 32C24.826 32 32 24.826 32 16S24.826 0 16.004 0zm9.31 22.594c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.656-1.214-4.748-1.968-7.8-6.79-8.036-7.104-.228-.314-1.87-2.49-1.87-4.748s1.184-3.37 1.604-3.832c.39-.43 1.034-.644 1.65-.644.2 0 .378.01.54.018.42.018.63.042.908.7.348.822 1.196 2.912 1.3 3.124.104.212.174.46.034.736-.132.282-.198.458-.392.704-.194.246-.41.55-.584.738-.194.208-.396.434-.17.852.226.418 1.006 1.66 2.16 2.69 1.486 1.324 2.74 1.734 3.128 1.926.39.192.616.16.844-.096.234-.264.998-1.16 1.264-1.56.26-.398.524-.332.882-.198.362.132 2.288 1.08 2.68 1.276.39.198.65.296.746.458.098.162.098.94-.292 2.04z" />
    </svg>

    {/* Tooltip */}
    <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
      Chat with Georgia on WhatsApp
    </span>
  </a>
);

export default WhatsAppButton;
