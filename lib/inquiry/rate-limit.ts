const buckets = new Map<string, number[]>();

export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter(
    (time) => now - time < windowMs,
  );

  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }

  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > 5000) {
    for (const [bucketKey, times] of buckets) {
      if (times.every((time) => now - time >= windowMs)) {
        buckets.delete(bucketKey);
      }
    }
  }

  return true;
}
