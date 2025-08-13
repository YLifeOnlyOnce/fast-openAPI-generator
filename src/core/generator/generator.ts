/**
 * SDK生成器
 * 使用swagger-typescript-api生成TypeScript SDK
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { SDKGenerateOptions } from '../types/types';

const execAsync = promisify(exec);

/**
 * 生成SDK
 * @param options SDK生成选项
 */
export async function generateSDK(options: SDKGenerateOptions): Promise<void> {
  const {
    input,
    output,
    packageName = 'openapi-typescript-sdk',
  } = options;
  
  // 确保输出目录存在
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }
  
  console.log(`开始生成SDK...`);
  console.log(`解析OpenAPI文件: ${path.resolve(input)}`);
  
  // 构建swagger-typescript-api命令
  const command = [
    'npx swagger-typescript-api generate',
    '-p', path.resolve(input),
    '-o', path.resolve(output),
    '-n', 'index.ts',
    '--axios',
    '--modular',
    '--clean-output',
    '--type-prefix=I',
    '--default-response-as-success',
    '--unwrap-response-data',
    `--name=${packageName}`
  ].join(' ');
  
  console.log('执行命令:', command);
  
  try {
    console.log('执行Swagger TypeScript API生成命令...');
    // 设置超时时间为2分钟
    const { stdout, stderr } = await execAsync(command, { timeout: 120000, maxBuffer: 5 * 1024 * 1024 });
    
    if (stderr && stderr.trim()) {
      console.warn('警告:', stderr);
    }
    
    console.log('生成输出:', stdout);
    console.log(`SDK生成完成! 输出目录: ${output}`);
  } catch (error) {
    console.error('执行SDK生成命令失败:', error);
    throw error;
  }
}