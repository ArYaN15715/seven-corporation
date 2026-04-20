import type { ReactNode } from "react";

export interface PropertyListing {
  id: string;
  title: string;
  location: string;
  price: string;
  priceRaw: number;
  type: "residential" | "commercial" | "land" | "lease";
  badge: "EST. YIELD" | "GOLD" | "ROI" | "HOT" | "NEW";
  annualYield: string;
  projectedROI: string;
  area: string;
  bedrooms?: number;
  image: string;
  tags: string[];
  isPreLease?: boolean;
  description: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  category: "life" | "health" | "property" | "vehicle" | "investment";
  provider: string;
  premium: string;
  coverage: string;
  highlights: string[];
  badge?: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: "property" | "insurance" | "both";
  avatar: string;
  investmentType?: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat: string;
  statLabel: string;
  color: "cyan" | "gold" | "primary";
  href: string;
}

export interface TrustStat {
  value: number;
  suffix: string;
  label: string;
  icon: ReactNode;
}
