import { GlowButton } from "@/components/ui/GlowButton";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { properties } from "@/data/properties";
import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import type { PropertyListing } from "@/types";
import {
  ArrowRight,
  BedDouble,
  ChevronDown,
  Info,
  MapPin,
  Maximize2,
  Phone,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TypeFilter = "all" | "residential" | "commercial" | "land" | "lease";
type BudgetFilter = "all" | "under1cr" | "1to3cr" | "above3cr";
type InvestFilter = "all" | "buy" | "lease" | "invest";
type CardMode = "buy" | "lease" | "invest";

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPE_FILTERS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land / NA" },
  { value: "lease", label: "Lease" },
];

const BUDGET_OPTIONS: { value: BudgetFilter; label: string }[] = [
  { value: "all", label: "Any Budget" },
  { value: "under1cr", label: "Under ₹1 Cr" },
  { value: "1to3cr", label: "₹1 – ₹3 Cr" },
  { value: "above3cr", label: "Above ₹3 Cr" },
];

const INVEST_FILTERS: { value: InvestFilter; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "buy", label: "Buy" },
  { value: "lease", label: "Lease" },
  { value: "invest", label: "Invest" },
];

const BADGE_COLORS: Record<PropertyListing["badge"], string> = {
  "EST. YIELD": "bg-accent/20 text-accent border-accent/30",
  GOLD: "bg-secondary/20 text-secondary border-secondary/30",
  ROI: "bg-primary/30 text-foreground/90 border-primary/40",
  HOT: "bg-red-500/20 text-red-400 border-red-500/30",
  NEW: "bg-green-500/20 text-green-400 border-green-500/30",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function matchesBudget(p: PropertyListing, budget: BudgetFilter): boolean {
  if (budget === "all") return true;
  if (budget === "under1cr") return p.priceRaw < 10000000;
  if (budget === "1to3cr")
    return p.priceRaw >= 10000000 && p.priceRaw <= 30000000;
  return p.priceRaw > 30000000;
}

function matchesInvest(p: PropertyListing, invest: InvestFilter): boolean {
  if (invest === "all") return true;
  if (invest === "buy") return p.type !== "lease";
  if (invest === "lease") return p.type === "lease" || !!p.isPreLease;
  // invest = "invest" → higher ROI projects (yield ≥ 10%)
  return Number.parseFloat(p.annualYield) >= 10;
}

function isBestForInvestment(p: PropertyListing): boolean {
  return (
    Number.parseFloat(p.annualYield) >= 10 ||
    p.badge === "GOLD" ||
    p.badge === "ROI"
  );
}

function getMonthlyRent(p: PropertyListing): string {
  const monthly = Math.round(
    (p.priceRaw * Number.parseFloat(p.annualYield)) / 100 / 12,
  );
  return `₹${(monthly / 1000).toFixed(0)}K/mo`;
}

function getProjectedValue(p: PropertyListing): string {
  const val = p.priceRaw * (1 + Number.parseFloat(p.projectedROI) / 100);
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  return `₹${(val / 100000).toFixed(0)} L`;
}

// ─── Animated price ───────────────────────────────────────────────────────────

function AnimatedPrice({ raw, formatted }: { raw: number; formatted: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const unit = raw >= 10000000 ? "Cr" : "L";
  const endVal =
    raw >= 10000000
      ? Number.parseFloat((raw / 10000000).toFixed(1))
      : Math.round(raw / 100000);
  const { count, trigger } = useCountUp(Math.round(endVal), 1400, 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          trigger();
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger, visible]);

  return (
    <span
      ref={ref}
      className="font-display text-lg font-bold text-foreground tabular-nums"
    >
      {visible ? `₹${count} ${unit}` : formatted}
    </span>
  );
}

// ─── Hover tooltip ────────────────────────────────────────────────────────────

function InsightTooltip({ property }: { property: PropertyListing }) {
  return (
    <div
      className={cn(
        "absolute z-30 top-4 right-4 w-52 rounded-xl border border-accent/30",
        "bg-card/95 backdrop-blur-sm p-3 shadow-xl",
        "opacity-0 scale-95 translate-y-1 group-hover/tooltip:opacity-100",
        "group-hover/tooltip:scale-100 group-hover/tooltip:translate-y-0",
        "transition-all duration-200 pointer-events-none",
      )}
      role="tooltip"
    >
      <p className="text-xs font-semibold text-accent mb-2 tracking-wider uppercase">
        Quick Insights
      </p>
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <Maximize2 size={10} /> Area
          </span>
          <span className="text-foreground font-medium">{property.area}</span>
        </div>
        {property.bedrooms && (
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <BedDouble size={10} /> Beds
            </span>
            <span className="text-foreground font-medium">
              {property.bedrooms} BHK
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Yield</span>
          <span className="text-accent font-bold">{property.annualYield}</span>
        </div>
        <div className="flex justify-between">
          <span>5Y ROI</span>
          <span className="text-secondary font-bold">
            {property.projectedROI}
          </span>
        </div>
        {property.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="inline-block mt-1 mr-1 px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground text-[10px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Property Card ────────────────────────────────────────────────────────────

function PropertyCard({
  property,
  index,
}: { property: PropertyListing; index: number }) {
  const [mode, setMode] = useState<CardMode>("buy");
  const cardRef = useRef<HTMLDivElement>(null);
  const revealRef = useScrollReveal<HTMLDivElement>(0.1, index * 60);

  // 3D tilt effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px) scale(1.01)`;
    };

    const onLeave = () => {
      card.style.transform = "";
      card.style.transition = "transform 0.4s cubic-bezier(0.4,0,0.2,1)";
      setTimeout(() => {
        if (card) card.style.transition = "";
      }, 400);
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const best = isBestForInvestment(property);
  const badge = BADGE_COLORS[property.badge];

  return (
    <div ref={revealRef} className="scroll-reveal">
      <div
        ref={cardRef}
        className="group group/tooltip relative rounded-2xl border border-border bg-card overflow-hidden"
        style={{
          willChange: "transform",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 20px 50px oklch(0 0 0 / 0.5), 0 0 30px oklch(0.75 0.18 195 / 0.2)";
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "oklch(0.75 0.18 195 / 0.45)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "";
          (e.currentTarget as HTMLDivElement).style.borderColor = "";
        }}
        data-ocid={`properties.card.${index + 1}`}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

          {/* Badge */}
          <span
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold border tracking-wider",
              badge,
            )}
          >
            {property.badge}
          </span>

          {/* Best for Investment badge */}
          {best && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/90 text-[10px] font-bold text-background tracking-wide">
              <TrendingUp size={9} /> Best for Investment
            </span>
          )}

          {property.isPreLease && (
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-secondary/90 text-secondary-foreground text-xs font-semibold">
              PRE-LEASE
            </span>
          )}

          {/* Info tooltip trigger */}
          <button
            type="button"
            aria-label="Quick insights"
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-accent transition-smooth group/tooltip-btn"
            data-ocid={`properties.insight_button.${index + 1}`}
          >
            <Info size={13} />
          </button>
          <InsightTooltip property={property} />
        </div>

        {/* Content */}
        <div className="p-5 pb-4">
          <h3 className="font-display text-base font-bold text-foreground mb-1 group-hover:text-accent transition-smooth line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
            <MapPin size={11} className="shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Buy / Lease / Invest toggle */}
          <fieldset
            className="flex gap-1 p-1 rounded-lg bg-muted/40 border border-border mb-4 border-x-0 border-t-0"
            aria-label="View mode"
          >
            {(["buy", "lease", "invest"] as CardMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 py-1 rounded-md text-xs font-semibold capitalize transition-smooth",
                  mode === m
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                data-ocid={`properties.mode_${m}_button.${index + 1}`}
              >
                {m}
              </button>
            ))}
          </fieldset>

          {/* Mode-specific metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-xl bg-muted/30 border border-border">
            {mode === "buy" && (
              <>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wider">
                    Price
                  </p>
                  <AnimatedPrice
                    raw={property.priceRaw}
                    formatted={property.price}
                  />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wider">
                    Annual Yield
                  </p>
                  <p className="font-display text-base font-bold text-gradient-accent flex items-center gap-1">
                    <TrendingUp size={11} />
                    {property.annualYield}
                  </p>
                </div>
              </>
            )}
            {mode === "lease" && (
              <>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wider">
                    Monthly Rent
                  </p>
                  <p className="font-display text-base font-bold text-accent">
                    {getMonthlyRent(property)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wider">
                    Lease Yield
                  </p>
                  <p className="font-display text-base font-bold text-gradient-accent flex items-center gap-1">
                    <TrendingUp size={11} />
                    {property.annualYield}
                  </p>
                </div>
              </>
            )}
            {mode === "invest" && (
              <>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wider">
                    5Y Projected
                  </p>
                  <p className="font-display text-base font-bold text-secondary">
                    {getProjectedValue(property)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wider">
                    ROI
                  </p>
                  <p className="font-display text-base font-bold text-gradient-gold flex items-center gap-1">
                    <TrendingUp size={11} />
                    {property.projectedROI}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer: price label + CTA */}
          <div className="relative overflow-hidden">
            {/* Default state: area + bedrooms */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground group-hover:opacity-0 group-hover:-translate-y-2 transition-all duration-250">
              <span className="flex items-center gap-1">
                <Maximize2 size={10} />
                {property.area}
              </span>
              {property.bedrooms && (
                <span className="flex items-center gap-1">
                  <BedDouble size={10} />
                  {property.bedrooms} BHK
                </span>
              )}
              {property.tags.slice(0, 1).map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 rounded bg-muted/60 text-[10px]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* View Deal — slides in on hover */}
            <div className="absolute inset-0 flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250">
              <a
                href="https://wa.me/917572905655"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold transition-smooth hover:bg-accent/90 hover:shadow-[0_0_16px_oklch(0.75_0.18_195/0.4)]"
                data-ocid={`properties.view_deal_button.${index + 1}`}
              >
                View Deal <ArrowRight size={12} />
              </a>
              <a
                href="tel:+917572905655"
                className="w-9 h-9 rounded-xl bg-muted/60 border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-smooth"
                aria-label="Call about this property"
                data-ocid={`properties.call_button.${index + 1}`}
              >
                <Phone size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Budget Select ─────────────────────────────────────────────────────────────

function BudgetSelect({
  value,
  onChange,
}: {
  value: BudgetFilter;
  onChange: (v: BudgetFilter) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as BudgetFilter)}
        className={cn(
          "appearance-none h-10 pl-4 pr-9 rounded-full text-sm font-medium",
          "border border-border bg-card/60 text-muted-foreground",
          "hover:border-accent/40 hover:text-foreground transition-smooth cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-accent/40",
          value !== "all" && "border-accent/50 text-accent",
        )}
        data-ocid="properties.budget_select"
        aria-label="Budget range filter"
      >
        {BUDGET_OPTIONS.map((o) => (
          <option
            key={o.value}
            value={o.value}
            className="bg-card text-foreground"
          >
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
      />
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export function PropertiesSection() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [budgetFilter, setBudgetFilter] = useState<BudgetFilter>("all");
  const [investFilter, setInvestFilter] = useState<InvestFilter>("all");
  const [loading, setLoading] = useState(true);

  // Skeleton shimmer for 1.2s on mount
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const filtered = properties.filter(
    (p) =>
      (typeFilter === "all" || p.type === typeFilter) &&
      matchesBudget(p, budgetFilter) &&
      matchesInvest(p, investFilter),
  );

  return (
    <SectionWrapper
      id="properties"
      label="Premium Investment Opportunities"
      labelColor="gold"
      title="Explore Vadodara's High-Yield Assets"
      subtitle="Vadodara's real estate market is growing at 14% YoY. Every listing is vetted for investment merit, rental yield, and capital appreciation potential."
      alt
    >
      {/* ── Filter bar ── */}
      <div
        className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10 p-4 rounded-2xl border border-border bg-card/40 backdrop-blur-sm"
        role="toolbar"
        aria-label="Property filters"
      >
        {/* Property type pills */}
        <fieldset
          className="flex flex-wrap gap-2 border-0 p-0 m-0"
          aria-label="Property type"
        >
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setTypeFilter(f.value)}
              className={cn(
                "h-9 px-4 rounded-full text-sm font-medium transition-smooth border",
                typeFilter === f.value
                  ? "bg-secondary/20 text-secondary border-secondary/50 shadow-[0_0_12px_oklch(0.72_0.13_95/0.25)]"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-accent/40 bg-transparent",
              )}
              data-ocid={`properties.type_filter_${f.value}.tab`}
            >
              {f.label}
            </button>
          ))}
        </fieldset>

        <div className="sm:ml-auto flex flex-wrap gap-2 items-center">
          {/* Budget range */}
          <BudgetSelect value={budgetFilter} onChange={setBudgetFilter} />

          {/* Investment type pills */}
          <fieldset
            className="flex gap-1 p-1 rounded-full bg-muted/40 border border-border m-0"
            aria-label="Investment type"
          >
            {INVEST_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setInvestFilter(f.value)}
                className={cn(
                  "h-7 px-3 rounded-full text-xs font-semibold transition-smooth",
                  investFilter === f.value
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                data-ocid={`properties.invest_filter_${f.value}.tab`}
              >
                {f.label}
              </button>
            ))}
          </fieldset>
        </div>
      </div>

      {/* ── Results count ── */}
      {!loading && (
        <p className="text-sm text-muted-foreground mb-5">
          Showing{" "}
          <span className="text-accent font-semibold">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "property" : "properties"}
        </p>
      )}

      {/* ── Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["a", "b", "c"].map((k) => (
            <SkeletonCard key={`sk-${k}`} showImage lines={3} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="properties.empty_state"
        >
          <div className="w-16 h-16 rounded-full bg-muted/40 flex items-center justify-center mb-4 text-muted-foreground">
            <MapPin size={28} />
          </div>
          <p className="text-lg font-semibold text-foreground mb-2">
            No properties match your filters
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Try adjusting budget, type, or investment preference
          </p>
          <GlowButton
            variant="outline"
            size="sm"
            onClick={() => {
              setTypeFilter("all");
              setBudgetFilter("all");
              setInvestFilter("all");
            }}
            data-ocid="properties.clear_filters_button"
          >
            Clear Filters
          </GlowButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      )}

      {/* ── CTA ── */}
      {!loading && filtered.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4 text-sm">
            Need a curated shortlist matching your investment goals?
          </p>
          <GlowButton
            variant="gold"
            size="lg"
            icon={<Phone size={16} />}
            onClick={() => window.open("https://wa.me/917572905655", "_blank")}
            data-ocid="properties.request_shortlist_button"
          >
            Request Custom Portfolio
          </GlowButton>
        </div>
      )}
    </SectionWrapper>
  );
}
