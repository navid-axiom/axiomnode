import { Alert } from "@/types";
import { mockAlerts } from "@/lib/mock-data";

/**
 * In-memory alert store for the V1 MVP.
 *
 * This is intentionally isolated behind a small function API
 * (getAlerts / addAlert / acknowledgeAlert) so it can be swapped for
 * Firestore or Supabase later without touching the API route or the
 * frontend. Resets on server restart — replace with a real DB before
 * production traffic hits the webhook.
 *
 * --- Firestore swap sketch ---
 *   import { getFirestor…(truncated)