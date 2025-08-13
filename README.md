# OpenAPI TypeScript SDK 生成器

这是一个将 OpenAPI 规范（YAML/JSON）转换为可发布的 TypeScript NPM 包的工具。基于 swagger-typescript-api 实现，生成基于 Axios 的 TypeScript SDK。

## 特性

- 将 OpenAPI 规范转换为 TypeScript 类型和服务
- 生成类型安全的 API 客户端
- 支持路径参数、查询参数和请求体
- 基于 Axios 的 HTTP 客户端
- 完全类型化的请求和响应
- 模块化的 API 结构
- **自动化发布流程**：API更新时自动生成SDK并发布到npm
- **CI/CD集成**：通过GitHub Actions自动构建和发布

## 安装

```bash
npm install openapi-typescript-sdk --save-dev
```

## 使用方法

### 命令行使用

```bash
# 生成 SDK
npx openapi-typescript-sdk generate -i ./petstore.yaml -o ./sdk
```

### 选项

- `-i, --input <path>`: OpenAPI 规范文件路径（YAML 或 JSON）【必需】
- `-o, --output <path>`: 输出目录（默认: `./sdk`）
- `-p, --package-name <name>`: 生成的包名（默认: `openapi-typescript-sdk`）

## 在项目中使用生成的 SDK

### 使用生成的 API 客户端

```typescript
import { Pets } from './sdk/Pets';
import { Stores } from './sdk/Stores';
import { Users } from './sdk/Users';

// 创建 API 实例
const baseURL = 'https://api.example.com';
const petApi = new Pets({ baseURL });
const storeApi = new Stores({ baseURL });
const userApi = new Users({ baseURL });

async function getPets() {
  try {
    // 获取宠物列表
    const response = await petApi.listPets({ limit: 10 });
    console.log('宠物列表:', response.data);

    // 获取宠物详情
    const pet = await petApi.getPetById(1);
    console.log('宠物详情:', pet.data);

  } catch (error) {
    console.error('API 调用失败:', error);
  }
}
```

## 项目结构

生成的 SDK 结构基于 swagger-typescript-api，通常包含：

```
sdk/
├── Pets.ts           # 宠物相关 API
├── Stores.ts         # 商店相关 API
├── Users.ts          # 用户相关 API
├── data-contracts.ts # 数据类型定义
└── http-client.ts    # HTTP 客户端基类
```

## 技术实现

本工具是基于 swagger-typescript-api 的封装，它提供了简单的命令行接口，使开发者能够轻松地从 OpenAPI 规范生成类型安全的 API 客户端。swagger-typescript-api 提供了更加模块化和灵活的代码生成方式。

## 开发

### 构建项目

```bash
npm run build
```

### 运行测试

```bash
npm test
```

### 发布SDK

当API规范更新时，可以使用以下命令自动生成SDK并发布：

```bash
# 使用默认配置更新SDK并发布patch版本
npm run update-sdk

# 指定OpenAPI规范文件、输出目录和版本类型
node scripts/update-sdk.js example/petstore.yaml sdk minor
```

更多发布相关信息，请参阅 [SDK发布指南](./README-PUBLISH.md)。

## 示例

查看 `example` 目录中的示例：

- `petstore.yaml`: 示例 OpenAPI 规范
- `usage.ts`: 如何使用生成的 SDK

## 许可证

MIT