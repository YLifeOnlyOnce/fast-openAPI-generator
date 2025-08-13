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

export class Stores<SecurityDataType = unknown> extends HttpClient<SecurityDataType>  {

            /**
 * @description 返回宠物商店的库存状态
 *
 * @tags store
 * @name GetInventory
 * @summary 获取库存信息
 * @request GET:/stores/inventory
 */
getInventory: (params: RequestParams = {}) =>
    this.request<Record<string,number>, any>({
        path: `/stores/inventory`,
        method: 'GET',
                                        format: "json",        ...params,
    }),    }
