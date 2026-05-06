import { useState, useCallback, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BrandLogo from "./BrandLogo";
import AnnouncementBar from "./AnnouncementBar";

type NavLink =
  | { label: string; type: "anchor"; href: string }
  | { label: string; type: "route"; to: string };

const navLinks: NavLink[] = [
  { label: "Home", type: "anchor", href: "#home" },
  { label: "Services", type: "route", to: "/services" },
  { label: "Case Studies", type: "route", to: "/case-studies" },
  { label: "Portfolio", type: "route", to: "/portfolio" },
  { label: "Blog", type: "route", to: "/blog" },
  { label: "Reviews", type: "route", to: "/reviews" },
  { label: "About", type: "route", to: "/about" },
  { label: "Contact", type: "route", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
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
    navigate("/contact");
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
      className={`fixed top-0 left-0 right-0 z-50 animate-slide-down transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <AnnouncementBar />
      <div className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-8">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center h-20 py-1">
          <BrandLogo className="h-[42px] md:h-[50px] w-[120px] md:w-[160px]" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => renderLink(l))}
        </div>

        <Button
          onClick={scrollToForm}
          className="hidden md:inline-flex bg-conversion text-conversion-foreground hover:bg-conversion-dark rounded-full px-6"
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
        <div className="md:hidden bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-white/10 px-4 pb-4 space-y-3 animate-fade-in">
          {navLinks.map((l) => renderLink(l, true))}
          <Button
            onClick={scrollToForm}
            className="w-full bg-conversion text-conversion-foreground hover:bg-conversion-dark rounded-full"
          >
            Get Free Website Check
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
