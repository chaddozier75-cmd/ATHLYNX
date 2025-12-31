import express, { Router } from "express";
import serverless from "serverless-http";

// Import your existing server routes
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "ATHLYNX API is running on Netlify Functions" });
});

// VIP Signup endpoint
app.post("/api/vip-signup", async (req, res) => {
  try {
    const { name, email, phone, role, sport, socialMedia } = req.body;
    
    // Generate VIP code
    const vipCode = `VIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // TODO: Save to database
    console.log("VIP Signup:", { name, email, role, sport, vipCode });
    
    // Send welcome package via Twilio (Email + SMS)
    const { sendVIPWelcome } = require("../../server/services/twilioService");
    const { emailSent, smsSent } = await sendVIPWelcome(name, email, phone, vipCode);
    
    res.json({
      success: true,
      message: "VIP signup successful! Check your email and phone for your access code.",
      vipCode: vipCode,
      emailSent,
      smsSent
    });
  } catch (error) {
    console.error("VIP Signup error:", error);
    res.status(500).json({ success: false, error: "Signup failed" });
  }
});

// VIP Code verification
app.post("/api/verify-vip-code", async (req, res) => {
  try {
    const { code } = req.body;
    
    // TODO: Verify code against database
    
    res.json({
      success: true,
      valid: true,
      message: "VIP code verified!"
    });
  } catch (error) {
    console.error("VIP verification error:", error);
    res.status(500).json({ success: false, error: "Verification failed" });
  }
});

// OAuth callback
app.get("/api/oauth/callback", async (req, res) => {
  try {
    const { code } = req.query;
    
    // TODO: Exchange code for token
    // TODO: Create session
    
    res.redirect("/dashboard");
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.redirect("/?error=auth_failed");
  }
});

// User profile
app.get("/api/user/profile", async (req, res) => {
  try {
    // TODO: Get user from session/token
    // TODO: Fetch from database
    
    res.json({
      success: true,
      user: {
        id: "demo",
        name: "Demo User",
        email: "demo@athlynx.ai",
        role: "athlete"
      }
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
});

// Export as Netlify Function
export const handler = serverless(app);
