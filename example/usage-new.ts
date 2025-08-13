/**
 * 示例：如何使用生成的SDK类型定义
 */

import axios from 'axios';
import { Pet, NewPet, Pets, User } from '../sdk/Api';

// 注意：这是一个模拟示例，实际API可能不可用
// 在实际项目中，请替换为真实的API端点
const baseURL = 'https://petstore.swagger.io/v1';

// 创建axios实例
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 模拟API响应
const mockResponses = {
  pets: [
    { id: 1, name: '小黑', tag: '狗' },
    { id: 2, name: '小白', tag: '猫' }
  ],
  newPet: { id: 3, name: '小花', tag: '猫' },
  inventory: { available: 10, pending: 5, sold: 20 },
  user: { username: 'testuser', firstName: '张', lastName: '三', email: 'test@example.com' }
};

// 使用生成的类型定义和模拟数据
async function example() {
  try {
    console.log('===== 使用生成的类型定义示例 =====');
    
    // 模拟获取宠物列表
    console.log('\n获取宠物列表:');
    const pets: Pets = mockResponses.pets;
    console.log(pets);

    // 模拟创建新宠物
    console.log('\n创建新宠物:');
    const newPet: NewPet = {
      name: '小花',
      tag: '猫'
    };
    console.log('请求数据:', newPet);
    const createdPet: Pet = mockResponses.newPet;
    console.log('响应数据:', createdPet);

    // 模拟获取宠物详情
    console.log('\n获取宠物详情:');
    const petId = createdPet.id;
    console.log(`请求宠物ID: ${petId}`);
    console.log('响应数据:', createdPet);

    // 模拟获取库存信息
    console.log('\n获取库存信息:');
    const inventory: Record<string, number> = mockResponses.inventory;
    console.log(inventory);

    // 模拟创建用户
    console.log('\n创建用户:');
    const newUser: User = {
      username: 'testuser',
      firstName: '张',
      lastName: '三',
      email: 'test@example.com',
      password: 'password123',
      phone: '13800138000'
    };
    console.log('请求数据:', newUser);
    const user: User = mockResponses.user;
    console.log('响应数据:', user);

    // 模拟获取用户信息
    console.log('\n获取用户信息:');
    console.log(`请求用户名: ${user.username}`);
    console.log('响应数据:', user);

    console.log('\n===== 示例结束 =====');
    console.log('注意：这是使用模拟数据的示例，实际使用时请替换为真实API调用');

  } catch (error) {
    console.error('示例运行失败:', error);
  }
}

// 运行示例
example();