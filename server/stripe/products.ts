/**
 * Stripe Products Configuration
 * Defines all subscription tiers and AI credit packs
 */

export const SUBSCRIPTION_TIERS = {
  free: {
    name: "Free",
    priceMonthly: 0,
    priceAnnual: 0,
    aiCredits: 5,
    features: [
      "Basic athlete profile",
      "View NIL opportunities",
      "5 AI credits/month",
      "Community access",
      "Basic stats tracking",
    ],
  },
  pro: {
    name: "Pro",
    priceMonthly: 999, // $9.99 in cents
    priceAnnual: 9900, // $99.00 in cents (17% off)
    aiCredits: 50,
    features: [
      "Everything in Free",
      "Advanced profile customization",
      "50 AI credits/month",
      "Video highlight reels",
      "Recruiting email templates",
      "Priority support",
      "Training plans",
    ],
  },
  elite: {
    name: "Elite",
    priceMonthly: 2999, // $29.99 in cents
    priceAnnual: 29900, // $299.00 in cents (17% off)
    aiCredits: 200,
    features: [
      "Everything in Pro",
      "200 AI credits/month",
      "Personal AI coach bot",
      "Auto highlight generation",
      "Scout network access",
      "NIL deal matching",
      "Unlimited messaging",
      "Analytics dashboard",
      "College coach contacts",
    ],
  },
  enterprise: {
    name: "Enterprise",
    priceMonthly: 9999, // $99.99 in cents
    priceAnnual: 99900, // $999.00 in cents (17% off)
    aiCredits: -1, // Unlimited
    features: [
      "Everything in Elite",
      "Unlimited AI credits",
      "Team management",
      "White-label options",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "Bulk athlete onboarding",
      "Advanced analytics",
      "Priority feature requests",
    ],
  },
} as const;

export const AI_CREDIT_PACKS = {
  pack100: {
    name: "100 AI Credits",
    credits: 100,
    bonusCredits: 0,
    price: 999, // $9.99 in cents
  },
  pack500: {
    name: "500 AI Credits",
    credits: 500,
    bonusCredits: 50,
    price: 3999, // $39.99 in cents
  },
  pack1000: {
    name: "1,000 AI Credits",
    credits: 1000,
    bonusCredits: 150,
    price: 6999, // $69.99 in cents
  },
  pack5000: {
    name: "5,000 AI Credits",
    credits: 5000,
    bonusCredits: 1000,
    price: 29999, // $299.99 in cents
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;
export type AICreditPack = keyof typeof AI_CREDIT_PACKS;
