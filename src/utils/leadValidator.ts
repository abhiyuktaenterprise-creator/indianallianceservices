/**
 * Utility functions for Lead Phone Normalization and Duplicate Detection (Approach 1: Cache / LocalStorage)
 */

export interface SubmittedLeadRecord {
  name?: string;
  phone: string;
  targetRole?: string;
  city?: string;
  submittedAt: string;
  refId?: string;
}

const STORAGE_KEY = "acs_submitted_phones";

/**
 * Normalizes any phone number string to a standard 10-digit Indian phone format.
 * Strips away spaces, hyphens, parentheses, "+91", leading "0", etc.
 */
export function normalizePhoneNumber(rawPhone: string): string {
  if (!rawPhone) return "";
  
  // Remove all non-numeric characters
  let digits = rawPhone.replace(/\D/g, "");
  
  // If starts with 91 and has 12 digits (e.g. 919876543210), trim 91
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }
  
  // If starts with 0 and has 11 digits (e.g. 09876543210), trim 0
  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  
  // Return the last 10 digits if longer
  if (digits.length > 10) {
    digits = digits.slice(-10);
  }
  
  return digits;
}

/**
 * Retrieves the dictionary of submitted phones from localStorage cache.
 */
export function getAllSubmittedPhones(): Record<string, SubmittedLeadRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch (e) {
    console.warn("Could not read submitted phones from cache:", e);
    return {};
  }
}

/**
 * Checks if a given phone number has already submitted a form.
 * Inspects both `acs_submitted_phones` cache and `acs_candidate_leads` stored in localStorage.
 */
export function checkDuplicatePhone(rawPhone: string): {
  isDuplicate: boolean;
  leadRecord?: SubmittedLeadRecord;
} {
  const cleanPhone = normalizePhoneNumber(rawPhone);
  if (!cleanPhone || cleanPhone.length < 10) {
    return { isDuplicate: false };
  }

  // 1. Check dedicated submitted cache
  const phoneMap = getAllSubmittedPhones();
  if (phoneMap[cleanPhone]) {
    return {
      isDuplicate: true,
      leadRecord: phoneMap[cleanPhone],
    };
  }

  // 2. Fallback check against acs_candidate_leads in localStorage
  try {
    const savedLeadsRaw = localStorage.getItem("acs_candidate_leads");
    if (savedLeadsRaw) {
      const savedLeads = JSON.parse(savedLeadsRaw);
      if (Array.isArray(savedLeads)) {
        const found = savedLeads.find((l: any) => normalizePhoneNumber(l.phone || "") === cleanPhone);
        if (found) {
          const record: SubmittedLeadRecord = {
            name: found.name,
            phone: cleanPhone,
            targetRole: found.targetRole,
            city: found.city,
            submittedAt: found.submittedAt || "Recently",
            refId: found.id ? `IAS-${new Date().getFullYear()}-${found.id.replace("lead-", "").slice(-6)}` : undefined,
          };
          // Save back into fast phone map
          phoneMap[cleanPhone] = record;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(phoneMap));
          return {
            isDuplicate: true,
            leadRecord: record,
          };
        }
      }
    }
  } catch (e) {
    console.warn("Error checking candidate leads cache:", e);
  }

  return { isDuplicate: false };
}

/**
 * Saves a successfully submitted phone number to the local cache.
 */
export function saveSubmittedPhone(
  rawPhone: string,
  details: {
    name?: string;
    targetRole?: string;
    city?: string;
    refId?: string;
    submittedAt?: string;
  }
): void {
  const cleanPhone = normalizePhoneNumber(rawPhone);
  if (!cleanPhone || cleanPhone.length < 10) return;

  try {
    const phoneMap = getAllSubmittedPhones();
    phoneMap[cleanPhone] = {
      name: details.name,
      phone: cleanPhone,
      targetRole: details.targetRole,
      city: details.city,
      submittedAt:
        details.submittedAt ||
        new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      refId: details.refId,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(phoneMap));
  } catch (e) {
    console.warn("Could not save submitted phone to cache:", e);
  }
}
