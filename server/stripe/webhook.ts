/**
 * Stripe Webhook Handler
 * Processes incoming webhook events from Stripe
 * 
 * GRACEFUL DEGRADATION: If Stripe is not configured, webhooks return
 * a 503 Service Unavailable instead of crashing the server.
 */

import { Request, Response } from "express";
import Stripe from "stripe";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

// Lazy initialization with graceful degradation
let stripeInstance: Stripe | null = null;
let stripeConfigured = false;
let stripeInitAttempted = false;

function initStripe(): void {
  if (stripeInitAttempted) return;
  stripeInitAttempted = true;
  
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey || apiKey.trim() === "") {
    console.warn("[Stripe Webhook] STRIPE_SECRET_KEY not configured - webhooks disabled");
    stripeConfigured = false;
    return;
  }
  
  try {
    stripeInstance = new Stripe(apiKey, {
      apiVersion: "2025-12-15.clover",
    });
    stripeConfigured = true;
  } catch (error) {
    console.error("[Stripe Webhook] Failed to initialize:", error);
    stripeConfigured = false;
  }
}

function getStripe(): Stripe | null {
  initStripe();
  return stripeInstance;
}

export async function handleStripeWebhook(req: Request, res: Response) {
  // Check if Stripe is configured
  const stripe = getStripe();
  if (!stripe) {
    console.warn("[Webhook] Stripe not configured - ignoring webhook");
    return res.status(503).json({ error: "Payment system not configured" });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || webhookSecret.trim() === "") {
    console.warn("[Webhook] STRIPE_WEBHOOK_SECRET not configured");
    return res.status(503).json({ error: "Webhook not configured" });
  }

  const sig = req.headers["stripe-signature"];
  if (!sig) {
    console.error("[Webhook] No signature found");
    return res.status(400).json({ error: "No signature" });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("[Webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({ verified: true });
  }

  console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error(`[Webhook] Error processing ${event.type}:`, error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {};
  const type = metadata.type;
  const userId = metadata.user_id;

  console.log(`[Webhook] Checkout complete - Type: ${type}, User: ${userId}`);

  if (type === "subscription") {
    console.log(`[Webhook] Subscription checkout complete for user ${userId}`);
  } else if (type === "ai_credits") {
    const credits = parseInt(metadata.credits || "0", 10);
    console.log(`[Webhook] Adding ${credits} AI credits to user ${userId}`);
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;
  console.log(`[Webhook] Subscription ${subscription.id} updated - Status: ${status}`);
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  console.log(`[Webhook] Subscription ${subscription.id} canceled`);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log(`[Webhook] Invoice ${invoice.id} paid - Amount: $${(invoice.amount_paid / 100).toFixed(2)}`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`[Webhook] Payment failed for invoice ${invoice.id}`);
}
