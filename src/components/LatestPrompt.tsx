"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/actions/apiActions";
import { format, isPast } from "date-fns";
import { id } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const LatestPrompt = ({ user_id }: { user_id: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["latestPrompt", user_id],
    queryFn: async () => getHistory(user_id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!data) return <p>No data</p>;

  const latestPrompt = data.data
    .filter((item) => isPast(item.createdAt))
    .reverse();
  return (
    <div className="grid grid-cols-3 gap-5">
      {latestPrompt.map((item) => (
        <Link key={item.id} href={`/dashboard/history/${item.id}`}>
          <PromptCard
            prompt={item.prompt}
            result={item.result}
            createdAt={item.createdAt}
          />
        </Link>
      ))}
    </div>
  );
};

const PromptCard = ({
  prompt,
  result,
  createdAt,
}: {
  prompt: string;
  result: string;
  createdAt: Date;
}) => {
  const limitPromptWord = prompt.slice(0, 20);
  const limitResultWord = result.slice(0, 20);
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>
          {prompt.length > 10 ? `${limitPromptWord}...` : prompt}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          dangerouslySetInnerHTML={{
            __html: result.length > 10 ? `${limitResultWord}...` : result,
          }}
        ></p>
      </CardContent>
      <CardFooter>
        <p>{format(createdAt, "PPPP", { locale: id })}</p>
      </CardFooter>
    </Card>
  );
};

export default LatestPrompt;
