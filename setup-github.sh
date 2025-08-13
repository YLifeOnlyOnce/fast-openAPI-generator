#!/bin/bash

# GitHub 仓库设置脚本
# 使用方法: ./setup-github.sh <your-github-username> <repository-name>

if [ $# -ne 2 ]; then
    echo "使用方法: $0 <github-username> <repository-name>"
    echo "示例: $0 yaoxiangbo openapi-typescript-sdk-generator"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME=$2
REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo "正在设置 GitHub 仓库..."
echo "仓库 URL: ${REPO_URL}"

# 检查是否已经有远程仓库
if git remote get-url origin > /dev/null 2>&1; then
    echo "警告: 远程仓库 'origin' 已存在"
    echo "当前远程仓库: $(git remote get-url origin)"
    read -p "是否要替换为新的仓库? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote remove origin
    else
        echo "操作已取消"
        exit 1
    fi
fi

# 添加远程仓库
echo "添加远程仓库..."
git remote add origin "${REPO_URL}"

# 设置主分支
echo "设置主分支为 main..."
git branch -M main

# 推送到 GitHub
echo "推送到 GitHub..."
if git push -u origin main; then
    echo "✅ 成功推送到 GitHub!"
    echo "🔗 仓库地址: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
    echo ""
    echo "下一步:"
    echo "1. 访问您的 GitHub 仓库页面"
    echo "2. 查看 GITHUB-SETUP.md 了解如何配置 NPM 发布权限"
    echo "3. 查看 README-PUBLISH.md 了解自动发布功能"
else
    echo "❌ 推送失败"
    echo "请确保:"
    echo "1. 您已在 GitHub 上创建了仓库: ${REPO_NAME}"
    echo "2. 您有推送权限"
    echo "3. 仓库 URL 正确"
    exit 1
fi