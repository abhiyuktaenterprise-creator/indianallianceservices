// Meta Pixel (Facebook Pixel) Utility Helper
// Pixel ID: 2267548737432185

export const META_PIXEL_ID = "2267548737432185";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export interface MetaLeadParams {
  content_name?: string;
  content_category?: string;
  city?: string;
  state?: string;
  value?: number;
  currency?: string;
  eventId?: string;
  // Advanced Matching fields (hashed or normalized by Meta)
  phone?: string;
  email?: string;
  name?: string;
}

/**
 * Normalizes phone number to Meta's expected E.164 without plus sign (e.g., 919876543210)
 */
function formatPhoneForMeta(rawPhone?: string): string | undefined {
  if (!rawPhone) return undefined;
  const digits = rawPhone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  if (digits.length > 10) return digits;
  return undefined;
}

/**
 * Track a PageView event in Meta Pixel (safe for SPA route transitions)
 */
export function trackMetaPageView(customPath?: string) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      window.fbq("track", "PageView");
    } catch (e) {
      console.warn("Meta Pixel PageView notice:", e);
    }
  }
}

/**
 * Track a Lead conversion event in Meta Pixel with Advanced Matching and Event ID
 */
export function trackMetaLead(params?: MetaLeadParams) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      // 1. Advanced Matching user data if phone or email is available
      const cleanPhone = formatPhoneForMeta(params?.phone);
      const cleanEmail = params?.email?.trim().toLowerCase();
      const cleanName = params?.name?.trim();

      if (cleanPhone || cleanEmail || cleanName) {
        const nameParts = cleanName ? cleanName.split(" ") : [];
        const firstName = nameParts[0]?.toLowerCase();
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ").toLowerCase() : undefined;

        const advancedMatchingData: Record<string, string | undefined> = {};
        if (cleanPhone) advancedMatchingData.ph = cleanPhone;
        if (cleanEmail) advancedMatchingData.em = cleanEmail;
        if (firstName) advancedMatchingData.fn = firstName;
        if (lastName) advancedMatchingData.ln = lastName;

        // Re-initialize with user data for enhanced Event Match Quality
        window.fbq("init", META_PIXEL_ID, advancedMatchingData);
      }

      // 2. Event Payload
      const eventData: Record<string, any> = {
        content_name: params?.content_name || "Aviation Candidate Registration",
        content_category: params?.content_category || "Job Application",
        value: params?.value || 0,
        currency: params?.currency || "INR",
        status: "submitted",
      };

      if (params?.city) eventData.city = params.city;
      if (params?.state) eventData.state = params.state;

      // 3. Event Options (Event ID for deduplication)
      const eventOptions: Record<string, any> = {};
      if (params?.eventId) {
        eventOptions.eventID = params.eventId;
      }

      window.fbq("track", "Lead", eventData, eventOptions);
    } catch (e) {
      console.warn("Meta Pixel Lead Tracking notice:", e);
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
      console.warn(`Meta Pixel Custom Event (${eventName}) notice:`, e);
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
