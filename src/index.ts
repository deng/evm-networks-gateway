import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { swaggerUI } from '@hono/swagger-ui';
import { Env, Network, HealthResponse, NetworksListResponse, NetworkResponse } from './types';
import { fetchNetworks } from './upstream';
import { getCached, setCache, resetCache } from './cache';
import { openApiSpec } from './openapi';

// ---------------------------------------------------------------------------
// Ensure networks are loaded (fetch if not cached)
// ---------------------------------------------------------------------------
async function ensureNetworks(env: Env): Promise<Network[]> {
  const cached = getCached();
  if (cached) return cached;

  const networks = await fetchNetworks(env);
  const ttl = parseInt(env.NETWORKS_CACHE_TTL || '300', 10);
  setCache(networks, ttl);
  return networks;
}

export { resetCache };

// ---------------------------------------------------------------------------
// Hono app
// ---------------------------------------------------------------------------
const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  maxAge: 86400,
}));

// OpenAPI spec JSON
app.get('/openapi.json', (c) => c.json(openApiSpec));

// Swagger UI
app.get('/docs', swaggerUI({ url: '/openapi.json' }));

// Health check
app.get('/health', async (c) => {
  let count = 0;
  try {
    const networks = await ensureNetworks(c.env);
    count = networks.length;
  } catch {
    // OK if not loaded yet
  }
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
    networks_count: count,
  } satisfies HealthResponse);
});

// List all networks
// GET /api/v1/networks
// GET /api/v1/networks?search=ethereum
// GET /api/v1/networks?chainId=1
// GET /api/v1/networks?page=1&limit=20 (default limit 50, set limit=0 for all)
app.get('/api/v1/networks', async (c) => {
  try {
    const networks = await ensureNetworks(c.env);
    const query = c.req.query();

    let filtered = networks;

    // Filter by chainId
    if (query.chainId) {
      const chainId = parseInt(query.chainId, 10);
      if (!isNaN(chainId)) {
        filtered = filtered.filter(n => n.chainId === chainId);
      }
    }

    // Filter by search (name, shortName, chain)
    if (query.search) {
      const q = query.search.toLowerCase();
      filtered = filtered.filter(n =>
        n.name.toLowerCase().includes(q) ||
        n.chain.toLowerCase().includes(q) ||
        n.shortName.toLowerCase().includes(q),
      );
    }

    const total = filtered.length;
    const limit = query.limit !== undefined ? parseInt(query.limit, 10) : 50;
    const unlimited = limit === 0;

    if (unlimited) {
      return c.json({ success: true, data: filtered } satisfies NetworksListResponse);
    }

    const page = Math.max(1, parseInt(query.page || '1', 10) || 1);
    const safeLimit = Math.max(1, Math.min(limit, 200));
    const totalPages = Math.ceil(total / safeLimit);
    const start = (page - 1) * safeLimit;
    const paged = filtered.slice(start, start + safeLimit);

    return c.json({
      success: true,
      data: paged,
      pagination: { page, limit: safeLimit, total, totalPages },
    } satisfies NetworksListResponse);
  } catch (err) {
    return c.json({
      success: false,
      error: (err as Error).message,
      data: [],
    } satisfies NetworksListResponse, 500);
  }
});

// Get single network by chainId
// GET /api/v1/networks/1
app.get('/api/v1/networks/:chainId', async (c) => {
  try {
    const chainId = parseInt(c.req.param('chainId'), 10);
    if (isNaN(chainId)) {
      return c.json({ success: false, error: 'Invalid chainId' } satisfies NetworkResponse, 400);
    }

    const networks = await ensureNetworks(c.env);
    const network = networks.find(n => n.chainId === chainId);

    if (!network) {
      return c.json({
        success: false,
        error: `Network with chainId '${chainId}' not found`,
      } satisfies NetworkResponse, 404);
    }

    return c.json({ success: true, data: network } satisfies NetworkResponse);
  } catch (err) {
    return c.json({
      success: false,
      error: (err as Error).message,
    } satisfies NetworkResponse, 500);
  }
});

// ---------------------------------------------------------------------------
// Export for Cloudflare Worker
// ---------------------------------------------------------------------------
export default {
  fetch: app.fetch,
};
