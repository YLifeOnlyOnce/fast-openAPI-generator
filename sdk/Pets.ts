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


 import type { AxiosRequestConfig, AxiosResponse } from "axios"; 
import { HttpClient, RequestParams, ContentType, HttpResponse } from "./http-client";
import { IPet, INewPet, IPets, IUser } from "./data-contracts"

export class Pets<SecurityDataType = unknown> extends HttpClient<SecurityDataType>  {

            /**
 * @description 返回所有宠物的列表
 *
 * @tags pet
 * @name ListPets
 * @summary 列出所有宠物
 * @request GET:/pets
 */
listPets: (query?: {
  /**
   * 返回宠物的最大数量
   * @format int32
   */
    limit?: number,

}, params: RequestParams = {}) =>
    this.request<IPets, any>({
        path: `/pets`,
        method: 'GET',
        query: query,                                format: "json",        ...params,
    }),            /**
 * @description 创建一个新的宠物
 *
 * @tags pet
 * @name CreatePet
 * @summary 创建宠物
 * @request POST:/pets
 */
createPet: (data: INewPet, params: RequestParams = {}) =>
    this.request<IPet, any>({
        path: `/pets`,
        method: 'POST',
                body: data,                type: ContentType.Json,        format: "json",        ...params,
    }),            /**
 * @description 返回单个宠物的详细信息
 *
 * @tags pet
 * @name GetPetById
 * @summary 获取宠物信息
 * @request GET:/pets/{petId}
 */
getPetById: (petId: string, params: RequestParams = {}) =>
    this.request<IPet, any>({
        path: `/pets/${petId}`,
        method: 'GET',
                                        format: "json",        ...params,
    }),            /**
 * @description 删除指定的宠物
 *
 * @tags pet
 * @name DeletePet
 * @summary 删除宠物
 * @request DELETE:/pets/{petId}
 */
deletePet: (petId: string, params: RequestParams = {}) =>
    this.request<void, any>({
        path: `/pets/${petId}`,
        method: 'DELETE',
                                                ...params,
    }),    }
