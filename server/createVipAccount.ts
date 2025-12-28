import { upsertUser } from "./db";
import { initializeSports, createEarlyAccessSignup, grantEarlyAccess } from "./earlyAccess";
import { sendConfirmationToMultipleEmails } from "./emailService";
import type { InsertUser } from "../drizzle/schema";

/**
 * Create VIP account for Chad A. Dozier Sr and send confirmation emails
 */
async function createChadVipAccount() {
  console.log("[VIP Setup] Starting VIP account creation for Chad A. Dozier Sr...");

  try {
    // Step 1: Initialize sports data
    console.log("[VIP Setup] Initializing sports data...");
    await initializeSports();

    // Step 2: Create Chad's user account
    console.log("[VIP Setup] Creating user account...");
    const chadUser: InsertUser = {
      openId: "chad-dozier-founder-vip",
      name: "Chad A. Dozier Sr",
      email: "cdozier@dozierholdingsgroup.com",
      loginMethod: "athlynx",
      role: "admin", // VIP Founder status
      lastSignedIn: new Date(),
    };

    await upsertUser(chadUser);
    console.log("[VIP Setup] User account created successfully");

    // Step 3: Get the user ID (we need to query it back)
    const { getUserByOpenId } = await import("./db");
    const createdUser = await getUserByOpenId("chad-dozier-founder-vip");

    if (!createdUser) {
      throw new Error("Failed to retrieve created user");
    }

    console.log("[VIP Setup] User ID:", createdUser.id);

    // Step 4: Create early access signup (assuming Football as primary sport)
    // Sport ID 1 should be Football based on our initialization order
    console.log("[VIP Setup] Creating early access signup...");
    await createEarlyAccessSignup({
      userId: createdUser.id,
      sportId: 1, // Football 🏈
      isVip: "yes",
      accessGranted: "yes",
      confirmationEmailSent: "no",
      signupDate: new Date(),
      accessGrantedDate: new Date(),
    });

    // Step 5: Grant early access
    console.log("[VIP Setup] Granting early access...");
    await grantEarlyAccess(createdUser.id);

    // Step 6: Send confirmation emails to both addresses
    console.log("[VIP Setup] Sending confirmation emails...");
    const emailSent = await sendConfirmationToMultipleEmails(
      createdUser,
      ["chaddozier75@gmail.com"], // Additional email
      1 // Football sport ID
    );

    if (emailSent) {
      console.log("[VIP Setup] ✅ Confirmation emails sent successfully!");
      console.log("[VIP Setup] Emails sent to:");
      console.log("  - cdozier@dozierholdingsgroup.com");
      console.log("  - chaddozier75@gmail.com");
    } else {
      console.log("[VIP Setup] ⚠️  Email sending failed, but account was created");
    }

    console.log("\n[VIP Setup] ✅ VIP Account Setup Complete!");
    console.log("═══════════════════════════════════════════════════");
    console.log("Account Details:");
    console.log(`  Name: ${createdUser.name}`);
    console.log(`  Email: ${createdUser.email}`);
    console.log(`  Role: ${createdUser.role} (VIP Founder)`);
    console.log(`  Username: Cdozier14`);
    console.log(`  Sport: Football 🏈`);
    console.log(`  VIP Status: YES`);
    console.log(`  Early Access: GRANTED`);
    console.log("═══════════════════════════════════════════════════\n");

    return createdUser;
  } catch (error) {
    console.error("[VIP Setup] ❌ Failed to create VIP account:", error);
    throw error;
  }
}

// Run the setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createChadVipAccount()
    .then(() => {
      console.log("[VIP Setup] Script completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("[VIP Setup] Script failed:", error);
      process.exit(1);
    });
}

export { createChadVipAccount };
