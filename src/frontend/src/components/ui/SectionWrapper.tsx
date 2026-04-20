import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  delay?: number;
  label?: string;
  labelColor?: "cyan" | "gold";
  title?: string;
  subtitle?: string;
  centered?: boolean;
  alt?: boolean;
}

export function SectionWrapper({
  id,
  className,
  innerClassName,
  children,
  delay = 0,
  label,
  labelColor = "cyan",
  title,
  subtitle,
  centered = false,
  alt = false,
}: SectionWrapperProps) {
  const ref = useScrollReveal<HTMLElement>(0.1, delay);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "py-20 md:py-28 relative overflow-hidden",
        alt && "bg-section-alt",
        className,
      )}
    >
      <div className={cn("container mx-auto px-4 max-w-7xl", innerClassName)}>
        {(label || title || subtitle) && (
          <div className={cn("mb-12 md:mb-16", centered && "text-center")}>
            {label && (
              <span
                className={cn(
                  "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4",
                  labelColor === "cyan" ? "text-accent" : "text-secondary",
                )}
              >
                <span
                  className={cn(
                    "h-px w-8",
                    labelColor === "cyan" ? "bg-accent" : "bg-secondary",
                  )}
                />
                {label}
                <span
                  className={cn(
                    "h-px w-8",
                    labelColor === "cyan" ? "bg-accent" : "bg-secondary",
                  )}
                />
              </span>
            )}
            {title && (
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
