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
