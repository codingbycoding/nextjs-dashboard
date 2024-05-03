"use strict";
// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = exports.formats = exports.users = void 0;
var ids = [
    10000,
    10001,
    10002,
    10003,
];
exports.users = [
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
];
exports.formats = [
    {
        name: '打85移门料子',
        userID: ids[0],
        createTime: new Date('2023-11-14 12:00:01'),
    },
    {
        name: '极窄双扇1635',
        userID: ids[0],
        createTime: new Date('2024-01-14 12:00:01'),
    },
    {
        name: '极窄三联动1635(不锈钢下轨)',
        userID: ids[0],
        createTime: new Date('2024-02-14 12:00:01'),
    },
];
exports.orders = [
    {
        id: 10000,
        userID: ids[0],
        formatID: ids[0],
        note: '庙头李四 极窄双扇1635',
        width: 2100,
        height: 1800,
        shangXiaGui: 2096,
        shangXiaFang: 699.3,
        guangQi: 1719,
        gouQi: 0,
        bianFeng: 1800,
        glassWidth: 681.3,
        glassHeight: 1701,
        createTime: new Date('2024-02-06 12:00:01'),
    },
    {
        id: 10001,
        userID: ids[0],
        formatID: ids[0],
        note: '双勾南王五 极窄双扇1635',
        width: 2100,
        height: 1800,
        shangXiaGui: 2096,
        shangXiaFang: 699.3,
        guangQi: 1719,
        gouQi: 0,
        bianFeng: 1800,
        glassWidth: 681.3,
        glassHeight: 1701,
        createTime: new Date('2024-01-14 14:00:01'),
    },
    {
        id: 10002,
        userID: ids[0],
        formatID: ids[0],
        note: '河东张三 极窄双扇1635',
        width: 2100,
        height: 1800,
        shangXiaGui: 2096,
        shangXiaFang: 699.3,
        guangQi: 1719,
        gouQi: 0,
        bianFeng: 1800,
        glassWidth: 681.3,
        glassHeight: 1701,
        createTime: new Date('2023-08-05 15:00:01'),
    },
];
