/* eslint-disable @typescript-eslint/no-unused-vars */
export type User = {
  id?: number;
  name: string;
  mobile: number;
  password: string;
  createTime?: Date;
  deleteTime?: Date;
}

export type Customer = {
  id?: number;
  userID: number;
  name: string;
  mobile: number;
  encoded_data: string;
  kvs?: object;
  createTime?: Date;
  deleteTime?: Date;
}

export type Color = {
  id?: number;
  userID: number;
  name: string;
  note: string;
  list?: string;
  createTime?: Date;
  deleteTime?: Date;
}

export type Glass = {
  id?: number;
  userID: number;
  name: string;
  note: string;
  list?: string;
  createTime?: Date;
  deleteTime?: Date;
}

export type Format = {
  id?: number;
  userID: number;
  name: string;
  hasUpWindows: boolean;
  equation: object[] | string;
  createTime?: Date;
  deleteTime?: Date;
}

// order Status
const Depositing = 0
const Printing = 1
const Finishing = 2

export type Order = {
  id?: number;
  userID: number;
  customerID: number;
  formatID: number;
  formatName: string;
  note: string;
  count: number;
  width: number;
  height: number;
  status: number;
  totalPrice: number;
  equation: object[] | string;
  encoded_equation: string;
  createTime: Date;
  deleteTime?: Date;
}
