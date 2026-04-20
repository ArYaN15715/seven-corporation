import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type GlowVariant = "cyan" | "gold" | "outline" | "ghost" | "danger";
type GlowSize = "sm" | "md" | "lg" | "xl";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlowVariant;
  size?: GlowSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  glow?: boolean;
}

const variantClasses: Record<GlowVariant, string> = {
  cyan: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-cyan animate-pulse-glow font-semibold",
  gold: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow-gold font-semibold",
  outline:
    "bg-transparent border border-accent/50 text-accent hover:border-accent hover:bg-accent/10 glow-accent-border font-medium",
  ghost:
    "bg-transparent text-foreground/80 hover:text-foreground hover:bg-muted/50 font-medium",
  danger:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90 font-medium",
};

const sizeClasses: Record<GlowSize, string> = {
  sm: "h-8 px-4 text-sm rounded-md gap-1.5",
  md: "h-10 px-6 text-sm rounded-lg gap-2",
  lg: "h-12 px-8 text-base rounded-xl gap-2",
  xl: "h-14 px-10 text-lg rounded-xl gap-3",
};

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  (
    {
      variant = "cyan",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      glow = true,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        type="button"
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center transition-smooth cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          glow && variant === "cyan" && "hover:shadow-glow-strong",
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          icon &&
          iconPosition === "left" && <span className="shrink-0">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === "right" && (
          <span className="shrink-0">{icon}</span>
        )}
      </button>
    );
  },
);

GlowButton.displayName = "GlowButton";
