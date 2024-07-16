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
  equation: object[] | string;
  createTime?: Date;
  deleteTime?: Date;
}

export type Order = {
  id?: number;
  userID: number;
  customerID: number;
  formatID: number;
  formatName: string;
  note: string;
  width: number;
  height: number;
  equation: object[] | string;
  encoded_equation: string;
  createTime: Date;
  deleteTime?: Date;
}
