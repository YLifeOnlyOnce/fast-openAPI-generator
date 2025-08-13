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

export class Users<SecurityDataType = unknown> extends HttpClient<SecurityDataType>  {

            /**
 * @description 创建一个新用户
 *
 * @tags user
 * @name CreateUser
 * @summary 创建用户
 * @request POST:/users
 */
createUser: (data: IUser, params: RequestParams = {}) =>
    this.request<IUser, any>({
        path: `/users`,
        method: 'POST',
                body: data,                type: ContentType.Json,        format: "json",        ...params,
    }),            /**
 * @description 获取指定用户的详细信息
 *
 * @tags user
 * @name GetUserByName
 * @summary 获取用户信息
 * @request GET:/users/{username}
 */
getUserByName: (username: string, params: RequestParams = {}) =>
    this.request<IUser, any>({
        path: `/users/${username}`,
        method: 'GET',
                                        format: "json",        ...params,
    }),    }
