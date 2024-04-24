export type User = {
  id: number;
  name: string;
  mobile: string;
  password: string;
}

export type Order = {
  id: number;
  userID: number;
  formatID: number;
  note: string;
  width: number;
  height: number;
  shangXiaGui: number;
  shangXiaFang: number;
  guangQi: number;
  gouQi: number;
  bianFeng: number;
  glassWidth: number;
  glassHeight: number;
  timestamp: Date;
}
