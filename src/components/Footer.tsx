const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => (
  <footer className="bg-background text-foreground border-t border-border">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Logo + tagline */}
        <div>
          <p className="font-heading font-bold text-xl mb-3 text-foreground">Georgia J. Chase.</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Helping business owners get found,<br />trusted, and chosen on Google.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-col items-start md:items-center">
          <p className="font-heading font-semibold text-sm mb-3 text-foreground">Quick Links</p>
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact nudge */}
        <div className="md:text-right">
          <p className="font-heading font-semibold text-sm mb-3 text-foreground">Got a question? I'd love to hear from you.</p>
          <p className="text-sm text-muted-foreground">chasegeorgiaj@gmail.com</p>
        </div>
      </div>
    </div>

    <div className="border-t border-border py-4">
      <p className="text-center text-xs text-muted-foreground">
         © 2025 Georgia J. Chase · SEO Specialist · All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
