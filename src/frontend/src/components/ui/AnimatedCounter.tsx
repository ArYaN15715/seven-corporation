import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  labelClassName?: string;
  label?: string;
  icon?: React.ReactNode;
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
  labelClassName,
  label,
  icon,
}: AnimatedCounterProps) {
  const { count, trigger } = useCountUp(end, duration);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trigger();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      {icon && <span className="text-accent text-2xl mb-1">{icon}</span>}
      <span
        className={cn(
          "font-display text-4xl md:text-5xl font-bold text-gradient-accent tabular-nums",
          className,
        )}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>
      {label && (
        <span
          className={cn(
            "text-sm text-muted-foreground font-body tracking-wide text-center",
            labelClassName,
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
