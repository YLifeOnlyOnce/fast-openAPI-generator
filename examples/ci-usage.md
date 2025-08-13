# CI环境中使用SDK发布功能

本文档提供了在CI环境中使用SDK发布功能的示例。

## GitHub Actions工作流示例

以下是一个完整的GitHub Actions工作流示例，用于在API规范更新时自动生成和发布SDK：

```yaml
name: 更新并发布SDK

on:
  # 当API规范文件更新时触发
  push:
    branches: [main]
    paths:
      - 'api-specs/**/*.yaml'
      - 'api-specs/**/*.json'
  # 允许手动触发
  workflow_dispatch:
    inputs:
      version_type:
        description: '版本更新类型 (patch, minor, major)'
        required: true
        default: 'patch'
        type: choice
        options:
          - patch
          - minor
          - major

jobs:
  update-and-publish:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@v3

      - name: 设置Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          registry-url: 'https://registry.npmjs.org'

      - name: 安装依赖
        run: npm ci

      # 如果是手动触发，使用输入的版本类型
      - name: 更新SDK并发布(手动触发)
        if: github.event_name == 'workflow_dispatch'
        run: node scripts/update-sdk.js api-specs/main.yaml sdk ${{ github.event.inputs.version_type }}
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      # 如果是由文件更改触发，使用默认的patch版本
      - name: 更新SDK并发布(自动触发)
        if: github.event_name == 'push'
        run: npm run update-sdk
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## GitLab CI/CD示例

以下是一个GitLab CI/CD配置示例：

```yaml
stages:
  - build
  - test
  - publish

build:
  stage: build
  image: node:16
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

test:
  stage: test
  image: node:16
  script:
    - npm ci
    - npm test

publish:
  stage: publish
  image: node:16
  script:
    - npm ci
    - npm run update-sdk
  only:
    changes:
      - api-specs/**/*.yaml
      - api-specs/**/*.json
    refs:
      - main
  environment:
    name: production
  variables:
    NPM_TOKEN: ${NPM_TOKEN}
```

## Jenkins Pipeline示例

以下是一个Jenkins Pipeline示例：

```groovy
pipeline {
    agent {
        docker {
            image 'node:16'
        }
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Publish') {
            when {
                anyOf {
                    changeset 'api-specs/**/*.yaml'
                    changeset 'api-specs/**/*.json'
                }
            }
            steps {
                withCredentials([string(credentialsId: 'npm-token', variable: 'NPM_TOKEN')]) {
                    sh 'npm run update-sdk'
                }
            }
        }
    }
}
```

## 注意事项

1. 确保CI环境中设置了正确的NPM_TOKEN环境变量
2. 根据实际项目结构调整API规范文件的路径
3. 考虑添加版本控制策略，避免不必要的频繁发布