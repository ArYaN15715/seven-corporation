import { GlowButton } from "@/components/ui/GlowButton";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useScrollRevealChildren } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import {
  Building2,
  Factory,
  Landmark,
  MapPin,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

/* ─── Hotspot data ──────────────────────────────────────────────────── */
const hotspots = [
  {
    id: "gotri",
    label: "Gotri",
    tag: "High Growth Zone",
    desc: "Seven Corporation's home ground. Premium villas, gated communities, and rapid infrastructure upgrades drive strong capital appreciation.",
    growth: "+32%",
    icon: Building2,
    color: "accent",
    // SVG viewBox coordinates (0 0 500 420)
    cx: 148,
    cy: 165,
  },
  {
    id: "sevasi",
    label: "Sevasi",
    tag: "Premium Residential",
    desc: "Lush, low-density township corridor. Sought after by HNI buyers for spacious bungalows and serene living away from city congestion.",
    growth: "+28%",
    icon: Building2,
    color: "secondary",
    cx: 95,
    cy: 230,
  },
  {
    id: "alkapuri",
    label: "Alkapuri",
    tag: "Commercial Hub",
    desc: "Vadodara's prime business address. Grade-A offices, flagship retail, and luxury penthouses with consistent rental demand.",
    growth: "+22%",
    icon: Landmark,
    color: "accent",
    cx: 258,
    cy: 215,
  },
  {
    id: "waghodia",
    label: "Waghodia Road",
    tag: "Industrial Belt",
    desc: "Expanding logistics and warehouse corridor. High land appreciation driven by industrial demand and GIDC proximity.",
    growth: "+38%",
    icon: Factory,
    color: "secondary",
    cx: 370,
    cy: 290,
  },
  {
    id: "harni",
    label: "Harni",
    tag: "Emerging Zone",
    desc: "Fast-rising residential micro-market near Harni Lake. Affordable land today, premium asset tomorrow.",
    growth: "+41%",
    icon: TrendingUp,
    color: "accent",
    cx: 320,
    cy: 145,
  },
  {
    id: "oldpadra",
    label: "Old Padra Road",
    tag: "Investment Belt",
    desc: "4-lane arterial with township and commercial development boom. High ROI corridor for mid-segment investors.",
    growth: "+29%",
    icon: TrendingUp,
    color: "secondary",
    cx: 195,
    cy: 315,
  },
];

/* ─── Stats cards ───────────────────────────────────────────────────── */
const stats = [
  { value: "18% YoY", label: "Average Price Growth", color: "accent" },
  { value: "High", label: "Rental Demand", color: "secondary" },
  { value: "9.2/10", label: "Infrastructure Score", color: "accent" },
  { value: "2026", label: "Future Metro Connectivity", color: "secondary" },
];

/* ─── Floating WhatsApp ─────────────────────────────────────────────── */
export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/917572905655"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-ocid="whatsapp.floating_button"
      className="fixed bottom-6 right-6 z-50 group"
      style={{ willChange: "transform" }}
    >
      {/* Outer pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-30"
        style={{ animation: "wa-pulse 2.2s ease-out infinite" }}
        aria-hidden="true"
      />
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-20"
        style={{ animation: "wa-pulse 2.2s ease-out infinite 0.7s" }}
        aria-hidden="true"
      />

      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
        <MessageCircle size={26} className="text-white fill-white" />
      </div>

      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-card border border-border text-foreground text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat on WhatsApp
      </span>

      <style>{`
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.35; }
          70% { transform: scale(1.85); opacity: 0; }
          100% { transform: scale(1.85); opacity: 0; }
        }
      `}</style>
    </a>
  );
}

/* ─── Map SVG ───────────────────────────────────────────────────────── */
function VadodaraMap({
  activeId,
  onHover,
}: {
  activeId: string | null;
  onHover: (id: string | null) => void;
}) {
  return (
    <svg
      viewBox="0 0 500 420"
      className="w-full h-full"
      aria-label="Vadodara investment map"
      role="img"
    >
      {/* Background glow */}
      <defs>
        <radialGradient id="mapBg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="oklch(0.22 0.08 280)" stopOpacity="1" />
          <stop
            offset="100%"
            stopColor="oklch(0.09 0.02 302)"
            stopOpacity="1"
          />
        </radialGradient>
        <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor="oklch(0.75 0.18 195)"
            stopOpacity="0.25"
          />
          <stop
            offset="100%"
            stopColor="oklch(0.75 0.18 195)"
            stopOpacity="0"
          />
        </radialGradient>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor="oklch(0.72 0.13 95)"
            stopOpacity="0.25"
          />
          <stop offset="100%" stopColor="oklch(0.72 0.13 95)" stopOpacity="0" />
        </radialGradient>
        <filter id="pinGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base fill */}
      <rect width="500" height="420" fill="url(#mapBg)" rx="0" />

      {/* Grid lines */}
      {[38, 76, 114, 152, 190, 228, 266, 304, 342, 380].map((y) => (
        <line
          key={`h${y}`}
          x1="0"
          y1={y}
          x2="500"
          y2={y}
          stroke="oklch(0.75 0.18 195)"
          strokeOpacity="0.06"
          strokeWidth="1"
        />
      ))}
      {[42, 84, 126, 168, 210, 252, 294, 336, 378, 420, 462, 504].map((x) => (
        <line
          key={`v${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2="420"
          stroke="oklch(0.75 0.18 195)"
          strokeOpacity="0.06"
          strokeWidth="1"
        />
      ))}

      {/* River - Vishwamitri */}
      <path
        d="M 20 190 Q 80 170, 140 195 Q 200 218, 260 200 Q 310 184, 360 195 Q 410 207, 480 185"
        fill="none"
        stroke="oklch(0.62 0.14 220)"
        strokeOpacity="0.45"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <text
        x="230"
        y="180"
        fill="oklch(0.62 0.14 220)"
        fillOpacity="0.5"
        fontSize="8"
        fontFamily="var(--font-display)"
        letterSpacing="2"
      >
        VISHWAMITRI RIVER
      </text>

      {/* Major roads */}
      {/* NH48 horizontal */}
      <path
        d="M 0 270 L 500 270"
        fill="none"
        stroke="oklch(0.72 0.13 95)"
        strokeOpacity="0.22"
        strokeWidth="3"
        strokeDasharray="10 4"
      />
      <text
        x="420"
        y="265"
        fill="oklch(0.72 0.13 95)"
        fillOpacity="0.4"
        fontSize="7"
        fontFamily="var(--font-body)"
      >
        NH48
      </text>

      {/* Ring road diagonal */}
      <path
        d="M 60 40 Q 180 30, 280 90 Q 380 150, 450 260 Q 480 320, 440 390"
        fill="none"
        stroke="oklch(0.75 0.18 195)"
        strokeOpacity="0.18"
        strokeWidth="2.5"
        strokeDasharray="8 4"
      />
      <text
        x="400"
        y="178"
        fill="oklch(0.75 0.18 195)"
        fillOpacity="0.35"
        fontSize="7"
        fontFamily="var(--font-body)"
        transform="rotate(52, 400, 178)"
      >
        RING ROAD
      </text>

      {/* Padra Road */}
      <path
        d="M 170 420 Q 185 370, 195 315 Q 205 265, 220 200 Q 235 150, 258 120"
        fill="none"
        stroke="oklch(0.60 0.10 200)"
        strokeOpacity="0.2"
        strokeWidth="2"
      />

      {/* City center label */}
      <text
        x="250"
        y="375"
        fill="oklch(0.93 0 0)"
        fillOpacity="0.12"
        fontSize="28"
        fontFamily="var(--font-display)"
        fontWeight="900"
        letterSpacing="8"
        textAnchor="middle"
      >
        VADODARA
      </text>
      <text
        x="250"
        y="392"
        fill="oklch(0.93 0 0)"
        fillOpacity="0.08"
        fontSize="10"
        fontFamily="var(--font-body)"
        letterSpacing="4"
        textAnchor="middle"
      >
        GUJARAT · INDIA
      </text>

      {/* Hotspot markers */}
      {hotspots.map((h) => {
        const isActive = activeId === h.id;
        const isCyan = h.color === "accent";
        const dotColor = isCyan
          ? "oklch(0.75 0.18 195)"
          : "oklch(0.72 0.13 95)";
        const glowId = isCyan ? "cyanGlow" : "goldGlow";

        return (
          <g
            key={h.id}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => onHover(h.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(h.id)}
            onBlur={() => onHover(null)}
            tabIndex={0}
            aria-label={`${h.label} — ${h.tag}`}
            data-ocid={`location.map_marker.${h.id}`}
          >
            {/* Glow area */}
            {isActive && (
              <circle cx={h.cx} cy={h.cy} r="28" fill={`url(#${glowId})`} />
            )}

            {/* Pulse ring */}
            <circle
              cx={h.cx}
              cy={h.cy}
              r={isActive ? 14 : 10}
              fill={dotColor}
              fillOpacity="0.08"
              stroke={dotColor}
              strokeOpacity="0.3"
              strokeWidth="1"
            >
              <animate
                attributeName="r"
                values={isActive ? "14;22;14" : "10;17;10"}
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Core dot */}
            <circle
              cx={h.cx}
              cy={h.cy}
              r={isActive ? 7 : 5}
              fill={dotColor}
              filter="url(#pinGlow)"
              style={{ transition: "r 0.2s ease" }}
            />

            {/* Label */}
            <rect
              x={h.cx + 10}
              y={h.cy - 11}
              width={h.label.length * 6.2 + 8}
              height={16}
              rx="3"
              fill="oklch(0.12 0.02 302)"
              fillOpacity="0.88"
              stroke={dotColor}
              strokeOpacity="0.4"
              strokeWidth="0.8"
            />
            <text
              x={h.cx + 14}
              y={h.cy + 0}
              fill={dotColor}
              fontSize="8.5"
              fontFamily="var(--font-display)"
              fontWeight="700"
            >
              {h.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Tooltip ───────────────────────────────────────────────────────── */
function HotspotTooltip({ spot }: { spot: (typeof hotspots)[number] }) {
  const isCyan = spot.color === "accent";
  return (
    <div
      className={cn(
        "rounded-xl border p-4 bg-card shadow-xl transition-all duration-200",
        isCyan ? "border-accent/30" : "border-secondary/30",
      )}
      data-ocid={`location.tooltip.${spot.id}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <MapPin
          size={12}
          className={isCyan ? "text-accent" : "text-secondary"}
        />
        <span
          className={cn(
            "text-xs font-bold",
            isCyan ? "text-accent" : "text-secondary",
          )}
        >
          {spot.label}
        </span>
        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
          {spot.tag}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-2">
        {spot.desc}
      </p>
      <div className="flex items-center gap-1">
        <TrendingUp
          size={11}
          className={isCyan ? "text-accent" : "text-secondary"}
        />
        <span
          className={cn(
            "text-sm font-bold font-display",
            isCyan ? "text-accent" : "text-secondary",
          )}
        >
          {spot.growth}
        </span>
        <span className="text-[10px] text-muted-foreground ml-1">
          3yr growth
        </span>
      </div>
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────── */
export function LocationSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const statsRef = useScrollRevealChildren(".reveal-child", 0.1, 100);
  const activeSpot = hotspots.find((h) => h.id === activeId) ?? null;

  return (
    <>
      <SectionWrapper
        id="location"
        label="Market Intelligence"
        labelColor="cyan"
        title="Prime Investment Zones"
        subtitle="Gotri, Sevasi, and key Vadodara corridors are experiencing unprecedented real estate growth. Seven Corporation maps the money."
        alt
        data-ocid="location.section"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* ── Left: Map ─────────────────────────────────────── */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden border border-border relative"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.14 0.06 302) 0%, oklch(0.09 0.02 280) 100%)",
                aspectRatio: "1 / 1",
              }}
              data-ocid="location.map"
            >
              <VadodaraMap activeId={activeId} onHover={setActiveId} />

              {/* Active tooltip overlay (desktop) */}
              <div
                className={cn(
                  "absolute left-4 bottom-4 right-4 md:right-auto md:max-w-xs transition-all duration-300",
                  activeSpot
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none",
                )}
                aria-live="polite"
              >
                {activeSpot && <HotspotTooltip spot={activeSpot} />}
              </div>

              {/* Coverage badge */}
              <div className="absolute top-4 right-4 bg-card/90 border border-border rounded-xl px-3 py-2 backdrop-blur-sm">
                <p className="text-[10px] text-muted-foreground">
                  Coverage Radius
                </p>
                <p className="font-display text-base font-bold text-gradient-accent">
                  25+ km
                </p>
              </div>

              {/* Hover hint */}
              <div className="absolute bottom-4 right-4 text-[10px] text-muted-foreground/50 flex items-center gap-1">
                <MapPin size={8} />
                Hover markers to explore
              </div>
            </div>
          </div>

          {/* ── Right: Hotspot list ───────────────────────────── */}
          <div className="flex flex-col gap-3">
            <p className="text-xs text-muted-foreground mb-1">
              Click or hover any marker on the map, or explore zones below:
            </p>
            {hotspots.map((spot, i) => {
              const isCyan = spot.color === "accent";
              const Icon = spot.icon;
              const isActive = activeId === spot.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onMouseEnter={() => setActiveId(spot.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={() => setActiveId(isActive ? null : spot.id)}
                  className={cn(
                    "group flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200",
                    isActive
                      ? isCyan
                        ? "border-accent/40 bg-accent/5 shadow-lg"
                        : "border-secondary/40 bg-secondary/5 shadow-lg"
                      : "border-border bg-card hover:border-accent/25 hover:bg-card/80",
                  )}
                  data-ocid={`location.hotspot.${i + 1}`}
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200",
                      isCyan
                        ? "bg-accent/10 text-accent"
                        : "bg-secondary/10 text-secondary",
                    )}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-display text-sm font-semibold text-foreground">
                        {spot.label}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                        {spot.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {spot.desc}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p
                      className={cn(
                        "font-display text-base font-bold",
                        isCyan ? "text-accent" : "text-secondary",
                      )}
                    >
                      {spot.growth}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      3yr growth
                    </p>
                  </div>
                </button>
              );
            })}

            {/* CTA */}
            <div className="pt-3">
              <GlowButton
                variant="cyan"
                size="lg"
                className="w-full"
                icon={<MessageCircle size={18} />}
                iconPosition="left"
                onClick={() =>
                  window.open("https://wa.me/917572905655", "_blank")
                }
                data-ocid="location.invest_advice_button"
              >
                Get Investment Advice
              </GlowButton>
            </div>
          </div>
        </div>

        {/* ── Stats row ─────────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          data-ocid="location.stats"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "reveal-child rounded-xl border border-border bg-card p-5 text-center card-hover group",
              )}
              data-ocid={`location.stat.${i + 1}`}
            >
              <p
                className={cn(
                  "font-display text-2xl font-black mb-1",
                  s.color === "accent"
                    ? "text-gradient-accent"
                    : "text-gradient-gold",
                )}
              >
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
