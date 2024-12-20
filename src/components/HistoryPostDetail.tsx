"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { getSingleHistory } from "@/actions/apiActions";

const HistoryPostDetail = ({ post_id }: { post_id: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["historyPostDetail", post_id],
    queryFn: async () => getSingleHistory(post_id),
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;
  return (
    <>
      <pre className="max-w-full overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  );
};

export default HistoryPostDetail;
