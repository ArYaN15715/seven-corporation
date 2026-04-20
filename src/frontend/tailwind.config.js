import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        cyan: {
          DEFAULT: "oklch(0.75 0.18 195)",
          light: "oklch(0.85 0.14 195)",
          dark: "oklch(0.55 0.16 195)",
        },
        gold: {
          DEFAULT: "oklch(0.72 0.13 95)",
          light: "oklch(0.82 0.12 85)",
          dark: "oklch(0.55 0.12 95)",
        },
        midnight: {
          DEFAULT: "oklch(0.27 0.12 302)",
          deep: "oklch(0.12 0.04 302)",
          surface: "oklch(0.15 0.04 302)",
        },
      },
      fontFamily: {
        display: ["Sora", "var(--font-display)", "sans-serif"],
        body: ["Inter", "var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        subtle: "0 2px 8px oklch(0 0 0 / 0.12)",
        elevated: "0 8px 24px oklch(0 0 0 / 0.35)",
        deep: "0 16px 48px oklch(0 0 0 / 0.5)",
        "glow-cyan": "0 0 24px oklch(0.75 0.18 195 / 0.3), 0 0 48px oklch(0.75 0.18 195 / 0.15)",
        "glow-gold": "0 0 20px oklch(0.72 0.13 95 / 0.4), 0 0 40px oklch(0.72 0.13 95 / 0.15)",
        "glow-strong": "0 0 32px oklch(0.75 0.18 195 / 0.5), 0 0 64px oklch(0.75 0.18 195 / 0.25)",
        "card-dark": "0 4px 16px oklch(0 0 0 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { "box-shadow": "0 0 20px oklch(0.75 0.18 195 / 0.4)" },
          "50%": { "box-shadow": "0 0 32px oklch(0.75 0.18 195 / 0.6), 0 0 60px oklch(0.75 0.18 195 / 0.2)" },
        },
        "fade-slide-up": {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "shimmer": {
          "0%": { "background-position": "200% 0" },
          "100%": { "background-position": "-200% 0" },
        },
        "light-streak": {
          "0%": { transform: "translateX(-100%) rotate(25deg)", opacity: "0" },
          "50%": { opacity: "0.6" },
          "100%": { transform: "translateX(200%) rotate(25deg)", opacity: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "ping-slow": {
          "75%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-slide-up": "fade-slide-up 0.65s cubic-bezier(0.4, 0, 0.2, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        "shimmer": "shimmer 1.8s infinite",
        "light-streak": "light-streak 3s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
