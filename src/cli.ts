#!/usr/bin/env node
/**
 * 命令行接口
 * 使用户可以通过命令行工具生成SDK
 */

import path from 'path';
import { program } from 'commander';
import chalk from 'chalk';
import { generateSDK } from './core/generator';
import { SDKGenerateOptions } from './core/types';

// 设置CLI版本和描述
program
  .version('1.0.0')
  .description('将OpenAPI规范转换为TypeScript SDK');

// 添加生成命令
program
  .command('generate')
  .description('生成TypeScript SDK')
  .requiredOption('-i, --input <path>', 'OpenAPI规范文件路径 (yaml或json)')
  .option('-o, --output <path>', '输出目录', './sdk')
  .option('-p, --package-name <name>', '生成的包名', 'openapi-typescript-sdk')
  .action(async (options) => {
    try {
      console.log(chalk.blue('开始生成SDK...'));
      
      const sdkOptions: SDKGenerateOptions = {
        input: path.resolve(options.input),
        output: path.resolve(options.output),
        packageName: options.packageName
      };
      
      await generateSDK(sdkOptions);
      
      console.log(chalk.green('✓ SDK生成成功!'));
      console.log(`输出目录: ${chalk.cyan(sdkOptions.output)}`);
    } catch (error) {
      console.error(chalk.red('生成SDK失败:'), (error as Error).message);
      process.exit(1);
    }
  });

// 解析命令行参数
program.parse(process.argv);

// 如果没有提供命令，显示帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp();
}