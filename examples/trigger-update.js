#!/usr/bin/env node
/**
 * API更新后触发SDK生成和发布的示例脚本
 * 可以集成到API项目的CI/CD流程中
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 配置
const config = {
  // SDK项目路径
  sdkProjectPath: process.env.SDK_PROJECT_PATH || path.resolve(__dirname, '..'),
  // OpenAPI规范文件路径
  specFilePath: process.env.SPEC_FILE_PATH || path.resolve(__dirname, '../example/petstore.yaml'),
  // 版本更新类型
  versionType: process.env.VERSION_TYPE || 'patch'
};

/**
 * 触发SDK更新和发布
 */
function triggerSdkUpdate() {
  console.log('开始触发SDK更新和发布流程...');
  
  try {
    // 切换到SDK项目目录
    process.chdir(config.sdkProjectPath);
    console.log(`当前工作目录: ${process.cwd()}`);
    
    // 安装依赖
    console.log('安装依赖...');
    execSync('npm ci', { stdio: 'inherit' });
    
    // 调用update-sdk脚本
    console.log(`使用规范文件 ${config.specFilePath} 更新SDK...`);
    execSync(
      `node scripts/update-sdk.js "${config.specFilePath}" sdk ${config.versionType}`,
      { stdio: 'inherit' }
    );
    
    console.log('✅ SDK更新和发布成功!');
    return true;
  } catch (error) {
    console.error('❌ SDK更新和发布失败:', error.message);
    return false;
  }
}

// 执行更新
if (require.main === module) {
  const success = triggerSdkUpdate();
  process.exit(success ? 0 : 1);
}

module.exports = { triggerSdkUpdate };