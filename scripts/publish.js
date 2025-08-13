#!/usr/bin/env node
/**
 * 发布脚本
 * 用于自动更新版本并发布到npm
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
const versionType = args[0] || 'patch'; // 默认为patch版本更新
const packagePath = path.resolve(__dirname, '../package.json');

// 验证版本类型
if (!['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease'].includes(versionType)) {
  console.error(`错误: 无效的版本类型 "${versionType}". 有效选项: major, minor, patch, premajor, preminor, prepatch, prerelease`);
  process.exit(1);
}

try {
  // 读取当前package.json
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const currentVersion = packageJson.version;
  console.log(`当前版本: ${currentVersion}`);

  // 更新版本号
  console.log(`更新${versionType}版本...`);
  execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });

  // 读取更新后的package.json获取新版本号
  const updatedPackageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const newVersion = updatedPackageJson.version;
  console.log(`新版本: ${newVersion}`);

  // 构建项目
  console.log('构建项目...');
  execSync('npm run build', { stdio: 'inherit' });

  // 发布到npm
  console.log('发布到npm...');
  execSync('npm publish', { stdio: 'inherit' });

  console.log(`✅ 成功发布版本 ${newVersion}`);
} catch (error) {
  console.error('发布失败:', error.message);
  process.exit(1);
}