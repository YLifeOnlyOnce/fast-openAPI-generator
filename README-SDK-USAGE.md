# Swagger TypeScript API SDK 使用指南

## 简介

本项目使用 `swagger-typescript-api` 工具从 OpenAPI 规范文件生成 TypeScript SDK。生成的 SDK 包含了 API 接口的类型定义和客户端代码，可以用于前端应用程序与后端 API 的交互。

## 生成 SDK

使用以下命令从 OpenAPI 规范文件生成 SDK：

```bash
npx swagger-typescript-api generate -i example/petstore.yaml -o sdk --axios
```

## SDK 文件结构

生成的 SDK 包含以下文件：

- `Api.ts`: 包含 API 接口的类型定义
- `Pets.ts`: 宠物相关 API 的客户端代码
- `Stores.ts`: 商店相关 API 的客户端代码
- `Users.ts`: 用户相关 API 的客户端代码
- `data-contracts.ts`: 数据模型的接口定义
- `http-client.ts`: HTTP 客户端的基础代码

## 使用 SDK

### 方法一：使用生成的 API 客户端类

```typescript
import axios from 'axios';
import { Pets } from '../sdk/Pets';
import { Stores } from '../sdk/Stores';
import { Users } from '../sdk/Users';

// 创建 API 客户端实例
const petApi = new Pets({ baseURL: 'https://petstore.swagger.io/v1' });
const storeApi = new Stores({ baseURL: 'https://petstore.swagger.io/v1' });
const userApi = new Users({ baseURL: 'https://petstore.swagger.io/v1' });

// 使用 API 客户端
async function example() {
  try {
    // 获取宠物列表
    const pets = await petApi.listPets({ limit: 10 });
    console.log('宠物列表:', pets);

    // 创建宠物
    const newPet = await petApi.createPet({
      name: '小花',
      tag: '猫'
    });
    console.log('创建的宠物:', newPet);

    // 获取宠物详情
    const pet = await petApi.getPetById(newPet.id);
    console.log('宠物详情:', pet);
  } catch (error) {
    console.error('API调用失败:', error);
  }
}
```

### 方法二：仅使用类型定义，自行实现 API 调用

如果 SDK 的客户端代码存在问题，或者你想使用自己的 HTTP 客户端，可以只使用生成的类型定义：

```typescript
import axios from 'axios';
import { Pet, NewPet, Pets, User } from '../sdk/Api';

// 创建 axios 实例
const api = axios.create({
  baseURL: 'https://petstore.swagger.io/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 使用类型定义
async function example() {
  try {
    // 获取宠物列表
    const petsResponse = await api.get<Pets>('/pets', {
      params: { limit: 10 }
    });
    console.log('宠物列表:', petsResponse.data);

    // 创建新宠物
    const newPet: NewPet = {
      name: '小花',
      tag: '猫'
    };
    const newPetResponse = await api.post<Pet>('/pets', newPet);
    console.log('创建的宠物:', newPetResponse.data);
  } catch (error) {
    console.error('API调用失败:', error);
  }
}
```

## 注意事项

1. 生成的 SDK 可能存在语法错误或类型不匹配的问题，需要手动修复。
2. 在使用 SDK 之前，请确保 API 服务器已经启动并可访问。
3. 如果 API 服务器需要认证，请在 API 客户端实例中配置相应的认证信息。

## 示例

完整的示例代码可以在 `example/usage-new.ts` 文件中找到。运行示例：

```bash
npx ts-node example/usage-new.ts
```