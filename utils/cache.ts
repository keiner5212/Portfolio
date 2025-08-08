class BrowserCache {
  private defaultTTL: number;
  private cacheName = "sonar-browser-cache";

  constructor(defaultTTL = 3600000) {
    // Time-To-Live (TTL) for each cache entry in milliseconds (1 hour by default)
    this.defaultTTL = defaultTTL;
  }

  private async getCache(): Promise<Cache> {
    return await caches.open(this.cacheName);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const cache = await this.getCache();
    const expires = Date.now() + (ttl ?? this.defaultTTL);
    const body = JSON.stringify({ value, expires });
    const response = new Response(body, {
      headers: { "Content-Type": "application/json" },
    });
    await cache.put(new Request(`/__cache__/${key}`), response);
  }

  async get<T>(key: string): Promise<T | null> {
    const cache = await this.getCache();
    const response = await cache.match(`/__cache__/${key}`);
    if (!response) return null; // Cache miss

    try {
      const data = await response.json();
      if (data.expires > Date.now()) {
        // is still valid
        return data.value;
      } else {
        // has expired, remove it
        await cache.delete(`/__cache__/${key}`);
        return null;
      }
    } catch {
      // if fails, remove
      await cache.delete(`/__cache__/${key}`);
      return null;
    }
  }

  async clear(): Promise<void> {
    await caches.delete(this.cacheName);
  }
}

export const cache = new BrowserCache();
