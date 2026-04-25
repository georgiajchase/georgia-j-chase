import { useState, useCallback, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/georgia-logo.webp";

type NavLink =
  | { label: string; type: "anchor"; href: string }
  | { label: string; type: "route"; to: string };

const navLinks: NavLink[] = [
  { label: "Home", type: "anchor", href: "#home" },
  { label: "Services", type: "anchor", href: "#services" },
  { label: "Case Studies", type: "route", to: "/case-studies" },
  { label: "Blog", type: "route", to: "/blog" },
  { label: "Contact", type: "anchor", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const goToAnchor = useCallback(
    (href: string) => {
      const id = href.replace("#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 250);
      } else {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    },
    [location.pathname, navigate]
  );

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    goToAnchor(href);
  };

  const scrollToForm = () => {
    setOpen(false);
    goToAnchor("#contact");
  };

  const renderLink = (l: NavLink, mobile = false) => {
    const baseClass = mobile
      ? "block text-sm font-medium text-muted-foreground hover:text-foreground py-2"
      : "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";

    if (l.type === "route") {
      return (
        <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className={baseClass}>
          {l.label}
        </Link>
      );
    }
    return (
      <a
        key={l.label}
        href={l.href}
        onClick={(e) => handleAnchorClick(e, l.href)}
        className={baseClass}
      >
        {l.label}
      </a>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 animate-slide-down border-b transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-border shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-background/40 backdrop-blur-xl backdrop-saturate-150 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center h-16 py-1">
          <img src={logo} alt="Georgia J. Chase" width="160" height="56" className="h-full w-auto object-contain" decoding="async" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => renderLink(l))}
        </div>

        <Button
          onClick={scrollToForm}
          className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-forest-dark rounded-full px-6"
        >
          Get Free Website Check
        </Button>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/40 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 px-4 pb-4 space-y-3 animate-fade-in">
          {navLinks.map((l) => renderLink(l, true))}
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
