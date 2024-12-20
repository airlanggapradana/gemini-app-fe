"use client";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { deleteHistory, getSingleHistory } from "@/actions/apiActions";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";

const HistoryPostDetail = ({ post_id }: { post_id: string }) => {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["historyPostDetail", post_id],
    queryFn: async () => getSingleHistory(post_id),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["deleteHistory"],
    mutationFn: async () => deleteHistory(post_id),
    onSuccess: () => {
      alert(`History with id ${post_id} has been deleted`);
      router.back();
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  const result = data.data;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{result.data.prompt}</CardTitle>
        <CardDescription>
          {format(result.data.createdAt, "PPPP", { locale: id })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p dangerouslySetInnerHTML={{ __html: result.data.result }}></p>
      </CardContent>
      <CardFooter>
        <Button
          variant={"destructive"}
          onClick={() => mutateAsync()}
          disabled={isPending}
        >
          Delete History
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HistoryPostDetail;
