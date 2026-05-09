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
| `page` | number | 页码（默认 1） |
| `limit` | number | 每页条数（默认 50，最大 200，设为 `0` 返回全部） |

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

### OpenAPI / Swagger

```
GET /openapi.json
```

返回 OpenAPI 3.0.3 规范 JSON。

```
GET /docs
```

Swagger UI 交互式文档页面，可在浏览器中直接测试 API。

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

## Flutter SDK

项目根目录包含自动生成的 Flutter SDK：

```
evm-networks-gateway-flutter/
├── lib/
│   ├── api/            # API 客户端（NetworksApi, SystemApi）
│   ├── model/          # 数据模型（Network, Explorer, Currency 等）
│   ├── auth/           # 认证
│   ├── api_client.dart # 通用 HTTP 客户端
│   └── api_helper.dart # 序列化/反序列化辅助
├── test/               # 单元测试
├── doc/                # 文档
└── pubspec.yaml
```

### 使用方式

在 `pubspec.yaml` 中引用：

```yaml
dependencies:
  evm_networks_gateway:
    path: ../evm-networks-gateway-flutter
```

```dart
import 'package:evm_networks_gateway/api.dart';

final api = NetworksApi(ApiClient(basePath: 'https://evm-networks.bithub.pro'));

// 获取所有网络（分页）
var response = await api.apiV1NetworksGet(limit: 20, page: 1);
print(response.data?.length);
print(response.pagination?.total);

// 获取单个网络
var eth = await api.apiV1NetworksChainIdGet(chainId: 1);
print(eth.data?.name); // "Ethereum Mainnet"

// 搜索
var result = await api.apiV1NetworksGet(search: 'arbitrum');
print(result.data?.length);
```

### 重新生成

```bash
./scripts/generate-flutter-sdk.sh
```

SDK 通过 OpenAPI Generator 从 `/openapi.json` 自动生成，新增端点后重新运行即可。

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
