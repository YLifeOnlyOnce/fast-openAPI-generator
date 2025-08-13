/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface IPet {
  /**
   * 宠物ID
   * @format int64
   */
  id: number;
  /** 宠物名称 */
  name: string;
  /** 宠物标签 */
  tag?: string;
  /** 宠物状态 */
  status?: "available" | "pending" | "sold";
}

export interface INewPet {
  /** 宠物名称 */
  name: string;
  /** 宠物标签 */
  tag?: string;
}

export type IPets = IPet[];

export interface IUser {
  /**
   * 用户ID
   * @format int64
   */
  id?: number;
  /** 用户名 */
  username?: string;
  /** 名 */
  firstName?: string;
  /** 姓 */
  lastName?: string;
  /** 电子邮件 */
  email?: string;
  /** 密码 */
  password?: string;
  /** 电话号码 */
  phone?: string;
  /**
   * 用户状态
   * @format int32
   */
  userStatus?: number;
}
