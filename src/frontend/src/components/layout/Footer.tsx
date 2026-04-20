import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

const services = [
  "Residential Properties",
  "Commercial Properties",
  "Land & NA Plots",
  "Lease & Pre-Lease",
  "Life Insurance",
  "Health Insurance",
  "Property Insurance",
  "Vehicle Insurance",
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Properties", href: "#properties" },
  { label: "Insurance", href: "#insurance" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      id="contact"
      className="bg-[#060d1b] border-t border-border"
      data-ocid="footer"
    >
      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-primary/30 via-accent/10 to-secondary/20 border-b border-border">
        <div className="container mx-auto px-4 max-w-7xl py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              Ready to invest in your future?
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Speak to a Seven Corporation advisor today — no obligation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/917572905655"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20b354] transition-smooth shadow-elevated"
              data-ocid="footer.whatsapp_button"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
            <a
              href="tel:+917572905655"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/40 text-accent font-semibold text-sm hover:bg-accent/10 hover:border-accent/70 transition-smooth"
              data-ocid="footer.call_button"
            >
              <Phone size={16} /> Call +91 75729 05655
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 max-w-7xl py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="font-display text-2xl font-black text-accent">
                7
              </span>
            </div>
            <div>
              <div className="font-display text-sm font-bold text-foreground tracking-widest uppercase">
                Seven
              </div>
              <div className="font-body text-xs text-muted-foreground tracking-[0.18em] uppercase">
                Corporation
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            Vadodara's trusted asset advisory — combining real estate expertise
            with comprehensive insurance solutions.
          </p>
          <div className="space-y-2 text-sm">
            <a
              href="tel:+917572905655"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-smooth"
              data-ocid="footer.phone_link"
            >
              <Phone size={14} /> +91 75729 05655
            </a>
            <a
              href="mailto:info@sevencorporation.in"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-smooth"
              data-ocid="footer.email_link"
            >
              <Mail size={14} /> info@sevencorporation.in
            </a>
            <span className="flex items-start gap-2 text-muted-foreground">
              <MapPin size={14} className="mt-0.5 shrink-0" /> Gotri, Vadodara,
              Gujarat
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-5">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector(link.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-muted-foreground hover:text-accent transition-smooth flex items-center gap-1.5 group"
                  data-ocid={`footer.${link.label.toLowerCase()}_link`}
                >
                  <span className="h-px w-3 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-5">
            Services
          </h4>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s} className="text-sm text-muted-foreground">
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Coverage Areas */}
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-5">
            Coverage Areas
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            {[
              "Gotri",
              "Alkapuri",
              "Racecourse",
              "Productivity Road",
              "Fatehgunj",
              "Sayajigunj",
              "Akota",
              "Makarpura",
              "Waghodia Road",
              "Bhayli",
            ].map((area) => (
              <div key={area} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {year} Seven Corporation. All rights reserved.</span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 inline-flex items-center gap-1 transition-smooth"
            >
              caffeine.ai <ExternalLink size={10} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
