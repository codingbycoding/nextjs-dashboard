// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

import {
  User, Customer, Color, Glass, Format, Order,
} from '../../models/models'

const ids = [
  10000,
  10001,
  10002,
  10003,
]

export const users : User[] = [
  {
    name: '大金',
    mobile: 15618953660,
    password: '953660',
  },
  {
    name: '二钥',
    mobile: 18521019489,
    password: '019489',
  },
]

export const customers : Customer[] = [
  {
    userID: 0,
    name: '大金',
    mobile: 15618953660,
    encoded_data: '',
  },
  {
    userID: 0,
    name: '二钥',
    mobile: 18521019489,
    encoded_data: '',
  },
]

export const formats : Format[] = [
  {
    name: '打85移门料子',
    userID: ids[0],
    equation: '',
    createTime: new Date('2023-11-14 12:00:01'),
  },
  {
    name: '极窄双扇1635',
    userID: ids[0],
    equation: '',
    createTime: new Date('2024-01-14 12:00:01'),
  },
  {
    name: '极窄三联动1635(不锈钢下轨)',
    userID: ids[0],
    equation: '',
    createTime: new Date('2024-02-14 12:00:01'),
  },
]

export const colors : Color[] = [
  {
    name: '白玻',
    userID: ids[0],
    createTime: new Date('2023-11-14 12:00:01'),
    note: '',
  },
  {
    name: '彩玻',
    userID: ids[0],
    createTime: new Date('2024-01-14 12:00:01'),
    note: '',
  },
]

export const glasses : Glass[] = [
  {
    name: '白玻',
    userID: ids[0],
    createTime: new Date('2023-11-14 12:00:01'),
    note: '',
  },
  {
    name: '彩玻',
    userID: ids[0],
    createTime: new Date('2024-01-14 12:00:01'),
    note: '',
  },
  {
    name: '磨砂玻',
    userID: ids[0],
    createTime: new Date('2024-02-14 12:00:01'),
    note: '',
  },
]

export const orders : Order[] = [
  {
    id: 10000,
    userID: ids[0],
    formatID: ids[0],

    note: '庙头李四 极窄双扇1635',
    width: 2100,
    height: 1800,
    createTime: new Date('2024-02-06 12:00:01'),
    customerID: 0,
    formatName: '',
    equation: '',
    encoded_equation: '',
  },
  {
    id: 10001,
    userID: ids[0],
    formatID: ids[0],

    note: '双勾南王五 极窄双扇1635',
    width: 2100,
    height: 1800,

    createTime: new Date('2024-01-14 14:00:01'),
    customerID: 0,
    formatName: '',
    equation: '',
    encoded_equation: '',
  },
  {
    id: 10002,
    userID: ids[0],
    formatID: ids[0],

    note: '河东张三 极窄双扇1635',
    width: 2100,
    height: 1800,

    createTime: new Date('2023-08-05 15:00:01'),
    customerID: 0,
    formatName: '',
    equation: '',
    encoded_equation: '',
  },
]
