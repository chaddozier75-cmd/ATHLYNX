/**
 * Stripe Checkout Service
 * Handles creating checkout sessions for subscriptions and one-time purchases
 * 
 * GRACEFUL DEGRADATION: If STRIPE_SECRET_KEY is not set, payment features
 * are disabled but the server continues to run normally.
 */

import Stripe from "stripe";
import { SUBSCRIPTION_TIERS, AI_CREDIT_PACKS, SubscriptionTier, AICreditPack } from "./products";

// Lazy initialization with graceful degradation
let stripeInstance: Stripe | null = null;
let stripeConfigured = false;
let stripeInitAttempted = false;

function initStripe(): void {
  if (stripeInitAttempted) return;
  stripeInitAttempted = true;
  
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey || apiKey.trim() === "") {
    console.warn("[Stripe] STRIPE_SECRET_KEY not configured - payment features disabled");
    stripeConfigured = false;
    return;
  }
  
  try {
    stripeInstance = new Stripe(apiKey, {
      apiVersion: "2025-12-15.clover",
    });
    stripeConfigured = true;
    console.log("[Stripe] Payment system initialized successfully");
  } catch (error) {
    console.error("[Stripe] Failed to initialize:", error);
    stripeConfigured = false;
  }
}

function getStripe(): Stripe {
  initStripe();
  if (!stripeInstance) {
    throw new Error("Payment system is not configured. Please contact support.");
  }
  return stripeInstance;
}

/**
 * Check if Stripe is properly configured and ready
 */
export function isStripeConfigured(): boolean {
  initStripe();
  return stripeConfigured;
}

interface CreateSubscriptionCheckoutParams {
  tier: SubscriptionTier;
  billingPeriod: "monthly" | "annual";
  userId: string;
  userEmail: string;
  userName?: string;
  origin: string;
}

interface CreateCreditCheckoutParams {
  pack: AICreditPack;
  userId: string;
  userEmail: string;
  userName?: string;
  origin: string;
}

/**
 * Create a Stripe checkout session for subscription
 */
export async function createSubscriptionCheckout({
  tier,
  billingPeriod,
  userId,
  userEmail,
  userName,
  origin,
}: CreateSubscriptionCheckoutParams): Promise<{ url: string }> {
  if (!isStripeConfigured()) {
    throw new Error("Payment system is not available. Please try again later.");
  }
  
  const stripe = getStripe();
  const tierConfig = SUBSCRIPTION_TIERS[tier];
  
  if (tier === "free") {
    throw new Error("Free tier does not require payment");
  }

  const price = billingPeriod === "monthly" ? tierConfig.priceMonthly : tierConfig.priceAnnual;
  const interval = billingPeriod === "monthly" ? "month" : "year";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: userEmail,
    client_reference_id: userId,
    allow_promotion_codes: true,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `ATHLYNX ${tierConfig.name} Subscription`,
            description: `${tierConfig.aiCredits === -1 ? "Unlimited" : tierConfig.aiCredits} AI credits per month`,
          },
          unit_amount: price,
          recurring: {
            interval,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: userId,
      customer_email: userEmail,
      customer_name: userName || "",
      tier,
      billing_period: billingPeriod,
      type: "subscription",
    },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&type=subscription`,
    cancel_url: `${origin}/pricing?canceled=true`,
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return { url: session.url };
}

/**
 * Create a Stripe checkout session for AI credit pack
 */
export async function createCreditCheckout({
  pack,
  userId,
  userEmail,
  userName,
  origin,
}: CreateCreditCheckoutParams): Promise<{ url: string }> {
  if (!isStripeConfigured()) {
    throw new Error("Payment system is not available. Please try again later.");
  }
  
  const stripe = getStripe();
  const packConfig = AI_CREDIT_PACKS[pack];

  const totalCredits = packConfig.credits + packConfig.bonusCredits;
  const description = packConfig.bonusCredits > 0 
    ? `${packConfig.credits} credits + ${packConfig.bonusCredits} bonus = ${totalCredits} total`
    : `${packConfig.credits} AI credits`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: userEmail,
    client_reference_id: userId,
    allow_promotion_codes: true,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: packConfig.name,
            description,
          },
          unit_amount: packConfig.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: userId,
      customer_email: userEmail,
      customer_name: userName || "",
      pack,
      credits: totalCredits.toString(),
      type: "ai_credits",
    },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&type=credits`,
    cancel_url: `${origin}/pricing?canceled=true`,
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return { url: session.url };
}

/**
 * Retrieve checkout session details
 */
export async function getCheckoutSession(sessionId: string) {
  if (!isStripeConfigured()) {
    throw new Error("Payment system is not available");
  }
  const stripe = getStripe();
  return stripe.checkout.sessions.retrieve(sessionId);
}

export { getStripe };
