import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { insuranceCategories } from "@/data/insurance";
import type { InsuranceCategory, InsuranceTier } from "@/data/insurance";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Building,
  Building2,
  Car,
  Check,
  Heart,
  HeartPulse,
  Home,
  MessageCircle,
  Shield,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const WHATSAPP = "https://wa.me/917572905655";

// Icon map for morphing — default + hover states
const ICON_MAP: Record<string, React.ElementType> = {
  shield: Shield,
  "shield-check": ShieldCheck,
  heart: Heart,
  "heart-pulse": HeartPulse,
  home: Home,
  "building-2": Building2,
  briefcase: Briefcase,
  building: Building,
  car: Car,
  zap: Zap,
};

function MorphIcon({
  defaultIcon,
  hoverIcon,
  hovered,
}: {
  defaultIcon: string;
  hoverIcon: string;
  hovered: boolean;
}) {
  const DefaultIcon = ICON_MAP[defaultIcon];
  const HoverIcon = ICON_MAP[hoverIcon];
  return (
    <span className="relative w-6 h-6 inline-flex items-center justify-center">
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.6 : 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {DefaultIcon && <DefaultIcon size={22} />}
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-accent"
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {HoverIcon && <HoverIcon size={22} />}
      </motion.span>
    </span>
  );
}

function TierBadge({ tier }: { tier: InsuranceTier["tier"] }) {
  const styles: Record<string, string> = {
    Basic: "bg-muted/60 text-muted-foreground border-border",
    Standard: "bg-accent/15 text-accent border-accent/40",
    Premium: "bg-secondary/15 text-secondary border-secondary/40",
  };
  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-bold border tracking-wide uppercase",
        styles[tier],
      )}
    >
      {tier}
    </span>
  );
}

function PlanCard({
  plan,
  index,
  categoryId,
}: {
  plan: InsuranceTier;
  index: number;
  categoryId: string;
}) {
  const isRecommended = !!plan.featured;
  const cardRef = useRef<HTMLDivElement>(null);

  function handleQuote() {
    const msg = encodeURIComponent(
      `Hi, I'm interested in the ${plan.planName} (${plan.tier}) plan under ${categoryId} insurance. Coverage: ${plan.coverageAmount}, Premium: ${plan.monthlyPremium}. Please send details.`,
    );
    window.open(`${WHATSAPP}?text=${msg}`, "_blank");
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className={cn(
        "relative flex flex-col rounded-2xl border transition-smooth",
        "bg-card/70 backdrop-blur-sm overflow-hidden",
        isRecommended
          ? "border-accent/60 shadow-[0_0_28px_oklch(0.75_0.18_195/0.22)]"
          : "border-border hover:border-border/80",
        "card-hover",
      )}
      data-ocid={`insurance.plan_card.${index + 1}`}
    >
      {/* Recommended highlight stripe */}
      {isRecommended && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
      )}

      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-accent text-accent-foreground shadow-[0_0_12px_oklch(0.75_0.18_195/0.5)]">
            Recommended
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Tier badge + plan name */}
        <div className="mb-5">
          <TierBadge tier={plan.tier} />
          <h3
            className={cn(
              "mt-2 font-display text-lg font-bold leading-tight",
              isRecommended ? "text-accent" : "text-foreground",
            )}
          >
            {plan.planName}
          </h3>
        </div>

        {/* Pricing */}
        <div
          className={cn(
            "rounded-xl p-4 mb-5 border",
            isRecommended
              ? "bg-accent/10 border-accent/20"
              : "bg-muted/30 border-border",
          )}
        >
          <div className="flex items-end gap-1 mb-1">
            <span className="font-display text-2xl font-black text-gradient-gold leading-none">
              {plan.monthlyPremium}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs text-muted-foreground">Coverage:</span>
            <span
              className={cn(
                "text-sm font-bold",
                isRecommended ? "text-accent" : "text-foreground",
              )}
            >
              {plan.coverageAmount}
            </span>
          </div>
        </div>

        {/* Benefits comparison */}
        <ul className="space-y-2.5 flex-1 mb-6">
          {plan.benefits.map((benefit) => (
            <li key={benefit.label} className="flex items-center gap-2.5">
              {benefit.included ? (
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Check size={10} strokeWidth={3} className="text-secondary" />
                </span>
              ) : (
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-muted/60 flex items-center justify-center">
                  <X
                    size={10}
                    strokeWidth={3}
                    className="text-muted-foreground/50"
                  />
                </span>
              )}
              <span
                className={cn(
                  "text-xs leading-snug",
                  benefit.included
                    ? "text-foreground/85"
                    : "text-muted-foreground/50 line-through decoration-muted-foreground/30",
                )}
              >
                {benefit.label}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          type="button"
          onClick={handleQuote}
          data-ocid={`insurance.get_quote_button.${index + 1}`}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-smooth",
            isRecommended
              ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_16px_oklch(0.75_0.18_195/0.35)]"
              : "bg-muted/50 text-foreground border border-border hover:bg-muted hover:border-accent/30",
          )}
        >
          <MessageCircle size={15} />
          Get Quote on WhatsApp
        </button>
      </div>
    </motion.div>
  );
}

function CategoryTab({
  cat,
  isActive,
  onClick,
}: {
  cat: InsuranceCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid={`insurance.tab_${cat.id}`}
      className={cn(
        "relative flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-smooth border whitespace-nowrap",
        isActive
          ? "bg-accent/15 text-accent border-accent/50 shadow-[0_0_12px_oklch(0.75_0.18_195/0.2)]"
          : "bg-card/60 text-muted-foreground border-border hover:text-foreground hover:border-accent/30 hover:bg-card/80",
      )}
    >
      {isActive && (
        <motion.span
          layoutId="active-tab-bg"
          className="absolute inset-0 rounded-xl bg-accent/10 border border-accent/40"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className={cn("relative z-10", isActive ? "text-accent" : "")}>
        <MorphIcon
          defaultIcon={cat.iconDefault}
          hoverIcon={cat.iconHover}
          hovered={hovered || isActive}
        />
      </span>
      <span className="relative z-10">{cat.label}</span>
    </button>
  );
}

export function InsuranceSection() {
  const [activeId, setActiveId] = useState<InsuranceCategory["id"]>("life");
  const [prevId, setPrevId] = useState<InsuranceCategory["id"] | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const activeCategory =
    insuranceCategories.find((c) => c.id === activeId) ??
    insuranceCategories[0];

  function handleTabChange(id: InsuranceCategory["id"]) {
    setPrevId(activeId);
    setActiveId(id);
  }

  // Scroll active tab into view on mobile
  useEffect(() => {
    const el = tabsRef.current?.querySelector(
      `[data-ocid="insurance.tab_${activeId}"]`,
    );
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeId]);

  const slideDir = (() => {
    if (!prevId) return 1;
    const prevIdx = insuranceCategories.findIndex((c) => c.id === prevId);
    const currIdx = insuranceCategories.findIndex((c) => c.id === activeId);
    return currIdx > prevIdx ? 1 : -1;
  })();

  return (
    <SectionWrapper
      id="insurance"
      alt
      label="Complete Protection Solutions"
      labelColor="cyan"
      title="Comprehensive Coverage For Every Need"
      subtitle="From protecting your family to securing your business assets — Seven Corporation connects you with India's top-rated insurers for tailored, cost-effective coverage."
      data-ocid="insurance.section"
    >
      {/* Tabs — horizontal scroll on mobile */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Insurance category tabs"
        data-ocid="insurance.tabs"
        className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {insuranceCategories.map((cat) => (
          <CategoryTab
            key={cat.id}
            cat={cat}
            isActive={activeId === cat.id}
            onClick={() => handleTabChange(cat.id)}
          />
        ))}
      </div>

      {/* Category subtitle */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`subtitle-${activeId}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground text-sm mb-8 max-w-xl"
        >
          {activeCategory.subtitle}
        </motion.p>
      </AnimatePresence>

      {/* Plan cards with fade+slide transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, x: slideDir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -slideDir * 40 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {activeCategory.tiers.map((tier, i) => (
            <PlanCard
              key={`${activeId}-${tier.tier}`}
              plan={tier}
              index={i}
              categoryId={activeCategory.label}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border border-border bg-card/50 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-base font-bold text-foreground mb-1">
            Not sure which plan suits you?
          </p>
          <p className="text-sm text-muted-foreground max-w-sm">
            Our advisors compare 20+ insurers and find the best coverage at the
            lowest premium — completely free.
          </p>
        </div>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="insurance.compare_plans_button"
          className="flex-shrink-0 flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth shadow-[0_0_20px_oklch(0.75_0.18_195/0.4)] animate-[pulse-glow_2s_ease-in-out_infinite]"
        >
          <MessageCircle size={16} />
          Compare Plans for Free
        </a>
      </div>
    </SectionWrapper>
  );
}
