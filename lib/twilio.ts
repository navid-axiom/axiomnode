import twilio from "twilio";

interface SendAlertSmsInput {
  cameraName: string;
  nodeName: string;
  dashboardUrl: string;
}

/**
 * Sends the "human detected" SMS via Twilio. Reads credentials from
 * environment variables so nothing sensitive is hardcoded:
 *
 *   TWILIO_ACCOUNT_SID
 *   TWILIO_AUTH_TOKEN
 *   TWILIO_FROM_NUMBER      (Twilio number, e.g. +15551234567)
 *   CLIENT_ALERT_PHONE      (destination number for this client)
 *   NEXT_PUBLIC_DASHBOARD_URL
 *
 * If Twilio env vars ar…(truncated)