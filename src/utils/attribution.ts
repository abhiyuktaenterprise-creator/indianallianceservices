/**
 * Utility for capturing, persisting, and retrieving UTM and Meta ad attribution parameters.
 * Supports Meta Ads (fbclid), Google Ads (gclid), and standard UTM parameters.
 */

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  landing_url?: string;
  referrer?: string;
  captured_at?: string;
}

const STORAGE_KEY = "ias_ad_attribution";

/**
 * Parses current URL query parameters and caches them in sessionStorage.
 * If no parameters exist in URL, retrieves any previously saved session attribution.
 */
export function captureAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get("utm_source") || undefined;
    const utm_medium = urlParams.get("utm_medium") || undefined;
    const utm_campaign = urlParams.get("utm_campaign") || undefined;
    const utm_content = urlParams.get("utm_content") || undefined;
    const utm_term = urlParams.get("utm_term") || undefined;
    const fbclid = urlParams.get("fbclid") || undefined;
    const gclid = urlParams.get("gclid") || undefined;

    const hasTrackingParams = Boolean(
      utm_source || utm_medium || utm_campaign || utm_content || utm_term || fbclid || gclid
    );

    if (hasTrackingParams) {
      const data: AttributionData = {
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        fbclid,
        gclid,
        landing_url: window.location.href,
        referrer: document.referrer || undefined,
        captured_at: new Date().toISOString(),
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }

    // Retrieve previous attribution if visitor navigated internally
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing);
    }
  } catch (e) {
    console.warn("Ad attribution capture error:", e);
  }

  return {};
}

/**
 * Retrieves the active attribution data from session storage or captures from current location.
 */
export function getStoredAttribution(): AttributionData {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {}
  return captureAttribution();
}

/**
 * Returns a clean readable summary string of the lead source for admin/email notifications.
 */
export function formatLeadSourceString(attr?: AttributionData, defaultSource: string = "PPC Landing Page"): string {
  if (!attr) return defaultSource;
  const parts: string[] = [];

  if (attr.utm_source) parts.push(`Source: ${attr.utm_source}`);
  if (attr.utm_campaign) parts.push(`Campaign: ${attr.utm_campaign}`);
  if (attr.utm_content) parts.push(`Content: ${attr.utm_content}`);
  if (attr.fbclid) parts.push("Meta Ad Click");
  if (attr.gclid) parts.push("Google Ad Click");

  if (parts.length === 0) return defaultSource;
  return `${defaultSource} [${parts.join(" | ")}]`;
}
