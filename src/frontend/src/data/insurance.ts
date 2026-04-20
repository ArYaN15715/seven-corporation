export interface InsuranceTier {
  tier: "Basic" | "Standard" | "Premium";
  planName: string;
  monthlyPremium: string;
  coverageAmount: string;
  featured?: boolean;
  benefits: Array<{ label: string; included: boolean }>;
}

export interface InsuranceCategory {
  id: "life" | "health" | "property" | "business" | "vehicle";
  label: string;
  subtitle: string;
  iconDefault: string;
  iconHover: string;
  tiers: [InsuranceTier, InsuranceTier, InsuranceTier];
}

export const insuranceCategories: InsuranceCategory[] = [
  {
    id: "life",
    label: "Life Insurance",
    subtitle: "Secure your family's future with comprehensive life cover",
    iconDefault: "shield",
    iconHover: "shield-check",
    tiers: [
      {
        tier: "Basic",
        planName: "Life Secure",
        monthlyPremium: "₹800/mo",
        coverageAmount: "₹25 Lakh",
        benefits: [
          { label: "Term life cover", included: true },
          { label: "Accidental death benefit", included: true },
          { label: "Tax benefit u/s 80C", included: true },
          { label: "Critical illness rider", included: false },
          { label: "Premium waiver on disability", included: false },
          { label: "Bonus additions every 5 yrs", included: false },
        ],
      },
      {
        tier: "Standard",
        planName: "Life Shield Plus",
        monthlyPremium: "₹1,200/mo",
        coverageAmount: "₹1 Crore",
        featured: true,
        benefits: [
          { label: "Term life cover", included: true },
          { label: "Accidental death benefit", included: true },
          { label: "Tax benefit u/s 80C", included: true },
          { label: "Critical illness rider", included: true },
          { label: "Premium waiver on disability", included: true },
          { label: "Bonus additions every 5 yrs", included: false },
        ],
      },
      {
        tier: "Premium",
        planName: "Life Fortress Elite",
        monthlyPremium: "₹2,400/mo",
        coverageAmount: "₹2 Crore",
        benefits: [
          { label: "Term life cover", included: true },
          { label: "Accidental death benefit", included: true },
          { label: "Tax benefit u/s 80C", included: true },
          { label: "Critical illness rider", included: true },
          { label: "Premium waiver on disability", included: true },
          { label: "Bonus additions every 5 yrs", included: true },
        ],
      },
    ],
  },
  {
    id: "health",
    label: "Health Insurance",
    subtitle: "Cashless hospitalisation across 5000+ network hospitals",
    iconDefault: "heart",
    iconHover: "heart-pulse",
    tiers: [
      {
        tier: "Basic",
        planName: "Health Care",
        monthlyPremium: "₹550/mo",
        coverageAmount: "₹3 Lakh",
        benefits: [
          { label: "Cashless hospitalisation", included: true },
          { label: "Pre & post hospitalisation", included: true },
          { label: "Day care procedures", included: true },
          { label: "OPD & dental coverage", included: false },
          { label: "Critical illness cover", included: false },
          { label: "Annual health check-up", included: false },
        ],
      },
      {
        tier: "Standard",
        planName: "Health Fortress",
        monthlyPremium: "₹850/mo",
        coverageAmount: "₹10 Lakh",
        featured: true,
        benefits: [
          { label: "Cashless hospitalisation", included: true },
          { label: "Pre & post hospitalisation", included: true },
          { label: "Day care procedures", included: true },
          { label: "OPD & dental coverage", included: true },
          { label: "Critical illness cover", included: true },
          { label: "Annual health check-up", included: false },
        ],
      },
      {
        tier: "Premium",
        planName: "Health Fortress Ultra",
        monthlyPremium: "₹1,600/mo",
        coverageAmount: "₹25 Lakh",
        benefits: [
          { label: "Cashless hospitalisation", included: true },
          { label: "Pre & post hospitalisation", included: true },
          { label: "Day care procedures", included: true },
          { label: "OPD & dental coverage", included: true },
          { label: "Critical illness cover", included: true },
          { label: "Annual health check-up", included: true },
        ],
      },
    ],
  },
  {
    id: "property",
    label: "Property Insurance",
    subtitle: "Protect your real estate assets from fire, theft & disasters",
    iconDefault: "home",
    iconHover: "building-2",
    tiers: [
      {
        tier: "Basic",
        planName: "Property Shield",
        monthlyPremium: "₹200/mo",
        coverageAmount: "₹20 Lakh",
        benefits: [
          { label: "Fire & allied perils", included: true },
          { label: "Burglary protection", included: true },
          { label: "Natural disaster cover", included: false },
          { label: "Contents coverage", included: false },
          { label: "Alternate accommodation", included: false },
          { label: "Public liability cover", included: false },
        ],
      },
      {
        tier: "Standard",
        planName: "Property Guard Elite",
        monthlyPremium: "₹350/mo",
        coverageAmount: "₹50 Lakh",
        featured: true,
        benefits: [
          { label: "Fire & allied perils", included: true },
          { label: "Burglary protection", included: true },
          { label: "Natural disaster cover", included: true },
          { label: "Contents coverage", included: true },
          { label: "Alternate accommodation", included: false },
          { label: "Public liability cover", included: false },
        ],
      },
      {
        tier: "Premium",
        planName: "Property Fortress",
        monthlyPremium: "₹600/mo",
        coverageAmount: "₹1.5 Crore",
        benefits: [
          { label: "Fire & allied perils", included: true },
          { label: "Burglary protection", included: true },
          { label: "Natural disaster cover", included: true },
          { label: "Contents coverage", included: true },
          { label: "Alternate accommodation", included: true },
          { label: "Public liability cover", included: true },
        ],
      },
    ],
  },
  {
    id: "business",
    label: "Business Insurance",
    subtitle: "Comprehensive commercial protection for your enterprise",
    iconDefault: "briefcase",
    iconHover: "building",
    tiers: [
      {
        tier: "Basic",
        planName: "Biz Starter Pack",
        monthlyPremium: "₹1,500/mo",
        coverageAmount: "₹50 Lakh",
        benefits: [
          { label: "Commercial property cover", included: true },
          { label: "Stock & inventory cover", included: true },
          { label: "Employee liability", included: false },
          { label: "Business interruption", included: false },
          { label: "Cyber liability cover", included: false },
          { label: "Director liability (D&O)", included: false },
        ],
      },
      {
        tier: "Standard",
        planName: "Biz Shield Pro",
        monthlyPremium: "₹3,000/mo",
        coverageAmount: "₹2 Crore",
        featured: true,
        benefits: [
          { label: "Commercial property cover", included: true },
          { label: "Stock & inventory cover", included: true },
          { label: "Employee liability", included: true },
          { label: "Business interruption", included: true },
          { label: "Cyber liability cover", included: false },
          { label: "Director liability (D&O)", included: false },
        ],
      },
      {
        tier: "Premium",
        planName: "Biz Fortress Elite",
        monthlyPremium: "₹6,500/mo",
        coverageAmount: "₹5 Crore",
        benefits: [
          { label: "Commercial property cover", included: true },
          { label: "Stock & inventory cover", included: true },
          { label: "Employee liability", included: true },
          { label: "Business interruption", included: true },
          { label: "Cyber liability cover", included: true },
          { label: "Director liability (D&O)", included: true },
        ],
      },
    ],
  },
  {
    id: "vehicle",
    label: "Vehicle Insurance",
    subtitle: "Comprehensive motor protection with zero-depreciation add-ons",
    iconDefault: "car",
    iconHover: "zap",
    tiers: [
      {
        tier: "Basic",
        planName: "Drive Safe",
        monthlyPremium: "₹350/mo",
        coverageAmount: "As per IDV",
        benefits: [
          { label: "Third-party liability", included: true },
          { label: "Own damage cover", included: true },
          { label: "24/7 roadside assist", included: false },
          { label: "Zero depreciation", included: false },
          { label: "Consumables cover", included: false },
          { label: "Engine protection", included: false },
        ],
      },
      {
        tier: "Standard",
        planName: "Drive Shield Plus",
        monthlyPremium: "₹600/mo",
        coverageAmount: "As per IDV",
        featured: true,
        benefits: [
          { label: "Third-party liability", included: true },
          { label: "Own damage cover", included: true },
          { label: "24/7 roadside assist", included: true },
          { label: "Zero depreciation", included: true },
          { label: "Consumables cover", included: false },
          { label: "Engine protection", included: false },
        ],
      },
      {
        tier: "Premium",
        planName: "Drive Fortress Elite",
        monthlyPremium: "₹950/mo",
        coverageAmount: "As per IDV",
        benefits: [
          { label: "Third-party liability", included: true },
          { label: "Own damage cover", included: true },
          { label: "24/7 roadside assist", included: true },
          { label: "Zero depreciation", included: true },
          { label: "Consumables cover", included: true },
          { label: "Engine protection", included: true },
        ],
      },
    ],
  },
];

// Legacy export for backwards compatibility
import type { InsurancePlan } from "@/types";

export const insurancePlans: InsurancePlan[] = [
  {
    id: "ins1",
    name: "Life Shield Plus",
    category: "life",
    provider: "LIC Partner",
    premium: "₹1,200/mo",
    coverage: "₹1 Cr",
    highlights: [
      "Whole life coverage till age 99",
      "Tax benefit under 80C & 10D",
      "Critical illness rider",
      "Premium waiver on disability",
    ],
    badge: "POPULAR",
    icon: "🛡️",
  },
  {
    id: "ins2",
    name: "Health Fortress",
    category: "health",
    provider: "Star Health",
    premium: "₹850/mo",
    coverage: "₹10 Lakh",
    highlights: [
      "Cashless at 5000+ hospitals",
      "OPD & dental included",
      "Critical illness cover",
      "Annual health check-up",
    ],
    badge: "BEST VALUE",
    icon: "❤️",
  },
  {
    id: "ins3",
    name: "Property Guard Elite",
    category: "property",
    provider: "HDFC Ergo",
    premium: "₹350/mo",
    coverage: "₹50 Lakh",
    highlights: [
      "Structure & contents covered",
      "Natural disaster protection",
      "Burglary & fire damage",
      "Alternate accommodation cover",
    ],
    icon: "🏠",
  },
  {
    id: "ins4",
    name: "Vehicle Shield Comprehensive",
    category: "vehicle",
    provider: "Bajaj Allianz",
    premium: "₹600/mo",
    coverage: "As per IDV",
    highlights: [
      "Zero depreciation cover",
      "24/7 roadside assistance",
      "Cashless garage network",
      "Engine protection add-on",
    ],
    badge: "TOP RATED",
    icon: "🚗",
  },
];
