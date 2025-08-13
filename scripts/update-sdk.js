#!/usr/bin/env node
/**
 * SDK更新脚本
 * 用于在API规范更新时自动生成SDK并更新版本
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置项
const config = {
  // OpenAPI规范文件路径
  specFile: process.argv[2] || 'example/petstore.yaml',
  // SDK输出目录
  outputDir: process.argv[3] || 'sdk',
  // 版本更新类型: patch, minor, major
  versionType: process.argv[4] || 'patch'
};

try {
  // 检查规范文件是否存在
  if (!fs.existsSync(path.resolve(config.specFile))) {
    console.error(`错误: OpenAPI规范文件 "${config.specFile}" 不存在`);
    process.exit(1);
  }

  // 生成SDK
  console.log(`从 ${config.specFile} 生成SDK到 ${config.outputDir} 目录...`);
  execSync(`npm run generate -- generate -i ${config.specFile} -o ${config.outputDir}`, { stdio: 'inherit' });

  // 运行测试
  console.log('运行测试...');
  execSync('npm test', { stdio: 'inherit' });

  // 如果测试通过，更新版本并发布
  console.log(`更新${config.versionType}版本并发布...`);
  execSync(`node scripts/publish.js ${config.versionType}`, { stdio: 'inherit' });

  console.log('✅ SDK更新和发布完成');
} catch (error) {
  console.error('SDK更新失败:', error.message);
  process.exit(1);
}