"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button variant={"outline"} onClick={() => router.back()}>
      <ArrowLeft />
    </Button>
  );
};

export default BackButton;
