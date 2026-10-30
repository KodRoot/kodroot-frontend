export const utmKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof utmKeys)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

export const UTM_VALUE_MAX = 100;

const STORAGE_KEY = "kodroot:utm";

type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function sanitizeUtmValue(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const cleaned = value
    .replace(/\p{Cc}+/gu, " ")
    .trim()
    .slice(0, UTM_VALUE_MAX)
    .trim();
  return cleaned.length > 0 ? cleaned : null;
}

export function sanitizeUtmParams(input: unknown): UtmParams {
  const result: UtmParams = {};
  if (typeof input !== "object" || input === null) {
    return result;
  }
  const record = input as Record<string, unknown>;
  for (const key of utmKeys) {
    const value = sanitizeUtmValue(record[key]);
    if (value) {
      result[key] = value;
    }
  }
  return result;
}

export function pickUtmParams(params: URLSearchParams): UtmParams {
  const result: UtmParams = {};
  for (const key of utmKeys) {
    const value = sanitizeUtmValue(params.get(key));
    if (value) {
      result[key] = value;
    }
  }
  return result;
}

function sessionStore(): StorageLike | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function readStoredUtm(
  storage: StorageLike | null = sessionStore(),
): UtmParams {
  if (!storage) {
    return {};
  }
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? sanitizeUtmParams(JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

/**
 * Remembers the campaign parameters a visitor arrived with, for the rest of
 * the browser session. First touch wins, and empty values never overwrite.
 */
export function captureUtmParams(
  search: string,
  storage: StorageLike | null = sessionStore(),
): UtmParams {
  const stored = readStoredUtm(storage);
  if (Object.keys(stored).length > 0) {
    return stored;
  }

  const found = pickUtmParams(new URLSearchParams(search));
  if (Object.keys(found).length === 0 || !storage) {
    return stored;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    return found;
  }
  return found;
}

export function formatAttribution(utm: UtmParams | null | undefined): string {
  if (!utm) {
    return "";
  }
  return utmKeys
    .flatMap((key) => {
      const value = sanitizeUtmValue(utm[key]);
      return value ? [`${key}=${value.replace(/\s+/g, " ")}`] : [];
    })
    .join("; ");
}
