import { Network } from './types';

// ---------------------------------------------------------------------------
// In-memory cache with TTL for network data
// ---------------------------------------------------------------------------
interface CacheEntry {
  data: Network[];
  expiresAt: number;
}

let networkCache: CacheEntry | undefined;

export function resetCache(): void {
  networkCache = undefined;
}

export function getCached(): Network[] | undefined {
  if (networkCache && Date.now() < networkCache.expiresAt) {
    return networkCache.data;
  }
  return undefined;
}

export function setCache(data: Network[], ttlSecs: number): void {
  networkCache = {
    data,
    expiresAt: Date.now() + ttlSecs * 1000,
  };
}
