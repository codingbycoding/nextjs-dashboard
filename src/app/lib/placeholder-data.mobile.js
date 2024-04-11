// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const ids = [
  10000,
  10001,
  10002,
  10003,
]

const users = [
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

const formats = [
  {
    name: '打85移门料子',
    user_id: ids[0],
    timestamp: '2023-11-14 12:00:01',
  },
  {
    name: '极窄双扇1635',
    user_id: ids[0],
    timestamp: '2024-01-14 12:00:01',
  },
  {
    name: '极窄三联动1635(不锈钢下轨)',
    user_id: ids[0],
    timestamp: '2024-02-14 12:00:01',
  },
]

const orders = [
  {
    id: 10000,
    user_id: ids[0],
    format_id: ids[0],

    note: '庙头李四 极窄双扇1635',
    width: 2100,
    height: 1800,
    shang_xia_gui: 2096,
    shang_xia_fang: 699.3,
    guang_qi: 1719,
    gou_qi: 0,
    bian_feng: 1800,
    glass_width: 681.3,
    glass_height: 1701,

    timestamp: '2024-02-06 12:00:01',
  },
  {
    id: 10001,
    user_id: ids[0],
    format_id: ids[0],

    note: '双勾南王五 极窄双扇1635',
    width: 2100,
    height: 1800,
    shang_xia_gui: 2096,
    shang_xia_fang: 699.3,
    guang_qi: 1719,
    gou_qi: 0,
    bian_feng: 1800,
    glass_width: 681.3,
    glass_height: 1701,

    timestamp: '2024-01-14 14:00:01',
  },
  {
    id: 10002,
    user_id: ids[0],
    format_id: ids[0],

    note: '河东张三 极窄双扇1635',
    width: 2100,
    height: 1800,
    shang_xia_gui: 2096,
    shang_xia_fang: 699.3,
    guang_qi: 1719,
    gou_qi: 0,
    bian_feng: 1800,
    glass_width: 681.3,
    glass_height: 1701,

    timestamp: '2023-08-05 15:00:01',
  },
]

module.exports = {
  users,
  formats,
  orders,
}
