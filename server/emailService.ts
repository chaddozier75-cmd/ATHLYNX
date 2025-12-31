import { invokeLLM } from "./_core/llm";
import { getSportById } from "./earlyAccess";
import type { User, Sport } from "../drizzle/schema";
import { sendEmailViaTwilio } from "./twilioEmail";

/**
 * Email service for sending automated confirmation emails with AI-generated content
 */

interface EmailData {
  to: string[];
  subject: string;
  htmlBody: string;
  textBody: string;
}

/**
 * Generate personalized welcome email content using AI
 */
async function generateWelcomeEmailContent(user: User, sport?: Sport): Promise<{ html: string; text: string }> {
  const sportEmoji = sport?.emoji || "🏆";
  const sportName = sport?.name || "your sport";

  const prompt = `Generate a warm, exciting welcome email for a new Athlynx early access user. 

User Details:
- Name: ${user.name || "Athlete"}
- Sport: ${sportName} ${sportEmoji}
- Email: ${user.email}
- Role: ${user.role === "admin" ? "VIP Founder" : "Early Access Beta User"}

The email should:
1. Welcome them to Athlynx NIL Portal
2. Mention their sport specifically with the emoji ${sportEmoji}
3. Highlight the key features (Athlete Playbook, Transfer Portal, NIL Marketplace, Messenger)
4. Explain this is early VIP access
5. Include a call-to-action to log in and complete their profile
6. Be enthusiastic but professional
7. Keep it under 200 words

Format as HTML with proper styling. Use a modern, athletic theme with the primary color #2563eb (blue).`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are an email copywriter for Athlynx, a premium NIL platform for student athletes. Write engaging, professional emails that excite athletes about their opportunities.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    const htmlContent = typeof content === 'string' ? content : '';

    // Generate plain text version
    const textContent = htmlContent
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();

    return {
      html: htmlContent,
      text: textContent,
    };
  } catch (error) {
    console.error("[Email Service] Failed to generate AI email content:", error);

    // Fallback to template
    const fallbackHtml = generateFallbackWelcomeEmail(user, sport);
    const fallbackText = fallbackHtml.replace(/<[^>]*>/g, "").trim();

    return {
      html: fallbackHtml,
      text: fallbackText,
    };
  }
}

/**
 * Fallback welcome email template
 */
function generateFallbackWelcomeEmail(user: User, sport?: Sport): string {
  const sportEmoji = sport?.emoji || "🏆";
  const sportName = sport?.name || "your sport";
  const userName = user.name || "Athlete";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Athlynx!</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 32px;">🏆 Welcome to Athlynx!</h1>
  </div>
  
  <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #2563eb; margin-top: 0;">Hey ${userName}! ${sportEmoji}</h2>
    
    <p style="font-size: 16px; color: #374151;">
      Congratulations! You've been granted <strong>early VIP access</strong> to Athlynx, the all-in-one platform for ${sportName} athletes like you to amplify your career and maximize your NIL opportunities.
    </p>
    
    <h3 style="color: #2563eb; margin-top: 30px;">What's Inside:</h3>
    <ul style="list-style: none; padding: 0;">
      <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
        <strong>📚 The Athlete Playbook</strong> - Boost your recruiting presence and media profile
      </li>
      <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
        <strong>🔄 Transfer Portal</strong> - Navigate your pathway to better opportunities
      </li>
      <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
        <strong>💰 NIL Marketplace</strong> - Discover and apply for endorsement deals
      </li>
      <li style="padding: 10px 0;">
        <strong>💬 Athlete Messenger</strong> - Connect with coaches, athletes, and brands
      </li>
    </ul>
    
    <div style="text-align: center; margin: 40px 0 20px 0;">
      <a href="https://athlynx.ai" style="background: #2563eb; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
        Get Started Now →
      </a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      Your athletic career, amplified. Let's make it happen! ${sportEmoji}
    </p>
    
    <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
      <strong>The Athlynx Team</strong><br>
      Dozier Holdings Group<br>
      <a href="mailto:cdozier@dozierholdingsgroup.com" style="color: #2563eb;">cdozier@dozierholdingsgroup.com</a>
    </p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Send welcome/confirmation email to new early access user
 */
export async function sendEarlyAccessConfirmationEmail(user: User, sportId?: number): Promise<boolean> {
  try {
    // Get sport details if provided
    let sport: Sport | undefined;
    if (sportId) {
      sport = await getSportById(sportId);
    }

    // Generate email content with AI
    const { html, text } = await generateWelcomeEmailContent(user, sport);

    const sportEmoji = sport?.emoji || "🏆";
    const emailData: EmailData = {
      to: [user.email || ""],
      subject: `${sportEmoji} Welcome to Athlynx - Your Early VIP Access is Ready!`,
      htmlBody: html,
      textBody: text,
    };

    // Send email via Twilio SendGrid
    console.log("[Email Service] Sending confirmation email via Twilio:");
    console.log("To:", emailData.to);
    console.log("Subject:", emailData.subject);

    const emailSent = await sendEmailViaTwilio(emailData);
    
    if (!emailSent) {
      console.error("[Email Service] Failed to send email via Twilio");
      return false;
    }

    console.log("[Email Service] ✅ Email sent successfully via Twilio!");
    return true;
  } catch (error) {
    console.error("[Email Service] Failed to send confirmation email:", error);
    return false;
  }
}

/**
 * Send confirmation email to multiple addresses
 */
export async function sendConfirmationToMultipleEmails(
  user: User,
  additionalEmails: string[],
  sportId?: number
): Promise<boolean> {
  try {
    // Get sport details if provided
    let sport: Sport | undefined;
    if (sportId) {
      sport = await getSportById(sportId);
    }

    // Generate email content with AI
    const { html, text } = await generateWelcomeEmailContent(user, sport);

    const sportEmoji = sport?.emoji || "🏆";
    const allEmails = [user.email, ...additionalEmails].filter((email): email is string => !!email);

    const emailData: EmailData = {
      to: allEmails,
      subject: `${sportEmoji} Welcome to Athlynx - Your Early VIP Access is Ready!`,
      htmlBody: html,
      textBody: text,
    };

    // Send email via Twilio SendGrid
    console.log("[Email Service] Sending confirmation email to multiple addresses via Twilio:");
    console.log("To:", emailData.to);
    console.log("Subject:", emailData.subject);

    const emailSent = await sendEmailViaTwilio(emailData);
    
    if (!emailSent) {
      console.error("[Email Service] Failed to send emails via Twilio");
      return false;
    }

    console.log("[Email Service] ✅ Emails sent successfully via Twilio to all recipients!");
    return true;
  } catch (error) {
    console.error("[Email Service] Failed to send confirmation emails:", error);
    return false;
  }
}
