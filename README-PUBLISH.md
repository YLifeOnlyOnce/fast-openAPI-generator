# SDK 发布指南

本文档介绍如何使用本项目提供的工具从 OpenAPI 规范生成 TypeScript SDK，并将其发布到 npm 仓库。

## 自动发布流程

本项目已配置 GitHub Actions 工作流，当 OpenAPI 规范文件更新时，会自动触发构建和发布流程：

1. 当 `example` 目录下的 YAML 或 JSON 文件发生变化并推送到 `main` 分支时，会触发 CI 流程
2. CI 会自动生成新的 SDK
3. 运行测试确保 SDK 质量
4. 自动更新版本号（patch 级别）
5. 发布新版本到 npm 仓库

更多CI集成示例，请参阅 [CI环境中使用SDK发布功能](./examples/ci-usage.md)。

## 手动发布

如果需要手动发布新版本，可以使用以下命令：

```bash
# 更新补丁版本 (1.0.0 -> 1.0.1)
npm run publish:patch

# 更新次要版本 (1.0.0 -> 1.1.0)
npm run publish:minor

# 更新主要版本 (1.0.0 -> 2.0.0)
npm run publish:major
```

## 配置 npm 发布权限

要使 CI 能够自动发布到 npm，需要配置 npm token：

1. 生成 npm token：
   - 登录到 npm 账号
   - 访问 https://www.npmjs.com/settings/[用户名]/tokens
   - 创建新的 token（选择 Publish 权限）

2. 在 GitHub 仓库中添加 secret：
   - 访问仓库的 Settings > Secrets > Actions
   - 添加名为 `NPM_TOKEN` 的新 secret，值为刚才生成的 token

## 更新 OpenAPI 规范

当 API 发生变化时，更新 OpenAPI 规范文件：

1. 更新 `example` 目录下的 YAML 或 JSON 文件
2. 提交并推送到 GitHub 仓库的 `main` 分支
3. CI 将自动触发构建和发布流程

### 从API项目触发SDK更新

我们提供了一个示例脚本，可以从API项目的CI/CD流程中触发SDK更新和发布：

```bash
# 使用默认配置
node examples/trigger-update.js

# 使用自定义配置
SDK_PROJECT_PATH=/path/to/sdk VERSION_TYPE=minor SPEC_FILE_PATH=/path/to/openapi.yaml node examples/trigger-update.js
```

这个脚本可以集成到API项目的CI/CD流程中，当API发生变化时自动触发SDK更新和发布。

## 手动生成 SDK

如果需要在本地生成 SDK 进行测试，可以使用以下命令：

```bash
npm run generate-sdk
```

这将使用 `example/petstore.yaml` 文件生成 SDK 到 `sdk` 目录。

## 版本管理策略

- **补丁版本（patch）**：用于 API 的向后兼容修复（如文档更新、错误修复）
- **次要版本（minor）**：用于向后兼容的 API 功能添加
- **主要版本（major）**：用于不向后兼容的 API 变更

## 故障排除

如果发布过程中遇到问题：

1. 检查 GitHub Actions 日志以获取详细错误信息
2. 确保 npm token 有效且具有发布权限
3. 验证 package.json 中的包名是否已被占用
4. 确保版本号符合语义化版本规范且大于当前已发布的版本