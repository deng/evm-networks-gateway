// ---------------------------------------------------------------------------
// Chainlist raw data types (from chainlist.org/rpcs.json)
// ---------------------------------------------------------------------------
export interface ChainlistRpcEntry {
  url: string;
  tracking?: string;
  isOpenSource?: boolean;
}

export interface ChainlistFeature {
  name: string;
}

export interface ChainlistNativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface ChainlistEns {
  registry: string;
}

export interface ChainlistExplorer {
  name: string;
  url: string;
  standard?: string;
}

export interface ChainlistChain {
  name: string;
  chain: string;
  icon?: string;
  rpc: ChainlistRpcEntry[];
  features?: ChainlistFeature[];
  faucets?: string[];
  nativeCurrency?: ChainlistNativeCurrency;
  infoURL?: string;
  shortName?: string;
  chainId: number;
  networkId?: number;
  slip44?: number;
  ens?: ChainlistEns;
  explorers?: ChainlistExplorer[];
  tvl?: number;
  chainSlug?: string;
  isTestnet?: boolean;
}

// ---------------------------------------------------------------------------
// Normalized chain data (API response)
// ---------------------------------------------------------------------------
export interface Network {
  chainId: number;
  name: string;
  chain: string;
  shortName: string;
  rpc: string[];
  nativeCurrency: ChainlistNativeCurrency | null;
  explorers: ChainlistExplorer[];
  infoURL: string;
  faucets: string[];
  icon: string | null;
  isTestnet: boolean;
}

// ---------------------------------------------------------------------------
// API response types
// ---------------------------------------------------------------------------
export interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
  networks_count: number;
}

export interface NetworksListResponse {
  success: boolean;
  data: Network[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}

export interface NetworkResponse {
  success: boolean;
  data?: Network;
  error?: string;
}

// ---------------------------------------------------------------------------
// Env (Cloudflare Worker bindings)
// ---------------------------------------------------------------------------
export interface Env {
  CHAINLIST_URL: string;
  NETWORKS_CACHE_TTL: string;
  REQUEST_TIMEOUT_SECS: string;
}
