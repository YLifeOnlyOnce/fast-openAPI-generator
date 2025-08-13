# GitHub 仓库设置指南

您的项目已经初始化为 Git 仓库并完成了初始提交。现在需要在 GitHub 上创建远程仓库并推送代码。

## 步骤 1: 在 GitHub 上创建新仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `openapi-typescript-sdk-generator` (或您喜欢的名称)
   - **Description**: `OpenAPI TypeScript SDK Generator with Auto-Publish Functionality`
   - **Visibility**: 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"
   - **不要**添加 .gitignore 或 license (因为我们已经有了)
4. 点击 "Create repository"

## 步骤 2: 添加远程仓库并推送

创建仓库后，GitHub 会显示设置说明。请复制您的仓库 URL，然后运行以下命令：

```bash
# 添加远程仓库 (替换为您的实际仓库 URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

## 步骤 3: 配置 NPM 发布权限 (可选)

如果您想使用自动发布功能，需要在 GitHub 仓库中设置 NPM_TOKEN：

1. 在 [npmjs.com](https://www.npmjs.com) 创建账户并生成 Access Token
2. 在 GitHub 仓库中，进入 Settings > Secrets and variables > Actions
3. 点击 "New repository secret"
4. Name: `NPM_TOKEN`
5. Secret: 粘贴您的 NPM Access Token
6. 点击 "Add secret"

## 步骤 4: 验证设置

推送成功后，您可以：

1. 在 GitHub 仓库页面查看所有文件
2. 检查 Actions 标签页，确认 CI/CD 工作流已正确配置
3. 查看 README.md 文件中的项目说明

## 下一步

- 查看 `README-PUBLISH.md` 了解如何使用自动发布功能
- 查看 `README-SDK-USAGE.md` 了解如何使用生成的 SDK
- 查看 `examples/` 目录中的示例文件

---

**注意**: 请将上述命令中的 `YOUR_USERNAME` 和 `YOUR_REPOSITORY_NAME` 替换为您的实际 GitHub 用户名和仓库名称。