"use server";
import { jwtPayload } from "@/types/api";
import { cookies } from "next/headers";

export const storeToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token);
};

export const isTokenExpired = async (token: string) => {
  const arrayToken = token.split(".");
  const tokenPayload: jwtPayload = JSON.parse(atob(arrayToken[1] || ""));
  return Math.floor(new Date().getTime() / 1000) >= tokenPayload.exp;
};

export const getUserSession = async (token: string) => {
  const arrayToken = token.split(".");
  const tokenPayload: jwtPayload = JSON.parse(atob(arrayToken[1] || ""));
  return tokenPayload;
};

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
};
