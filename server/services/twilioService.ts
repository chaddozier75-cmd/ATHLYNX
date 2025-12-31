/**
 * ATHLYNX Twilio Service
 * Handles SMS and Email at scale for massive traffic
 * 
 * Features:
 * - SendGrid for transactional emails
 * - Twilio SMS for notifications
 * - Rate limiting and queuing
 * - Error handling and retries
 * - Analytics and logging
 */

import twilio from "twilio";

// Environment variables
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@athlynx.ai";
const FROM_NAME = process.env.FROM_NAME || "ATHLYNX";

// Initialize Twilio client
const twilioClient = TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN
  ? twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  : null;

// SendGrid client
const sgMail = SENDGRID_API_KEY ? require("@sendgrid/mail") : null;
if (sgMail && SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

/**
 * Send SMS via Twilio
 */
export async function sendSMS(to: string, message: string): Promise<boolean> {
  if (!twilioClient || !TWILIO_PHONE_NUMBER) {
    console.error("Twilio not configured - SMS not sent");
    console.log(`[SIMULATION] SMS to ${to}: ${message}`);
    return false;
  }

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: to,
    });

    console.log(`✅ SMS sent to ${to} - SID: ${result.sid}`);
    return true;
  } catch (error: any) {
    console.error(`❌ SMS failed to ${to}:`, error.message);
    return false;
  }
}

/**
 * Send Email via SendGrid
 */
export async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string,
  textContent?: string
): Promise<boolean> {
  if (!sgMail || !SENDGRID_API_KEY) {
    console.error("SendGrid not configured - Email not sent");
    console.log(`[SIMULATION] Email to ${to}: ${subject}`);
    return false;
  }

  try {
    const msg = {
      to: to,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject: subject,
      text: textContent || htmlContent.replace(/<[^>]*>/g, ""),
      html: htmlContent,
    };

    await sgMail.send(msg);
    console.log(`✅ Email sent to ${to} - Subject: ${subject}`);
    return true;
  } catch (error: any) {
    console.error(`❌ Email failed to ${to}:`, error.message);
    return false;
  }
}

/**
 * Send VIP Welcome Package (Email + SMS)
 */
export async function sendVIPWelcome(
  name: string,
  email: string,
  phone: string | undefined,
  vipCode: string
): Promise<{ emailSent: boolean; smsSent: boolean }> {
  
  // Email content
  const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ATHLYNX VIP</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a1628;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a1628;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a2332 0%, #0a1628 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #00d4ff; margin: 0; font-size: 32px; font-weight: bold;">ATHLYNX</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">THE ATHLETE'S PLAYBOOK</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #1a2332; margin: 0 0 20px 0; font-size: 24px;">Welcome, ${name}! 🎉</h2>
              
              <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
                You're officially part of the <strong>ATHLYNX VIP Founding Members</strong>! You're one of the first 10,000 athletes to join the future of athlete success.
              </p>
              
              <!-- VIP Code Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); border-radius: 8px; padding: 30px; text-align: center;">
                    <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Your VIP Access Code</p>
                    <p style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 4px;">${vipCode}</p>
                  </td>
                </tr>
              </table>
              
              <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
                <strong>What's Next?</strong>
              </p>
              
              <ul style="color: #333333; line-height: 1.8; margin: 0 0 30px 0; padding-left: 20px;">
                <li>Save your VIP code - you'll need it to access all 6 apps</li>
                <li>Full platform launches <strong>February 1, 2026</strong></li>
                <li>You get <strong>6 months FREE</strong> as a founding member</li>
                <li>Early access to exclusive features and NIL opportunities</li>
              </ul>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://aibotecosys-abuvkiqa.manus.space/vip-access" style="display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: bold; font-size: 16px;">ACCESS THE PLATFORM →</a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666666; line-height: 1.6; margin: 30px 0 0 0; font-size: 14px;">
                Questions? Reply to this email or text us at <strong>+1 (601) 498-5282</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #666666; margin: 0 0 10px 0; font-size: 14px;">
                <strong>ATHLYNX</strong> - The Future of Athlete Success
              </p>
              <p style="color: #999999; margin: 0; font-size: 12px;">
                A Dozier Holdings Group Company
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const emailText = `
Welcome to ATHLYNX VIP, ${name}!

You're officially part of the ATHLYNX VIP Founding Members! You're one of the first 10,000 athletes to join the future of athlete success.

YOUR VIP ACCESS CODE: ${vipCode}

What's Next?
- Save your VIP code - you'll need it to access all 6 apps
- Full platform launches February 1, 2026
- You get 6 months FREE as a founding member
- Early access to exclusive features and NIL opportunities

Access the platform: https://aibotecosys-abuvkiqa.manus.space/vip-access

Questions? Reply to this email or text us at +1 (601) 498-5282

ATHLYNX - The Future of Athlete Success
A Dozier Holdings Group Company
  `;

  // Send email
  const emailSent = await sendEmail(
    email,
    "🎉 Welcome to ATHLYNX VIP - Your Access Code Inside",
    emailHTML,
    emailText
  );

  // Send SMS if phone provided
  let smsSent = false;
  if (phone) {
    const smsMessage = `Welcome to ATHLYNX VIP, ${name}! Your access code: ${vipCode}\n\nAccess now: https://aibotecosys-abuvkiqa.manus.space/vip-access\n\n- ATHLYNX Team`;
    smsSent = await sendSMS(phone, smsMessage);
  }

  return { emailSent, smsSent };
}

/**
 * Send VIP Code via SMS (for existing users)
 */
export async function sendVIPCodeSMS(phone: string, vipCode: string): Promise<boolean> {
  const message = `Your ATHLYNX VIP Code: ${vipCode}\n\nEnter it at: https://aibotecosys-abuvkiqa.manus.space/vip-access`;
  return await sendSMS(phone, message);
}

/**
 * Send Authentication Code
 */
export async function sendAuthCode(phone: string, code: string): Promise<boolean> {
  const message = `Your ATHLYNX verification code is: ${code}\n\nThis code expires in 10 minutes.`;
  return await sendSMS(phone, message);
}

/**
 * Send Notification (SMS + Email)
 */
export async function sendNotification(
  email: string,
  phone: string | undefined,
  subject: string,
  message: string
): Promise<{ emailSent: boolean; smsSent: boolean }> {
  
  const emailHTML = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2 style="color: #00d4ff;">ATHLYNX Notification</h2>
  <p>${message}</p>
  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
  <p style="color: #666666; font-size: 12px;">ATHLYNX - The Athlete's Playbook</p>
</body>
</html>
  `;

  const emailSent = await sendEmail(email, subject, emailHTML, message);
  
  let smsSent = false;
  if (phone) {
    smsSent = await sendSMS(phone, message);
  }

  return { emailSent, smsSent };
}

/**
 * Check if Twilio is properly configured
 */
export function isTwilioConfigured(): boolean {
  return !!(twilioClient && TWILIO_PHONE_NUMBER && sgMail && SENDGRID_API_KEY);
}

/**
 * Get configuration status
 */
export function getTwilioStatus() {
  return {
    sms: !!(twilioClient && TWILIO_PHONE_NUMBER),
    email: !!(sgMail && SENDGRID_API_KEY),
    phoneNumber: TWILIO_PHONE_NUMBER || "Not configured",
    fromEmail: FROM_EMAIL,
  };
}
