import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------
async function createApp() {
  const mod = await import('../src/index');
  return mod.default;
}

async function resetCache() {
  const mod = await import('../src/index');
  mod.resetCache?.();
}

const mockEnv = {
  CHAINLIST_URL: 'https://chainlist.org/rpcs.json',
  NETWORKS_CACHE_TTL: '300',
  REQUEST_TIMEOUT_SECS: '10',
};

function mockRequest(method: string, url: string): Request {
  return new Request(url, { method });
}

function chainlistMockResponse() {
  return new Response(JSON.stringify([
    {
      name: 'Ethereum Mainnet',
      chain: 'ETH',
      rpc: [
        { url: 'https://eth.llamarpc.com', tracking: 'none', isOpenSource: true },
        { url: 'https://rpc.ankr.com/eth', tracking: 'yes' },
      ],
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://ethereum.org',
      shortName: 'eth',
      chainId: 1,
      networkId: 1,
      explorers: [{ name: 'etherscan', url: 'https://etherscan.io', standard: 'EIP3091' }],
      faucets: [],
      isTestnet: false,
    },
    {
      name: 'BNB Smart Chain Mainnet',
      chain: 'BSC',
      rpc: [
        { url: 'https://bsc-dataseed.bnbchain.org' },
        { url: 'https://binance.llamarpc.com', tracking: 'none' },
      ],
      nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
      infoURL: 'https://www.bnbchain.org',
      shortName: 'bnb',
      chainId: 56,
      networkId: 56,
      explorers: [{ name: 'bscscan', url: 'https://bscscan.com', standard: 'EIP3091' }],
      faucets: [],
      isTestnet: false,
    },
    {
      name: 'Sepolia Testnet',
      chain: 'ETH',
      rpc: [{ url: 'https://rpc.sepolia.org', tracking: 'none' }],
      nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
      infoURL: 'https://sepolia.dev',
      shortName: 'sepolia',
      chainId: 11155111,
      networkId: 11155111,
      explorers: [],
      faucets: ['https://faucet.sepolia.dev'],
      isTestnet: true,
    },
  ]), { status: 200 });
}

// ---------------------------------------------------------------------------
// Global: reset cache before each test
// ---------------------------------------------------------------------------
beforeEach(async () => {
  await resetCache();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------
describe('GET /health', () => {
  it('should return healthy status with networks count', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(chainlistMockResponse());
    const app = await createApp();
    const res = await app.fetch(mockRequest('GET', 'http://localhost/health'), mockEnv);
    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.status).toBe('healthy');
    expect(body.timestamp).toBeDefined();
    expect(body.version).toBe('0.1.0');
    expect(body.networks_count).toBe(3);
  });

  it('should still return healthy when data not loaded', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const app = await createApp();
    const res = await app.fetch(mockRequest('GET', 'http://localhost/health'), mockEnv);
    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.status).toBe('healthy');
    expect(body.networks_count).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// List networks
// ---------------------------------------------------------------------------
describe('GET /api/v1/networks', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(chainlistMockResponse());
  });

  it('should return all networks', async () => {
    const app = await createApp();
    const res = await app.fetch(mockRequest('GET', 'http://localhost/api/v1/networks'), mockEnv);
    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.length).toBe(3);
  });

  it('should filter by chainId', async () => {
    const app = await createApp();
    const res = await app.fetch(
      mockRequest('GET', 'http://localhost/api/v1/networks?chainId=1'),
      mockEnv,
    );
    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.data.length).toBe(1);
    expect(body.data[0].chainId).toBe(1);
    expect(body.data[0].name).toBe('Ethereum Mainnet');
  });

  it('should search by name', async () => {
    const app = await createApp();
    const res = await app.fetch(
      mockRequest('GET', 'http://localhost/api/v1/networks?search=eth'),
      mockEnv,
    );
    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.data.length).toBe(2);
    expect(body.data.every((n: any) =>
      n.name.toLowerCase().includes('eth') ||
      n.chain.toLowerCase().includes('eth') ||
      n.shortName.toLowerCase().includes('eth'),
    )).toBe(true);
  });

  it('should handle empty search results', async () => {
    const app = await createApp();
    const res = await app.fetch(
      mockRequest('GET', 'http://localhost/api/v1/networks?search=nonexistent'),
      mockEnv,
    );
    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.data.length).toBe(0);
  });

  it('should use cached data on second request', async () => {
    const app = await createApp();
    // First request loads data
    await app.fetch(mockRequest('GET', 'http://localhost/api/v1/networks'), mockEnv);
    vi.restoreAllMocks(); // Remove mock

    // Second request should still work (from cache)
    const res2 = await app.fetch(
      mockRequest('GET', 'http://localhost/api/v1/networks'),
      mockEnv,
    );
    expect(res2.status).toBe(200);
    const body: any = await res2.json();
    expect(body.success).toBe(true);
    expect(body.data.length).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// Get single network
// ---------------------------------------------------------------------------
describe('GET /api/v1/networks/:chainId', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(chainlistMockResponse());
  });

  it('should return network by chainId', async () => {
    const app = await createApp();
    const res = await app.fetch(mockRequest('GET', 'http://localhost/api/v1/networks/1'), mockEnv);
    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.chainId).toBe(1);
    expect(body.data.name).toBe('Ethereum Mainnet');
    expect(body.data.rpc).toEqual([
      'https://eth.llamarpc.com',
      'https://rpc.ankr.com/eth',
    ]);
    expect(body.data.nativeCurrency).toEqual({ name: 'Ether', symbol: 'ETH', decimals: 18 });
    expect(body.data.explorers).toHaveLength(1);
  });

  it('should return 404 for non-existent chainId', async () => {
    const app = await createApp();
    const res = await app.fetch(mockRequest('GET', 'http://localhost/api/v1/networks/99999'), mockEnv);
    expect(res.status).toBe(404);
    const body: any = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toContain('99999');
  });

  it('should return 400 for invalid chainId', async () => {
    const app = await createApp();
    const res = await app.fetch(mockRequest('GET', 'http://localhost/api/v1/networks/abc'), mockEnv);
    expect(res.status).toBe(400);
    const body: any = await res.json();
    expect(body.success).toBe(false);
    expect(body.error).toContain('Invalid');
  });
});

// ---------------------------------------------------------------------------
// Network data normalization
// ---------------------------------------------------------------------------
describe('Data normalization', () => {
  it('should extract rpc URLs from objects', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(chainlistMockResponse());
    const app = await createApp();
    const res = await app.fetch(mockRequest('GET', 'http://localhost/api/v1/networks/56'), mockEnv);
    const body: any = await res.json();
    expect(body.data.rpc[0]).toBe('https://bsc-dataseed.bnbchain.org');
    expect(body.data.rpc[1]).toBe('https://binance.llamarpc.com');
  });

  it('should include isTestnet flag', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(chainlistMockResponse());
    const app = await createApp();
    const res = await app.fetch(mockRequest('GET', 'http://localhost/api/v1/networks/11155111'), mockEnv);
    const body: any = await res.json();
    expect(body.data.isTestnet).toBe(true);
    expect(body.data.faucets).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------
describe('Error handling', () => {
  it('should return 500 when data source is unreachable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    const app = await createApp();
    const res = await app.fetch(
      mockRequest('GET', 'http://localhost/api/v1/networks'),
      mockEnv,
    );
    expect(res.status).toBe(500);
    const body: any = await res.json();
    expect(body.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// OpenAPI / Swagger
// ---------------------------------------------------------------------------
describe('OpenAPI & Swagger UI', () => {
  it('should serve OpenAPI spec at /openapi.json', async () => {
    const app = await createApp();
    const res = await app.fetch(mockRequest('GET', 'http://localhost/openapi.json'), mockEnv);
    expect(res.status).toBe(200);
    const body: any = await res.json();
    expect(body.openapi).toBe('3.0.3');
    expect(body.info.title).toBe('EVM Networks Gateway');
    expect(body.paths['/api/v1/networks']).toBeDefined();
    expect(body.paths['/api/v1/networks/{chainId}']).toBeDefined();
    expect(body.paths['/health']).toBeDefined();
  });

  it('should serve Swagger UI at /docs', async () => {
    const app = await createApp();
    const res = await app.fetch(mockRequest('GET', 'http://localhost/docs'), mockEnv);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('swagger-ui');
    expect(text).toContain('/openapi.json');
  });
});

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------
describe('CORS headers', () => {
  it('should include CORS headers in responses', async () => {
    const app = await createApp();
    const res = await app.fetch(mockRequest('GET', 'http://localhost/health'), mockEnv);
    expect(res.headers.get('access-control-allow-origin')).toBe('*');
  });

  it('should respond to OPTIONS preflight', async () => {
    const app = await createApp();
    const res = await app.fetch(
      new Request('http://localhost/api/v1/networks', { method: 'OPTIONS' }),
      mockEnv,
    );
    expect(res.headers.get('access-control-allow-origin')).toBe('*');
    expect(res.headers.get('access-control-allow-methods')).toContain('GET');
    expect(res.headers.get('access-control-max-age')).toBe('86400');
  });
});
