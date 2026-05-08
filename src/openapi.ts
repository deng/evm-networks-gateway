// ---------------------------------------------------------------------------
// OpenAPI spec
// ---------------------------------------------------------------------------
export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'EVM Networks Gateway',
    description: 'EVM chain metadata gateway — aggregates chain data from [Chainlist](https://chainlist.org/rpcs.json).',
    version: '0.1.0',
  },
  servers: [
    { url: 'https://evm-networks.bithub.pro', description: 'Production' },
    { url: 'http://localhost:8787', description: 'Local dev' },
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        tags: ['System'],
        responses: {
          '200': {
            description: 'Service healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'healthy' },
                    timestamp: { type: 'string', format: 'date-time' },
                    version: { type: 'string', example: '0.1.0' },
                    networks_count: { type: 'integer', example: 2718 },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/networks': {
      get: {
        summary: 'List all networks',
        description: 'Returns all EVM networks with optional search/filter.',
        tags: ['Networks'],
        parameters: [
          {
            name: 'search',
            in: 'query',
            description: 'Search by chain name, short name, or chain symbol',
            schema: { type: 'string' },
            example: 'arbitrum',
          },
          {
            name: 'chainId',
            in: 'query',
            description: 'Filter by exact chain ID',
            schema: { type: 'integer' },
            example: 1,
          },
        ],
        responses: {
          '200': {
            description: 'List of networks',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Network' },
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Failed to fetch data source',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: false },
                    error: { type: 'string' },
                    data: { type: 'array', items: {} },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/networks/{chainId}': {
      get: {
        summary: 'Get network by chain ID',
        description: 'Returns detailed information for a single EVM network.',
        tags: ['Networks'],
        parameters: [
          {
            name: 'chainId',
            in: 'path',
            description: 'Chain ID (EIP-155)',
            required: true,
            schema: { type: 'integer' },
            example: 1,
          },
        ],
        responses: {
          '200': {
            description: 'Network found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    data: { $ref: '#/components/schemas/Network' },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid chainId',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: false },
                    error: { type: 'string', example: 'Invalid chainId' },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Network not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: false },
                    error: { type: 'string', example: "Network with chainId '99999' not found" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Network: {
        type: 'object',
        properties: {
          chainId: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Ethereum Mainnet' },
          chain: { type: 'string', example: 'ETH' },
          shortName: { type: 'string', example: 'eth' },
          rpc: {
            type: 'array',
            items: { type: 'string', format: 'uri' },
            example: ['https://eth.llamarpc.com', 'https://rpc.ankr.com/eth'],
          },
          nativeCurrency: {
            type: 'object',
            nullable: true,
            properties: {
              name: { type: 'string', example: 'Ether' },
              symbol: { type: 'string', example: 'ETH' },
              decimals: { type: 'integer', example: 18 },
            },
          },
          explorers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'etherscan' },
                url: { type: 'string', format: 'uri', example: 'https://etherscan.io' },
                standard: { type: 'string', example: 'EIP3091' },
              },
            },
          },
          infoURL: { type: 'string', format: 'uri', example: 'https://ethereum.org' },
          faucets: { type: 'array', items: { type: 'string' } },
          icon: { type: 'string', nullable: true, example: 'ethereum' },
          isTestnet: { type: 'boolean', example: false },
        },
      },
    },
  },
} as const;
