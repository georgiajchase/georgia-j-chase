import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <a href="#home" className="text-xl font-heading font-bold text-foreground">
          Georgia J. Chase.
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <Button
          onClick={scrollToForm}
          className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-forest-dark rounded-full px-6"
        >
          Get Free Website Check
        </Button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground py-2"
            >
              {l.label}
            </a>
          ))}
          <Button
            onClick={scrollToForm}
            className="w-full bg-primary text-primary-foreground hover:bg-forest-dark rounded-full"
          >
            Get Free Website Check
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
