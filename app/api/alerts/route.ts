import { NextResponse } from "next/server";
import { addAlert, getAlerts } from "@/lib/store";
import { sendAlertSms } from "@/lib/twilio";

interface AlertWebhookBody {
  timestamp?: string;
  cameraName?: string;
  nodeId?: string;
  nodeName?: string;
  imageUrl?: string;
  severity?: "human" | "vehicle" | "unknown";
}

/**
 * GET /api/alerts
 * Returns all stored alerts, newest first. Used by the dashboard's
 * Recent Alerts feed.
 */
export async function GET() {
  return NextResponse.json(…(truncated)