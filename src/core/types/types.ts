/**
 * 类型定义
 */

/**
 * SDK生成选项
 */
export interface SDKGenerateOptions {
  /** 输入的OpenAPI规范文件路径 */
  input: string;
  /** 输出目录 */
  output: string;
  /** 生成的包名 */
  packageName?: string;
  /** 是否生成索引文件 */
  generateIndex?: boolean;
  /** 是否格式化生成的代码 */
  format?: boolean;
}