/**
 * Twilio SendGrid Email Integration for ATHLYNX
 * Sends transactional emails for VIP signups, confirmations, and notifications
 */

interface TwilioEmailConfig {
  apiKey: string;
  fromEmail: string;
  fromName: string;
}

interface EmailPayload {
  to: string[];
  subject: string;
  htmlBody: string;
  textBody: string;
}

/**
 * Send email via Twilio SendGrid API
 */
export async function sendEmailViaTwilio(payload: EmailPayload): Promise<boolean> {
  try {
    // Get Twilio configuration from environment
    const config: TwilioEmailConfig = {
      apiKey: process.env.SENDGRID_API_KEY || process.env.TWILIO_SENDGRID_API_KEY || "",
      fromEmail: process.env.FROM_EMAIL || "noreply@athlynx.ai",
      fromName: process.env.FROM_NAME || "ATHLYNX Team",
    };

    if (!config.apiKey) {
      console.error("[Twilio Email] Missing SendGrid API key");
      return false;
    }

    // Prepare SendGrid API request
    const sendGridPayload = {
      personalizations: payload.to.map((email) => ({
        to: [{ email }],
        subject: payload.subject,
      })),
      from: {
        email: config.fromEmail,
        name: config.fromName,
      },
      content: [
        {
          type: "text/plain",
          value: payload.textBody,
        },
        {
          type: "text/html",
          value: payload.htmlBody,
        },
      ],
    };

    // Send via SendGrid API
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendGridPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Twilio Email] SendGrid API error:", response.status, errorText);
      return false;
    }

    console.log(`[Twilio Email] Successfully sent email to ${payload.to.length} recipient(s)`);
    return true;
  } catch (error) {
    console.error("[Twilio Email] Failed to send email:", error);
    return false;
  }
}

/**
 * Send SMS via Twilio (for VIP code delivery)
 */
export async function sendSMSViaTwilio(to: string, message: string): Promise<boolean> {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    const authToken = process.env.TWILIO_AUTH_TOKEN || "";
    const fromPhone = process.env.TWILIO_PHONE_NUMBER || "";

    if (!accountSid || !authToken || !fromPhone) {
      console.error("[Twilio SMS] Missing Twilio credentials");
      return false;
    }

    // Twilio SMS API
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: to,
          From: fromPhone,
          Body: message,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Twilio SMS] API error:", response.status, errorText);
      return false;
    }

    console.log(`[Twilio SMS] Successfully sent SMS to ${to}`);
    return true;
  } catch (error) {
    console.error("[Twilio SMS] Failed to send SMS:", error);
    return false;
  }
}
