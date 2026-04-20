import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";
import type { TrustStat } from "@/types";
import { Award, CheckCircle, Star, TrendingUp } from "lucide-react";

const stats: (TrustStat & { icon: React.ReactNode; isRating?: boolean })[] = [
  {
    value: 5,
    suffix: ".0",
    label: "Google Rating",
    icon: <Star className="w-6 h-6" fill="currentColor" />,
    isRating: true,
  },
  {
    value: 49,
    suffix: "+",
    label: "Verified Reviews",
    icon: <CheckCircle className="w-6 h-6" />,
  },
  {
    value: 200,
    suffix: "+",
    label: "Properties Closed",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    value: 10,
    suffix: "+",
    label: "Years Experience",
    icon: <Award className="w-6 h-6" />,
  },
];

const badges = [
  { label: "RERA Registered", emoji: "🏛️" },
  { label: "ISO Certified", emoji: "✅" },
  { label: "Award Winner 2024", emoji: "🏆" },
];

function GoldStars({ count = 5 }: { count?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }, (_, i) => `star-${i}`).map((key) => (
        <svg
          key={key}
          viewBox="0 0 20 20"
          fill="#D4AF37"
          className="w-5 h-5 drop-shadow-[0_0_5px_rgba(212,175,55,0.55)]"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  return (
    <div
      className="reveal-child group relative flex flex-col items-center gap-3 p-8 rounded-2xl border border-border bg-card/60 backdrop-blur-sm card-hover overflow-hidden"
      data-ocid={`trust.stat.${index + 1}`}
    >
      {/* Hover glow overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl",
          stat.isRating
            ? "bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.09),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.18_195_/_0.07),transparent_70%)]",
        )}
        aria-hidden="true"
      />

      {/* Icon */}
      <span
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-xl",
          stat.isRating
            ? "bg-[rgba(212,175,55,0.12)] text-[#D4AF37]"
            : "bg-accent/10 text-accent",
        )}
      >
        {stat.icon}
      </span>

      {/* Numeric value */}
      {stat.isRating ? (
        <span
          className="font-display text-5xl font-bold tabular-nums"
          style={{ color: "#D4AF37" }}
        >
          5.0
        </span>
      ) : (
        <AnimatedCounter
          end={stat.value}
          suffix={stat.suffix}
          duration={2200}
          className="text-gradient-accent"
        />
      )}

      {/* Gold stars only for rating card */}
      {stat.isRating && <GoldStars count={5} />}

      {/* Label */}
      <p className="text-sm text-muted-foreground font-body tracking-wide text-center">
        {stat.label}
      </p>
    </div>
  );
}

export function TrustSection() {
  return (
    <SectionWrapper
      id="trust"
      centered
      label="Proven Track Record"
      labelColor="gold"
      title="Trusted by Families & Investors"
      subtitle="Our numbers speak for themselves. Every rating, review, and deal is a testament to our commitment to your financial success."
      data-ocid="trust.section"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* Divider with label */}
      <div className="flex items-center gap-4 mb-10 justify-center">
        <span className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-border to-transparent" />
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold whitespace-nowrap">
          Certifications & Recognition
        </span>
        <span className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent via-border to-transparent" />
      </div>

      {/* Trust Badges */}
      <div
        className="flex flex-wrap items-center justify-center gap-4"
        data-ocid="trust.badges"
      >
        {badges.map((badge, i) => (
          <div
            key={badge.label}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm font-medium text-foreground/80 transition-smooth hover:border-accent/40 hover:text-foreground hover:shadow-[0_0_16px_oklch(0.75_0.18_195_/_0.12)]"
            data-ocid={`trust.badge.${i + 1}`}
          >
            <span aria-hidden="true">{badge.emoji}</span>
            {badge.label}
          </div>
        ))}
      </div>

      {/* Vision quote */}
      <div className="mt-16 relative p-8 md:p-12 rounded-2xl border border-accent/20 bg-card overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.75 0.18 195 / 0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <blockquote className="text-center">
          <p className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-relaxed mb-6">
            "We don't just sell properties or policies.
            <br className="hidden md:block" />
            We build{" "}
            <span className="text-gradient-gold">
              generational wealth strategies
            </span>{" "}
            for our clients."
          </p>
          <footer className="text-muted-foreground text-sm">
            — Seven Corporation Leadership Team, Vadodara
          </footer>
        </blockquote>
      </div>
    </SectionWrapper>
  );
}
