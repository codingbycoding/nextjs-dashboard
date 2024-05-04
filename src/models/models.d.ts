export type User = {
  id?: number;
  name: string;
  mobile: number;
  password: string;
  createTime?: Date;
  deleteTime?: Date;
}

export type Format = {
  id?: number;
  userID: number;
  name: string;
  equation: string;
  createTime?: Date;
  deleteTime?: Date;
}

export type Order = {
  id?: number;
  userID?: number;
  formatID?: number;
  formatName?: string;
  note?: string;
  width?: number;
  height?: number;
  shangXiaGui?: number;
  shangXiaFang?: number;
  guangQi?: number;
  gouQi?: number;
  bianFeng?: number;
  glassWidth?: number;
  glassHeight?: number;
  equation?: string;
  createTime?: Date;
  deleteTime?: Date;
}
