import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";

// ── SVG icon components (stroke-dashoffset animation on hover) ─────────────
function IconResidential({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
      aria-hidden="true"
    >
      <path
        d="M6 22 L24 6 L42 22 L42 44 L6 44 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeDasharray="120"
        strokeDashoffset={hovered ? 0 : 120}
        style={{
          transition: "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
        fill="none"
      />
      <rect
        x="18"
        y="30"
        width="12"
        height="14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeDasharray="60"
        strokeDashoffset={hovered ? 0 : 60}
        style={{
          transition: "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1) 0.1s",
        }}
        fill="none"
      />
      <path
        d="M14 22 L14 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="12"
        strokeDashoffset={hovered ? 0 : 12}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.2s" }}
      />
      <path
        d="M34 22 L34 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="12"
        strokeDashoffset={hovered ? 0 : 12}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.25s" }}
      />
    </svg>
  );
}

function IconCommercial({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="10"
        width="40"
        height="34"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeDasharray="148"
        strokeDashoffset={hovered ? 0 : 148}
        style={{
          transition: "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
        fill="none"
      />
      <line
        x1="4"
        y1="10"
        x2="24"
        y2="4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="22"
        strokeDashoffset={hovered ? 0 : 22}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.15s" }}
      />
      <line
        x1="24"
        y1="4"
        x2="44"
        y2="10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="22"
        strokeDashoffset={hovered ? 0 : 22}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.2s" }}
      />
      {[12, 20, 28, 36].map((x, i) => (
        <rect
          key={x}
          x={x}
          y="18"
          width="6"
          height="7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeDasharray="26"
          strokeDashoffset={hovered ? 0 : 26}
          style={{
            transition: `stroke-dashoffset 0.35s ease ${0.25 + i * 0.07}s`,
          }}
          fill="none"
        />
      ))}
      {[12, 20, 28, 36].map((x, i) => (
        <rect
          key={`b${x}`}
          x={x}
          y="29"
          width="6"
          height="7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeDasharray="26"
          strokeDashoffset={hovered ? 0 : 26}
          style={{
            transition: `stroke-dashoffset 0.35s ease ${0.38 + i * 0.07}s`,
          }}
          fill="none"
        />
      ))}
    </svg>
  );
}

function IconLand({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
      aria-hidden="true"
    >
      <path
        d="M4 38 Q12 28 24 32 Q36 36 44 22"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="60"
        strokeDashoffset={hovered ? 0 : 60}
        style={{
          transition: "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
        fill="none"
      />
      <path
        d="M4 44 L44 44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="40"
        strokeDashoffset={hovered ? 0 : 40}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.1s" }}
      />
      <path
        d="M24 10 L24 22 M20 14 L24 10 L28 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="28"
        strokeDashoffset={hovered ? 0 : 28}
        style={{ transition: "stroke-dashoffset 0.45s ease 0.2s" }}
      />
      <circle
        cx="24"
        cy="9"
        r="3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="22"
        strokeDashoffset={hovered ? 0 : 22}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.3s" }}
        fill="none"
      />
    </svg>
  );
}

function IconLease({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="8"
        width="32"
        height="36"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeDasharray="140"
        strokeDashoffset={hovered ? 0 : 140}
        style={{
          transition: "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
        fill="none"
      />
      <path
        d="M16 20 L32 20 M16 27 L28 27 M16 34 L24 34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="50"
        strokeDashoffset={hovered ? 0 : 50}
        style={{ transition: "stroke-dashoffset 0.45s ease 0.15s" }}
      />
      <circle
        cx="34"
        cy="38"
        r="7"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="44"
        strokeDashoffset={hovered ? 0 : 44}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.25s" }}
        fill="none"
      />
      <path
        d="M31 38 L33 40 L37 36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="10"
        strokeDashoffset={hovered ? 0 : 10}
        style={{ transition: "stroke-dashoffset 0.35s ease 0.38s" }}
      />
    </svg>
  );
}

function IconLife({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
      aria-hidden="true"
    >
      <path
        d="M24 40 C24 40 6 28 6 17 C6 11.5 10.5 7 16 7 C19.5 7 22.5 8.8 24 11.5 C25.5 8.8 28.5 7 32 7 C37.5 7 42 11.5 42 17 C42 28 24 40 24 40 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeDasharray="120"
        strokeDashoffset={hovered ? 0 : 120}
        style={{
          transition: "stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
        fill="none"
      />
      <path
        d="M19 22 L23 26 L29 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="16"
        strokeDashoffset={hovered ? 0 : 16}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.25s" }}
      />
    </svg>
  );
}

function IconHealth({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="6"
        width="36"
        height="36"
        rx="8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeDasharray="144"
        strokeDashoffset={hovered ? 0 : 144}
        style={{
          transition: "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
        fill="none"
      />
      <path
        d="M24 15 L24 33 M15 24 L33 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="40"
        strokeDashoffset={hovered ? 0 : 40}
        style={{ transition: "stroke-dashoffset 0.45s ease 0.18s" }}
      />
    </svg>
  );
}

function IconPropertyIns({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
      aria-hidden="true"
    >
      <path
        d="M6 20 L24 6 L42 20 L42 44 L6 44 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeDasharray="120"
        strokeDashoffset={hovered ? 0 : 120}
        style={{
          transition: "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
        fill="none"
      />
      <path
        d="M24 20 C24 20 16 25 16 31 C16 35.4 19.6 39 24 39 C28.4 39 32 35.4 32 31 C32 25 24 20 24 20 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeDasharray="70"
        strokeDashoffset={hovered ? 0 : 70}
        style={{ transition: "stroke-dashoffset 0.5s ease 0.18s" }}
        fill="none"
      />
    </svg>
  );
}

function IconBusiness({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="14"
        width="36"
        height="28"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeDasharray="136"
        strokeDashoffset={hovered ? 0 : 136}
        style={{
          transition: "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
        fill="none"
      />
      <path
        d="M16 14 L16 10 C16 7.8 17.8 6 20 6 L28 6 C30.2 6 32 7.8 32 10 L32 14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="40"
        strokeDashoffset={hovered ? 0 : 40}
        style={{ transition: "stroke-dashoffset 0.45s ease 0.12s" }}
        fill="none"
      />
      <path
        d="M6 26 L42 26 M19 26 L19 32 M29 26 L29 32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="50"
        strokeDashoffset={hovered ? 0 : 50}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.22s" }}
      />
    </svg>
  );
}

function IconVehicle({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-9 h-9"
      aria-hidden="true"
    >
      <path
        d="M4 28 L8 16 C8.8 13.8 10.9 12.4 13.3 12.4 L34.7 12.4 C37.1 12.4 39.2 13.8 40 16 L44 28 L44 36 C44 37.1 43.1 38 42 38 L6 38 C4.9 38 4 37.1 4 36 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeDasharray="130"
        strokeDashoffset={hovered ? 0 : 130}
        style={{
          transition: "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
        fill="none"
      />
      <circle
        cx="14"
        cy="38"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="32"
        strokeDashoffset={hovered ? 0 : 32}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.2s" }}
        fill="none"
      />
      <circle
        cx="34"
        cy="38"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="32"
        strokeDashoffset={hovered ? 0 : 32}
        style={{ transition: "stroke-dashoffset 0.4s ease 0.25s" }}
        fill="none"
      />
      <path
        d="M8 28 L40 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="32"
        strokeDashoffset={hovered ? 0 : 32}
        style={{ transition: "stroke-dashoffset 0.35s ease 0.3s" }}
      />
    </svg>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────
type ColorKey = "cyan" | "gold" | "primary";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  color: ColorKey;
  href: string;
  Icon: React.ComponentType<{ hovered: boolean }>;
  tag?: string;
}

const propertyServices: ServiceItem[] = [
  {
    id: "prop-residential",
    title: "Residential Properties",
    description:
      "Premium villas, luxury apartments, and gated communities in Vadodara's prime locations with curated investment potential.",
    stat: "150+",
    statLabel: "Active Listings",
    color: "cyan",
    href: "#properties",
    Icon: IconResidential,
    tag: "Most Popular",
  },
  {
    id: "prop-commercial",
    title: "Commercial Properties",
    description:
      "Grade-A office spaces, retail outlets, and warehouses for strategic business investment and consistent rental income.",
    stat: "11%",
    statLabel: "Avg Rental Yield",
    color: "gold",
    href: "#properties",
    Icon: IconCommercial,
    tag: "High Yield",
  },
  {
    id: "prop-land",
    title: "Land & NA Plots",
    description:
      "NA-converted plots in high-growth corridors — the smartest asset class of this decade for appreciation-focused investors.",
    stat: "35%",
    statLabel: "Avg ROI",
    color: "primary",
    href: "#properties",
    Icon: IconLand,
    tag: "High Growth",
  },
  {
    id: "prop-lease",
    title: "Lease & Pre-Lease",
    description:
      "Ready-to-earn pre-leased properties with multinational tenants. Start collecting Day-1 rental income from day of purchase.",
    stat: "10yr",
    statLabel: "Lease Terms",
    color: "cyan",
    href: "#properties",
    Icon: IconLease,
  },
];

const insuranceServices: ServiceItem[] = [
  {
    id: "ins-life",
    title: "Life Insurance",
    description:
      "Secure your family's financial future with term plans, ULIPs, and endowment policies from India's top-rated insurers.",
    stat: "₹1Cr+",
    statLabel: "Max Coverage",
    color: "cyan",
    href: "#insurance",
    Icon: IconLife,
    tag: "Most Essential",
  },
  {
    id: "ins-health",
    title: "Health Insurance",
    description:
      "Comprehensive family floater and individual plans with cashless hospitalization across 10,000+ network hospitals.",
    stat: "₹50L",
    statLabel: "Family Cover",
    color: "gold",
    href: "#insurance",
    Icon: IconHealth,
    tag: "Family Plans",
  },
  {
    id: "ins-property",
    title: "Property Insurance",
    description:
      "All-risk protection for your real estate assets — fire, flood, structural damage, and contents fully covered.",
    stat: "24/7",
    statLabel: "Claim Support",
    color: "primary",
    href: "#insurance",
    Icon: IconPropertyIns,
  },
  {
    id: "ins-business",
    title: "Business Insurance",
    description:
      "Shield your enterprise with liability, asset protection, and employee cover — customized for SMEs and enterprises alike.",
    stat: "100%",
    statLabel: "Claims Settled",
    color: "cyan",
    href: "#insurance",
    Icon: IconBusiness,
    tag: "SME Ready",
  },
  {
    id: "ins-vehicle",
    title: "Vehicle Insurance",
    description:
      "Zero-depreciation cover for cars, bikes, and commercial vehicles with instant policy issuance and hassle-free renewal.",
    stat: "0%",
    statLabel: "Depreciation",
    color: "gold",
    href: "#insurance",
    Icon: IconVehicle,
  },
];

const colorMap: Record<
  ColorKey,
  { bg: string; text: string; border: string; stat: string; glow: string }
> = {
  cyan: {
    bg: "bg-accent/10",
    text: "text-accent",
    border: "border-accent/20",
    stat: "text-gradient-accent",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.75_0.18_195/0.35)]",
  },
  gold: {
    bg: "bg-secondary/10",
    text: "text-secondary",
    border: "border-secondary/20",
    stat: "text-gradient-gold",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.72_0.13_95/0.35)]",
  },
  primary: {
    bg: "bg-primary/20",
    text: "text-foreground/80",
    border: "border-primary/30",
    stat: "text-gradient-accent",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.27_0.12_302/0.5)]",
  },
};

// ── 3D Tilt Card ─────────────────────────────────────────────────────────────
function ServiceCard3D({ svc, index }: { svc: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const colors = colorMap[svc.color];
  const { Icon } = svc;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: dy * -8, y: dx * 8 });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  const scrollTo = () => {
    document
      .getElementById(svc.href.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      ref={cardRef}
      type="button"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={scrollTo}
      aria-label={`Learn about ${svc.title}`}
      data-ocid={`services.card.${index + 1}`}
      className={cn(
        "group relative text-left p-6 rounded-2xl border border-border bg-card",
        "cursor-pointer overflow-hidden w-full",
        "transition-[border-color,box-shadow] duration-300 ease-out",
        hovered && "border-accent/40",
        colors.glow,
      )}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? 8 : 0}px)`,
        transition: hovered
          ? "transform 0.1s ease-out, border-color 0.3s, box-shadow 0.3s"
          : "transform 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.3s",
        willChange: "transform",
        animationDelay: `${index * 0.07}s`,
      }}
    >
      {/* Glowing top edge on hover */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent transition-opacity duration-300",
          hovered ? "opacity-80" : "opacity-0",
        )}
      />

      {/* Subtle corner accent */}
      <div
        className={cn(
          "absolute top-0 right-0 w-20 h-20 rounded-bl-full transition-opacity duration-300",
          colors.bg,
          hovered ? "opacity-60" : "opacity-20",
        )}
      />

      {/* Tag badge */}
      {svc.tag && (
        <span
          className={cn(
            "absolute top-4 right-4 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full",
            colors.bg,
            colors.text,
          )}
        >
          {svc.tag}
        </span>
      )}

      {/* Icon */}
      <div
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300",
          colors.bg,
          colors.text,
          hovered && "scale-110",
        )}
      >
        <Icon hovered={hovered} />
      </div>

      {/* Text content */}
      <h3
        className={cn(
          "font-display text-lg font-bold text-foreground mb-2 transition-colors duration-300",
          hovered && "text-accent",
        )}
      >
        {svc.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
        {svc.description}
      </p>

      {/* Stat footer */}
      <div
        className={cn(
          "flex items-baseline gap-1.5 border-t pt-4",
          colors.border,
        )}
      >
        <span
          className={cn("font-display text-2xl font-extrabold", colors.stat)}
        >
          {svc.stat}
        </span>
        <span className="text-xs text-muted-foreground">{svc.statLabel}</span>
        <span
          className={cn(
            "ml-auto text-xs font-semibold flex items-center gap-1 transition-colors duration-300",
            colors.text,
            hovered ? "opacity-100" : "opacity-0 translate-x-1",
          )}
          style={{ transition: "opacity 0.3s, transform 0.3s" }}
        >
          Explore →
        </span>
      </div>
    </button>
  );
}

// ── Section toggle pill ──────────────────────────────────────────────────────
function TogglePill({
  active,
  onChange,
}: {
  active: "property" | "insurance";
  onChange: (v: "property" | "insurance") => void;
}) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-card p-1 gap-1 shadow-lg"
      aria-label="Service category toggle"
      data-ocid="services.toggle"
    >
      <button
        type="button"
        onClick={() => onChange("property")}
        data-ocid="services.toggle.property"
        className={cn(
          "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 font-display",
          active === "property"
            ? "bg-accent text-[oklch(0.1_0_0)] shadow-md"
            : "text-muted-foreground hover:text-foreground",
        )}
        aria-pressed={active === "property"}
      >
        <span role="img" aria-hidden>
          🏠
        </span>
        Property Services
      </button>
      <button
        type="button"
        onClick={() => onChange("insurance")}
        data-ocid="services.toggle.insurance"
        className={cn(
          "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 font-display",
          active === "insurance"
            ? "bg-secondary text-[oklch(0.1_0_0)] shadow-md"
            : "text-muted-foreground hover:text-foreground",
        )}
        aria-pressed={active === "insurance"}
      >
        <span role="img" aria-hidden>
          🛡
        </span>
        Insurance Services
      </button>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"property" | "insurance">(
    "property",
  );
  const [visible, setVisible] = useState(true);
  const prevTab = useRef<"property" | "insurance">("property");

  const handleToggle = (next: "property" | "insurance") => {
    if (next === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      prevTab.current = activeTab;
      setActiveTab(next);
      setVisible(true);
    }, 220);
  };

  const services =
    activeTab === "property" ? propertyServices : insuranceServices;
  const subtitle =
    activeTab === "property"
      ? "From residential villas to commercial Grade-A assets — discover investment opportunities engineered for maximum returns."
      : "Comprehensive financial protection across life, health, property, business, and vehicles — your risks, fully covered.";

  return (
    <SectionWrapper
      id="services"
      alt
      label={
        activeTab === "property" ? "Property Advisory" : "Insurance Advisory"
      }
      labelColor={activeTab === "property" ? "cyan" : "gold"}
      title="Every Asset. Every Risk. Covered."
      subtitle={subtitle}
      data-ocid="services.section"
    >
      {/* Toggle pill — centered above grid */}
      <div
        className="flex justify-center mb-12"
        data-ocid="services.toggle_wrapper"
      >
        <TogglePill active={activeTab} onChange={handleToggle} />
      </div>

      {/* Cards grid with fade transition */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
        }}
        data-ocid={`services.${activeTab}.grid`}
      >
        {services.map((svc, i) => (
          <ServiceCard3D key={svc.id} svc={svc} index={i} />
        ))}
      </div>

      {/* Bottom CTA row */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <p className="text-muted-foreground text-sm">
          {activeTab === "property"
            ? "Looking for a specific property type or investment range?"
            : "Need help choosing the right insurance plan?"}
        </p>
        <a
          href="https://wa.me/917572905655"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="services.cta.whatsapp"
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300",
            activeTab === "property"
              ? "border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/60"
              : "border-secondary/30 text-secondary hover:bg-secondary/10 hover:border-secondary/60",
          )}
        >
          <span className="text-base">💬</span>
          Talk to an Advisor
        </a>
      </div>
    </SectionWrapper>
  );
}
