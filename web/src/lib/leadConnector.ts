// src/lib/leadConnector.ts

const LC_BASE_URL = import.meta.env.GHL_BASE_URL;       // e.g. https://services.leadconnectorhq.com
const LC_API_VERSION = import.meta.env.GHL_LC_API_VERSION; // e.g. "v1"
const LC_LOCATION_ID = import.meta.env.GHL_LOCATION_ID; // subaccount location ID
const LC_PIT_TOKEN = import.meta.env.GHL_PRIVATE_TOKEN;     // your private token

async function lcApi(
  path: string,
  method: "GET" | "POST" = "GET",
  body?: any,
  qs?: Record<string, any>
) {
  const url = new URL(LC_BASE_URL + path);

  // Add query params if provided
  if (qs) {
    Object.entries(qs).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        url.searchParams.set(key, String(val));
      }
    });
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      Authorization: `Bearer ${LC_PIT_TOKEN}`,
      "Lc-Version": LC_API_VERSION, // must be exact header name
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {}

  if (!res.ok) {
    throw new Error(json?.message || json?.error || text || "LeadConnector API error");
  }

  return json;
}

/**
 * Get the contact ID from GHL by email in a specific location (subaccount)
 */
export async function getContactIdByEmail(email: string) {
  const data = await lcApi("/contacts/search/duplicate", "GET", null, {
    locationId: LC_LOCATION_ID,
    email,
  });

  // API may return contactId in different formats
  return data?.contactId || data?.id || data?.contact?.id || null;
}

/**
 * Add a tag to a contact (by email) in GHL
 */
export async function addTagToCoach(email: string, tag: string) {
  const contactId = await getContactIdByEmail(email);

  if (!contactId) {
    console.warn(`Contact not found in GHL for email: ${email}`);
    return false;
  }

  await lcApi(`/contacts/${contactId}/tags`, "POST", {
    tags: [tag],
  });

  return true;
}

