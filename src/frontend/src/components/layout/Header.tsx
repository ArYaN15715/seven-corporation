import { GlowButton } from "@/components/ui/GlowButton";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import { Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Properties", href: "#properties" },
  { label: "Insurance", href: "#insurance" },
  { label: "About", href: "#trust" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleNav("#home");
    },
    [handleNav],
  );

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      setMenuOpen((v) => !v);
    }
    if (e.key === "Escape") setMenuOpen(false);
  }, []);

  const handleOverlayKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0B132B]/95 backdrop-blur-xl border-b border-border shadow-elevated"
            : "bg-transparent",
        )}
        data-ocid="header"
      >
        <div className="container mx-auto px-4 max-w-7xl h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-3 shrink-0"
            data-ocid="header.logo_link"
            aria-label="Seven Corporation - Home"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-accent/20 animate-pulse-glow" />
              <span className="relative font-display text-2xl font-black text-accent leading-none">
                7
              </span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-sm font-bold text-foreground tracking-widest uppercase">
                Seven
              </span>
              <span className="font-body text-xs text-muted-foreground tracking-[0.18em] uppercase">
                Corporation
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth rounded-lg hover:bg-muted/30 relative group"
                data-ocid={`header.nav_${link.label.toLowerCase()}_link`}
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+917572905655"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/30 text-accent text-sm font-medium hover:border-accent/60 hover:bg-accent/10 transition-smooth"
              data-ocid="header.call_button"
              aria-label="Call Seven Corporation"
            >
              <Phone size={15} />
              <span className="hidden lg:inline">+91 75729 05655</span>
              <span className="lg:hidden">Call</span>
            </a>
            <GlowButton
              variant="cyan"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => handleNav("#contact")}
              data-ocid="header.contact_button"
            >
              Get Advisory
            </GlowButton>

            {/* Hamburger */}
            {isMobile && (
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                onKeyDown={handleMenuKeyDown}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-border text-foreground hover:bg-muted/30 transition-smooth"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                data-ocid="header.menu_toggle"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
          onKeyDown={handleOverlayKeyDown}
          role="presentation"
        >
          <dialog
            open
            className="absolute top-16 left-0 right-0 m-0 max-w-none w-full bg-card/98 backdrop-blur-xl border-b border-border shadow-deep"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            <nav className="container px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  className="px-4 py-3 text-base font-medium text-foreground hover:text-accent hover:bg-muted/30 rounded-lg transition-smooth"
                  data-ocid={`header.mobile_nav_${link.label.toLowerCase()}_link`}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                <a
                  href="tel:+917572905655"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-accent/40 text-accent font-medium hover:bg-accent/10 transition-smooth"
                  data-ocid="header.mobile_call_button"
                >
                  <Phone size={16} /> Call Now
                </a>
                <GlowButton
                  variant="cyan"
                  size="md"
                  className="flex-1"
                  onClick={() => handleNav("#contact")}
                  data-ocid="header.mobile_contact_button"
                >
                  Advisory
                </GlowButton>
              </div>
            </nav>
          </dialog>
        </div>
      )}

      {/* Sticky Call Button (bottom left on mobile) */}
      <a
        href="tel:+917572905655"
        className="fixed bottom-6 left-6 z-50 md:hidden flex items-center justify-center w-12 h-12 bg-accent rounded-full shadow-glow-cyan transition-smooth hover:bg-accent/90"
        data-ocid="call.floating_button"
        aria-label="Call Seven Corporation"
      >
        <Phone size={20} className="text-accent-foreground" />
      </a>
    </>
  );
}
