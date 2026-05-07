# EVM Networks Gateway

基于 Cloudflare Workers 的 EVM 网络信息聚合网关服务（TypeScript/Hono 版）。

聚合 [Chainlist](https://chainlist.org/rpcs.json) 数据源，提供统一的 API 查询所有 EVM 兼容链的网络信息（RPC 节点、链 ID、原生代币、浏览器等）。

## 功能特性

- 🌐 **全量 EVM 链信息** — 集成 Chainlist 数据源，覆盖 2700+ EVM 链
- 🔍 **多维度查询** — 支持按链 ID、链名称、简称搜索
- ⚡ **智能缓存** — 基于 Cloudflare Workers 的内存缓存，减少上游请求
- 🏥 **健康检查端点**
- 🚀 **全球边缘部署**（Cloudflare Workers）

## 快速开始

### 前置要求

- Node.js 18+
- npm
- Cloudflare 账户（用于部署）

### 安装

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

默认在 `http://localhost:8787` 启动。

### 部署

```bash
npm run deploy
```

## API 文档

### 健康检查

```
GET /health
```

**响应：**
```json
{
  "status": "healthy",
  "timestamp": "2026-05-08T10:00:00.000Z",
  "version": "0.1.0",
  "networks_count": 2718
}
```

### 获取所有网络

```
GET /api/v1/networks
```

**查询参数：**
| 参数 | 类型 | 说明 |
|------|------|------|
| `search` | string | 按链名称模糊搜索 |
| `chainId` | number | 按链 ID 精确筛选 |

**响应：**
```json
{
  "success": true,
  "data": [
    {
      "chainId": 1,
      "name": "Ethereum Mainnet",
      "chain": "ETH",
      "shortName": "eth",
      "networkId": 1,
      "nativeCurrency": {
        "name": "Ether",
        "symbol": "ETH",
        "decimals": 18
      },
      "rpc": [
        "https://eth.llamarpc.com",
        "https://rpc.ankr.com/eth"
      ],
      "explorers": [
        {
          "name": "etherscan",
          "url": "https://etherscan.io",
          "standard": "EIP3091"
        }
      ],
      "infoURL": "https://ethereum.org"
    }
  ]
}
```

### 获取单个网络

```
GET /api/v1/networks/:chainId
```

**示例：** `GET /api/v1/networks/1`

```json
{
  "success": true,
  "data": {
    "chainId": 1,
    "name": "Ethereum Mainnet",
    "chain": "ETH",
    "rpc": [
      "https://eth.llamarpc.com",
      "https://rpc.ankr.com/eth"
    ],
    ...
  }
}
```

**错误响应（链不存在）：** `404`
```json
{
  "success": false,
  "error": "Network with chainId '99999' not found"
}
```

## 架构

```
                        ┌──────────────────┐
                        │  Chainlist Data   │
                        │  rpcs.json        │
                        └────────┬─────────┘
                                 │ 定期刷新（缓存）
                                 ▼
┌───────┐      ┌──────────────────────────────────────┐
│Client │─────▶│      Cloudflare Worker (Hono)        │
└───────┘      │  ┌──────┐ ┌────────┐ ┌───────────┐  │
               │  │Router│ │Cache   │ │Data Store │  │
               │  └──────┘ └────────┘ └───────────┘  │
               └──────────────────────────────────────┘
```

## 项目结构

```
evm-networks/
├── src/
│   ├── index.ts           # Hono app + 路由定义
│   ├── types.ts           # 类型定义
│   ├── cache.ts           # 缓存层
│   └── upstream.ts        # Chainlist 数据抓取与解析
├── test/
│   └── networks.test.ts   # Vitest 测试
├── wrangler.toml          # Cloudflare Workers 配置
└── package.json
```

## 配置

通过 `wrangler.toml` 和环境变量配置：

| 变量 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `CHAINLIST_URL` | string | `https://chainlist.org/rpcs.json` | Chainlist 数据源地址 |
| `NETWORKS_CACHE_TTL` | number | `300` | 缓存 TTL（秒） |
| `REQUEST_TIMEOUT_SECS` | number | `10` | 数据源请求超时（秒） |

## 命令

```bash
npm run dev          # 本地开发
npm run deploy       # 部署到 Cloudflare
npm test             # 运行测试
npm run typecheck    # 类型检查
```

## 许可证

MIT
