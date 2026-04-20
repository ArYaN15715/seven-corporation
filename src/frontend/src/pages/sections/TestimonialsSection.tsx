import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => `star-${i}`).map((key, i) => (
        <svg
          key={key}
          viewBox="0 0 20 20"
          fill={i < rating ? "#D4AF37" : "none"}
          stroke={i < rating ? "#D4AF37" : "oklch(0.4 0 0)"}
          strokeWidth="1"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

type ServiceType = "property" | "insurance" | "both";

function ServiceBadge({ service }: { service: ServiceType }) {
  const map: Record<ServiceType, { label: string; cls: string }> = {
    property: {
      label: "Property",
      cls: "text-accent border-accent/30 bg-accent/10",
    },
    insurance: {
      label: "Insurance",
      cls: "text-secondary border-secondary/30 bg-secondary/10",
    },
    both: {
      label: "Property + Insurance",
      cls: "text-foreground/60 border-border bg-card/40",
    },
  };
  const { label, cls } = map[service];
  return (
    <span
      className={cn(
        "text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border",
        cls,
      )}
    >
      {label}
    </span>
  );
}

const ROTATIONS = [3, -2, 2, -3, 2, -2];

function TestimonialCard({
  item,
  isActive,
  exitDir,
  idx,
}: {
  item: (typeof testimonials)[0];
  isActive: boolean;
  exitDir: "left" | "right";
  idx: number;
}) {
  const rot = ROTATIONS[idx % ROTATIONS.length];

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col p-8 md:p-10 rounded-3xl border",
        "backdrop-blur-md",
        "shadow-[0_20px_56px_oklch(0_0_0_/_0.5),inset_0_1px_0_oklch(1_0_0_/_0.05)]",
      )}
      style={{
        background:
          "linear-gradient(145deg, oklch(0.14 0.025 300 / 0.8) 0%, oklch(0.1 0.01 290 / 0.6) 100%)",
        borderColor: isActive
          ? "oklch(0.75 0.18 195 / 0.25)"
          : "oklch(0.2 0.02 302 / 0.5)",
        transform: isActive
          ? "translateX(0) rotate(0deg) scale(1)"
          : exitDir === "left"
            ? `translateX(40px) rotate(${rot * 0.6}deg) scale(0.93)`
            : `translateX(-40px) rotate(${rot * -0.6}deg) scale(0.93)`,
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        transition:
          "transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease, border-color 0.3s ease",
      }}
      aria-hidden={!isActive}
    >
      <Quote
        className="w-8 h-8 mb-4 flex-shrink-0"
        style={{ color: "oklch(0.75 0.18 195 / 0.3)" }}
        aria-hidden="true"
      />

      <p
        className="font-body text-base md:text-lg leading-relaxed flex-1 mb-8"
        style={{ color: "oklch(0.88 0 0)" }}
      >
        &ldquo;{item.text}&rdquo;
      </p>

      <div
        className="flex items-center justify-between gap-4 flex-wrap mt-auto pt-5 border-t"
        style={{ borderColor: "oklch(0.2 0.02 302 / 0.6)" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold font-display flex-shrink-0 text-foreground"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.27 0.12 302), oklch(0.75 0.18 195 / 0.5))",
              border: "1.5px solid oklch(0.75 0.18 195 / 0.35)",
            }}
            aria-hidden="true"
          >
            {item.avatar}
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm text-foreground truncate">
              {item.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {item.location}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <StarRating rating={item.rating} />
          <ServiceBadge service={item.service} />
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [exitDir, setExitDir] = useState<"left" | "right">("left");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = testimonials.length;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setExitDir("left");
      setActive((a) => (a + 1) % total);
    }, 5000);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = useCallback(
    (next: number, dir: "left" | "right") => {
      setExitDir(dir);
      setActive((next + total) % total);
      startTimer();
    },
    [total, startTimer],
  );

  const handlePrev = () => goTo(active - 1, "right");
  const handleNext = () => goTo(active + 1, "left");

  return (
    <SectionWrapper
      id="testimonials"
      alt
      centered
      label="Client Stories"
      labelColor="gold"
      title="What Our Clients Say"
      subtitle="Real experiences from families and investors who trusted Seven Corporation with their most important financial decisions."
      data-ocid="testimonials.section"
    >
      <div className="max-w-3xl mx-auto">
        {/* Card stage */}
        <div
          className="relative h-[360px] sm:h-[320px] mb-8"
          aria-label="Testimonials carousel"
          aria-live="polite"
          data-ocid="testimonials.carousel"
        >
          {testimonials.map((item, i) => (
            <TestimonialCard
              key={item.id}
              item={item}
              idx={i}
              isActive={i === active}
              exitDir={exitDir}
            />
          ))}
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-border bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-card transition-smooth"
            aria-label="Previous testimonial"
            data-ocid="testimonials.prev_button"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div
            className="flex items-center gap-2"
            data-ocid="testimonials.dots"
          >
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => goTo(i, i > active ? "left" : "right")}
                aria-label={`Go to testimonial ${i + 1}`}
                data-ocid={`testimonials.dot.${i + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === active
                    ? "w-6 h-2 bg-accent shadow-[0_0_8px_oklch(0.75_0.18_195_/_0.55)]"
                    : "w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/70",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-border bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-card transition-smooth"
            aria-label="Next testimonial"
            data-ocid="testimonials.next_button"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Investment type label */}
        {testimonials[active].investmentType && (
          <p
            className="text-center text-xs text-accent/70 mt-5 tracking-[0.2em] uppercase font-medium"
            data-ocid="testimonials.investment_label"
          >
            {testimonials[active].investmentType}
          </p>
        )}
      </div>
    </SectionWrapper>
  );
}
