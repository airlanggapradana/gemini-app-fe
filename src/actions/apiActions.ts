import axios from "axios";
import { env } from "@/env";
import {
  register as Register,
  login as Login,
  History,
  User,
  SinglePost,
} from "@/types/api";

export const register = async (data: {
  fname: string;
  lname: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(`${env.NEXT_PUBLIC_API_PORT}/user`, data);
  return {
    status: res.status,
    data: res.data as Register,
  };
};

export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${env.NEXT_PUBLIC_API_PORT}/login`, data);
  return {
    status: res.status,
    data: res.data as Login,
  };
};

export const storePromptAndResult = async (payload: {
  prompt: string;
  result: string;
  user_id: string;
}) => {
  const result = payload.result;
  const prompt = payload.prompt;
  const res = await axios.post(
    `${env.NEXT_PUBLIC_API_PORT}/history/${payload.user_id}`,
    { prompt, result },
  );

  return {
    status: res.status,
    data: res.data as History,
  };
};

export const getHistory = async (user_id: string) => {
  const res = await axios.get(`${env.NEXT_PUBLIC_API_PORT}/user/${user_id}`);

  const data = res.data as User;

  const history = data.data.histories;

  return {
    status: res.status,
    data: history,
  };
};

export const getSingleHistory = async (post_id: string) => {
  const res = await axios.get(`${env.NEXT_PUBLIC_API_PORT}/history/${post_id}`);

  return {
    status: res.status,
    data: res.data as SinglePost,
  };
};

export const deleteHistory = async (post_id: string) => {
  const res = await axios.delete(
    `${env.NEXT_PUBLIC_API_PORT}/history/${post_id}`,
  );

  return {
    status: res.status,
    data: res.data as { message: string },
  };
};
