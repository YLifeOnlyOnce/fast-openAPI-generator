/**
 * 生成器测试
 */

import path from 'path';
import fs from 'fs';
import { generateSDK } from '../core/generator';

describe('SDK生成器', () => {
  const testOutputDir = path.join(__dirname, '../../test-output');
  const testInputFile = path.join(__dirname, '../../example/petstore.yaml');
  
  // 每次测试后清理输出目录
  afterEach(() => {
    if (fs.existsSync(testOutputDir)) {
      fs.rmSync(testOutputDir, { recursive: true, force: true });
    }
  });
  
  it('应该成功生成SDK', async () => {
    // 确保测试输入文件存在
    expect(fs.existsSync(testInputFile)).toBe(true);
    
    // 生成SDK
    await generateSDK({
      input: testInputFile,
      output: testOutputDir,
      generateIndex: true,
      format: true
    });
    
    // 验证输出目录和文件
    expect(fs.existsSync(testOutputDir)).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, 'index.ts'))).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, 'httpClient.ts'))).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, 'types'))).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, 'services'))).toBe(true);
    
    // 验证服务文件
    expect(fs.existsSync(path.join(testOutputDir, 'services', 'PetService.ts'))).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, 'services', 'StoreService.ts'))).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, 'services', 'UserService.ts'))).toBe(true);
    
    // 验证类型文件
    expect(fs.existsSync(path.join(testOutputDir, 'types', 'Pet.ts'))).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, 'types', 'NewPet.ts'))).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, 'types', 'Pets.ts'))).toBe(true);
    expect(fs.existsSync(path.join(testOutputDir, 'types', 'User.ts'))).toBe(true);
  });
});