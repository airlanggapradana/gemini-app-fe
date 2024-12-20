export interface register {
  message: string;
  data: Data;
}

export interface Data {
  user_id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface login {
  message: string;
  data: Payload;
}

export interface Payload {
  user_id: string;
  fname: string;
  lname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
}

export interface jwtPayload {
  user_id: string;
  fname: string;
  lname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  iat: number;
  exp: number;
}

export interface History {
  message: string;
  data: HistoryData;
}

export interface HistoryData {
  id: string;
  prompt: string;
  result: string;
  createdAt: Date;
  history_id: string;
}

export interface User {
  message: string;
  data: UserData;
}

export interface UserData {
  user_id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  histories: History[];
}

export interface History {
  id: string;
  prompt: string;
  result: string;
  createdAt: Date;
  history_id: string;
}

export interface SinglePost {
  message: string;
  data: SinglePostData;
}

export interface SinglePostData {
  id: string;
  prompt: string;
  result: string;
  createdAt: Date;
  history_id: string;
}
