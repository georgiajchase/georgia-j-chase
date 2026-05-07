import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, Facebook, Mail, MessageCircle, ArrowRight } from "lucide-react";

const EMAIL = "chasegeorgiaj@gmail.com";
const WHATSAPP_NUMBER = "16397632098";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Georgia, I'm interested in your SEO services"
)}`;
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("SEO Services Inquiry")}`;

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Blog", to: "/blog" },
  { label: "Reviews", to: "/reviews" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const socials = [
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com" },
  { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com" },
];

const Footer = () => (
  <footer
    className="relative text-white border-t-2 border-primary/60"
    style={{ backgroundColor: "#050a18" }}
  >
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-start">
        {/* Left: brand + socials */}
        <div>
          <p className="font-heading font-bold text-2xl mb-3 text-white">Georgia J. Chase</p>
          <p className="text-sm leading-relaxed text-gray-300 mb-6 max-w-xs">
            More Traffic. More Leads. More Revenue. That is the only result that matters.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 text-primary flex items-center justify-center transition-all hover:bg-primary hover:text-white hover:-translate-y-0.5"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Middle: Quick Links 2-col grid */}
        <div>
          <p className="font-heading font-semibold text-sm mb-4 text-white uppercase tracking-wider">
            Quick Links
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
            {quickLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Get In Touch */}
        <div>
          <p className="font-heading font-semibold text-sm mb-4 text-white uppercase tracking-wider">
            Get In Touch
          </p>
          <ul className="space-y-2.5 mb-5">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-primary" />
              <a
                href={MAILTO}
                className="text-sm text-gray-300 hover:text-white transition-colors break-all"
              >
                {EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={16} className="text-primary" />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Message us on WhatsApp
              </a>
            </li>
          </ul>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-conversion text-conversion-foreground hover:bg-conversion-dark rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-conversion/30"
          >
            Get Your Free Growth Audit <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10 py-5">
      <p className="text-center text-xs text-gray-400">
        © 2025 Georgia J. Chase · SEO Specialist · All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
