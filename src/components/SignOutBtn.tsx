"use client";
import React from "react";
import { Button } from "./ui/button";
import { removeToken } from "@/lib/storeToken";
import { useRouter } from "next/navigation";

const SignOutBtn = () => {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        removeToken();
        router.refresh();
      }}
    >
      Sign Out
    </Button>
  );
};

export default SignOutBtn;
