import axios from "axios";
import { env } from "@/env";
import { register as Register, login as Login } from "@/types/api";

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
