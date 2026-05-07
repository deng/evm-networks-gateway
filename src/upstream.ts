import { ChainlistChain, ChainlistRpcEntry, Network } from './types';

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
function timeoutSignal(secs: string): AbortSignal {
  return AbortSignal.timeout(parseInt(secs || '10', 10) * 1000);
}

/** Extract just the URL string from an RPC entry (handles both string and object formats) */
function extractRpcUrl(entry: ChainlistRpcEntry): string {
  return typeof entry === 'string' ? entry : entry.url;
}

/** Normalize a raw Chainlist chain entry into our Network type */
function normalizeChain(raw: ChainlistChain): Network | null {
  if (!raw.chainId || typeof raw.chainId !== 'number') return null;
  if (!raw.name) return null;

  return {
    chainId: raw.chainId,
    name: raw.name,
    chain: raw.chain || '',
    shortName: raw.shortName || '',
    rpc: (raw.rpc || []).map(extractRpcUrl).filter(Boolean),
    nativeCurrency: raw.nativeCurrency || null,
    explorers: raw.explorers || [],
    infoURL: raw.infoURL || '',
    faucets: raw.faucets || [],
    icon: raw.icon || null,
    isTestnet: raw.isTestnet === true,
  };
}

// ---------------------------------------------------------------------------
// Fetch & parse Chainlist data
// ---------------------------------------------------------------------------
export async function fetchNetworks(env: { CHAINLIST_URL: string; REQUEST_TIMEOUT_SECS: string }): Promise<Network[]> {
  const url = env.CHAINLIST_URL || 'https://chainlist.org/rpcs.json';
  const res = await fetch(url, { signal: timeoutSignal(env.REQUEST_TIMEOUT_SECS) });
  if (!res.ok) {
    throw new Error(`Chainlist API error ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as ChainlistChain[];
  const networks: Network[] = [];

  for (const raw of data) {
    const normalized = normalizeChain(raw);
    if (normalized) {
      networks.push(normalized);
    }
  }

  // Sort by chainId ascending
  networks.sort((a, b) => a.chainId - b.chainId);

  return networks;
}
