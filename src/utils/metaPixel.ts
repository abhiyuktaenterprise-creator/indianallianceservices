// Meta Pixel (Facebook Pixel) Utility Helper
// Pixel ID: 2267548737432185

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Track a Lead conversion event in Meta Pixel
 * @param params Optional metadata like role, city, qualification
 */
export function trackMetaLead(params?: {
  content_name?: string;
  content_category?: string;
  city?: string;
  state?: string;
  value?: number;
  currency?: string;
}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      window.fbq("track", "Lead", {
        content_name: params?.content_name || "Aviation Candidate Registration",
        content_category: params?.content_category || "Job Application",
        city: params?.city,
        state: params?.state,
        value: params?.value || 0,
        currency: params?.currency || "INR",
      });
    } catch (e) {
      console.warn("Meta Pixel Lead Tracking error:", e);
    }
  }
}

/**
 * Track a custom event in Meta Pixel
 */
export function trackMetaCustom(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      window.fbq("trackCustom", eventName, params);
    } catch (e) {
      console.warn(`Meta Pixel Custom Event (${eventName}) error:`, e);
    }
  }
}

/**
 * Track a Contact / WhatsApp click event
 */
export function trackMetaContact(method: "phone" | "whatsapp" | "email") {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      window.fbq("track", "Contact", { method });
    } catch (e) {}
  }
}
