/**
 * 示例：如何使用生成的SDK
 */
// @ts-nocheck

import axios from 'axios';
import { Pets } from '../sdk/Pets';
import { Stores } from '../sdk/Stores';
import { Users } from '../sdk/Users';
import { Pet, NewPet, Pets as PetsType, User } from '../sdk/Api';
import { IPet, INewPet, IPets, IUser } from '../sdk/data-contracts';

// 创建API实例，使用相同的baseURL
const baseURL = 'https://petstore.swagger.io/v1';
const petApi = new Pets({ baseURL });
const storeApi = new Stores({ baseURL });
const userApi = new Users({ baseURL });

// 第2步：使用生成的API
async function example() {
  try {
    // 获取宠物列表
    const petsResponse = await petApi.listPets({ limit: 10 });
    console.log('宠物列表:', petsResponse);

    // 创建新宠物
    const newPetResponse = await petApi.createPet({
      name: '小花',
      tag: '猫'
    });
    console.log('创建的宠物:', newPetResponse);

    // 获取宠物详情
    const petId = newPetResponse.id;
    const petResponse = await petApi.getPetById(petId);
    console.log('宠物详情:', petResponse);

    // 获取库存信息
    const inventoryResponse = await storeApi.getInventory();
    console.log('库存信息:', inventoryResponse);

    // 创建用户
    const userResponse = await userApi.createUser({
      username: 'testuser',
      firstName: '张',
      lastName: '三',
      email: 'test@example.com',
      password: 'password123',
      phone: '13800138000'
    });
    console.log('创建的用户:', userResponse);

    // 获取用户信息
    const userInfoResponse = await userApi.getUserByName('testuser');
    console.log('用户信息:', userInfoResponse);

  } catch (error) {
    console.error('API调用失败:', error);
  }
}

// 运行示例
example();