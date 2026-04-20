import { GlowButton } from "@/components/ui/GlowButton";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";
import { ArrowRight, Building2, Shield, Star, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─── Light Streak ─────────────────────────────────────────── */
function LightStreak({
  top,
  delay,
  color,
  width,
}: {
  top: string;
  delay: string;
  color: string;
  width: string;
}) {
  return (
    <div
      className="absolute left-0 right-0 overflow-hidden pointer-events-none"
      style={{ top }}
      aria-hidden="true"
    >
      <div
        style={{
          height: "1px",
          width,
          background: `linear-gradient(90deg, transparent 0%, ${color} 40%, ${color} 60%, transparent 100%)`,
          animation: "light-streak 4s ease-in-out infinite",
          animationDelay: delay,
          willChange: "transform",
        }}
      />
    </div>
  );
}

/* ─── Particles ─────────────────────────────────────────────── */
const PARTICLES = [
  {
    id: "p1",
    x: "15%",
    y: "20%",
    size: 2,
    delay: "0s",
    dur: "3.5s",
    gold: false,
  },
  {
    id: "p2",
    x: "80%",
    y: "15%",
    size: 3,
    delay: "0.8s",
    dur: "4s",
    gold: false,
  },
  {
    id: "p3",
    x: "55%",
    y: "70%",
    size: 2,
    delay: "1.2s",
    dur: "3s",
    gold: true,
  },
  {
    id: "p4",
    x: "30%",
    y: "85%",
    size: 1.5,
    delay: "0.4s",
    dur: "5s",
    gold: false,
  },
  {
    id: "p5",
    x: "70%",
    y: "45%",
    size: 2.5,
    delay: "2s",
    dur: "3.8s",
    gold: true,
  },
  {
    id: "p6",
    x: "10%",
    y: "60%",
    size: 2,
    delay: "1.5s",
    dur: "4.2s",
    gold: false,
  },
  {
    id: "p7",
    x: "90%",
    y: "75%",
    size: 1.5,
    delay: "0.2s",
    dur: "3.3s",
    gold: true,
  },
  {
    id: "p8",
    x: "45%",
    y: "10%",
    size: 2,
    delay: "2.5s",
    dur: "4.5s",
    gold: false,
  },
] as const;

/* ─── Animated Headline words ────────────────────────────────── */
const HEADLINE_WORDS = [
  { text: "Build", gold: false },
  { text: "Assets.", gold: false },
  { text: "Secure", gold: false },
  { text: "Futures.", gold: true },
] as const;

/* ─── Stats ──────────────────────────────────────────────────── */
const STATS = [
  { end: 200, suffix: "+", label: "Properties", icon: <Building2 size={16} /> },
  { end: 49, suffix: "+", label: "Reviews", icon: <Star size={16} /> },
  { end: 5, suffix: ".0", label: "Rating", icon: <TrendingUp size={16} /> },
] as const;

/* ─── Main Component ─────────────────────────────────────────── */
export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden pt-20"
      data-ocid="hero.section"
    >
      {/* ── Deep background ── */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse at 10% 40%, oklch(0.22 0.10 302 / 0.7) 0%, transparent 55%), radial-gradient(ellipse at 90% 20%, oklch(0.15 0.08 220 / 0.5) 0%, transparent 50%), oklch(0.07 0.01 285)",
        }}
        aria-hidden="true"
      />

      {/* ── Particles ── */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: `${p.size * 2}px`,
              height: `${p.size * 2}px`,
              background: p.gold
                ? "oklch(0.72 0.13 95 / 0.7)"
                : "oklch(0.75 0.18 195 / 0.6)",
              animation: `float ${p.dur} ease-in-out infinite`,
              animationDelay: p.delay,
              boxShadow: p.gold
                ? "0 0 6px oklch(0.72 0.13 95 / 0.5)"
                : "0 0 6px oklch(0.75 0.18 195 / 0.5)",
            }}
          />
        ))}
      </div>

      {/* ── Light Streaks ── */}
      <LightStreak
        top="30%"
        delay="0.5s"
        color="oklch(0.75 0.18 195 / 0.5)"
        width="60%"
      />
      <LightStreak
        top="55%"
        delay="2s"
        color="oklch(0.72 0.13 95 / 0.35)"
        width="45%"
      />
      <LightStreak
        top="78%"
        delay="3.5s"
        color="oklch(0.75 0.18 195 / 0.3)"
        width="35%"
      />

      {/* ── SPLIT PANELS ── */}
      <div className="flex flex-col md:flex-row flex-1 relative">
        {/* ── LEFT PANEL: Real Estate ── */}
        <div
          className={cn(
            "relative flex-1 min-h-[50vh] md:min-h-0 overflow-hidden transition-all duration-1000 ease-out",
            mounted
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0",
          )}
          style={{ transitionDelay: "0ms" }}
          aria-label="Real estate visual"
        >
          {/* Photo */}
          <img
            src="/assets/generated/hero-realestate.dim_900x700.jpg"
            alt="Premium property in Vadodara"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Overlay gradient → right bleed */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.08 0.01 285 / 0.15) 0%, transparent 40%, oklch(0.08 0.02 285 / 0.75) 100%), linear-gradient(0deg, oklch(0.07 0.01 285 / 0.9) 0%, transparent 55%)",
            }}
          />
          {/* Investment badge bottom-left */}
          <div
            className={cn(
              "absolute bottom-8 left-6 flex gap-3 transition-all duration-700 ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
            style={{ transitionDelay: "700ms" }}
          >
            <div className="backdrop-blur-md bg-card/80 border border-border rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-xs text-muted-foreground mb-0.5 font-body">
                Est. Annual Yield
              </p>
              <p className="font-display text-xl font-bold text-gradient-accent">
                9.2%
              </p>
            </div>
            <div className="backdrop-blur-md bg-card/80 border border-border rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-xs text-muted-foreground mb-0.5 font-body">
                ROI Over 5 Yrs
              </p>
              <p className="font-display text-xl font-bold text-secondary">
                24%
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Insurance/Financial ── */}
        <div
          className={cn(
            "relative flex-1 min-h-[50vh] md:min-h-0 overflow-hidden transition-all duration-1000 ease-out",
            mounted
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0",
          )}
          style={{ transitionDelay: "0ms" }}
          aria-label="Insurance financial visual"
        >
          {/* Photo */}
          <img
            src="/assets/generated/hero-insurance.dim_900x700.jpg"
            alt="Insurance and investment solutions"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Overlay gradient → left bleed */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.07 0.01 285 / 0.75) 0%, transparent 40%, oklch(0.09 0.02 280 / 0.2) 100%), linear-gradient(0deg, oklch(0.07 0.01 285 / 0.9) 0%, transparent 55%)",
            }}
          />
          {/* Insurance badge bottom-right */}
          <div
            className={cn(
              "absolute bottom-8 right-6 flex gap-3 transition-all duration-700 ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
            style={{ transitionDelay: "750ms" }}
          >
            <div className="backdrop-blur-md bg-card/80 border border-border rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary/20">
                <Shield size={16} className="text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-body">
                  Coverage
                </p>
                <p className="font-display text-sm font-bold text-foreground">
                  ₹1 Crore+
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CENTER OVERLAY: Content ── */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
            {/* Badge */}
            <div
              className={cn(
                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-card/60 backdrop-blur-sm text-accent text-xs font-semibold tracking-widest uppercase mb-6 pointer-events-auto transition-all duration-700 ease-out",
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
              style={{ transitionDelay: "400ms" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Vadodara&apos;s Premier Asset Advisors
            </div>

            {/* Animated headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pointer-events-none">
              {HEADLINE_WORDS.map((word, i) => (
                <span
                  key={word.text}
                  className={cn(
                    "inline-block transition-all duration-700 ease-out",
                    word.gold
                      ? "text-gradient-gold"
                      : "text-foreground drop-shadow-[0_2px_16px_oklch(0.75_0.18_195/0.3)]",
                    mounted
                      ? "opacity-100 translate-y-0 blur-0"
                      : "opacity-0 translate-y-6 blur-sm",
                  )}
                  style={{ transitionDelay: `${500 + i * 120}ms` }}
                >
                  {word.text}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p
              className={cn(
                "text-muted-foreground text-base md:text-lg font-body mb-3 transition-all duration-700 ease-out pointer-events-none",
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
              style={{ transitionDelay: "900ms" }}
            >
              Property + Insurance Solutions Under One Roof
            </p>

            {/* Divider accent */}
            <div
              className={cn(
                "h-px w-32 mb-8 transition-all duration-700 ease-out",
                mounted ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
              )}
              style={{
                transitionDelay: "1000ms",
                background:
                  "linear-gradient(90deg, transparent, oklch(0.75 0.18 195 / 0.8), transparent)",
              }}
            />

            {/* CTAs */}
            <div
              className={cn(
                "flex flex-wrap gap-4 justify-center pointer-events-auto mb-10 transition-all duration-700 ease-out",
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
              style={{ transitionDelay: "1050ms" }}
            >
              <GlowButton
                variant="cyan"
                size="lg"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                onClick={() => scrollTo("properties")}
                data-ocid="hero.explore_properties_button"
              >
                Explore Properties
              </GlowButton>
              <GlowButton
                variant="outline"
                size="lg"
                icon={<Shield size={18} />}
                iconPosition="left"
                onClick={() => scrollTo("insurance")}
                data-ocid="hero.get_insurance_button"
              >
                Get Insurance
              </GlowButton>
            </div>

            {/* Floating stats row */}
            <div
              className={cn(
                "flex flex-wrap gap-6 sm:gap-10 justify-center pointer-events-auto transition-all duration-700 ease-out",
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
              style={{ transitionDelay: "1150ms" }}
            >
              {STATS.map((stat, i) => (
                <StatPill
                  key={stat.label}
                  end={stat.end}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={stat.icon}
                  delay={i * 120}
                  visible={mounted}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className={cn(
          "absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-20 transition-all duration-700",
          mounted ? "opacity-100" : "opacity-0",
        )}
        style={{ transitionDelay: "1400ms" }}
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
    </section>
  );
}

/* ─── Stat Pill ──────────────────────────────────────────────── */
function StatPill({
  end,
  suffix,
  label,
  icon,
  delay,
  visible,
}: {
  end: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
  visible: boolean;
}) {
  const { count, trigger } = useCountUp(end, 1800);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!visible || triggered.current) return;
    triggered.current = true;
    const t = setTimeout(trigger, 1200 + delay);
    return () => clearTimeout(t);
  }, [visible, trigger, delay]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-0.5 backdrop-blur-sm bg-card/50 border border-border/60 rounded-2xl px-5 py-3 min-w-[90px]"
      style={{
        boxShadow:
          "0 4px 16px oklch(0 0 0 / 0.3), 0 0 12px oklch(0.75 0.18 195 / 0.08)",
      }}
    >
      <span className="text-accent mb-0.5">{icon}</span>
      <span className="font-display text-2xl font-bold tabular-nums text-gradient-accent">
        {count}
        {suffix}
      </span>
      <span className="text-[11px] text-muted-foreground tracking-wide font-body">
        {label}
      </span>
    </div>
  );
}
