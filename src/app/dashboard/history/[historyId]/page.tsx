import BackButton from "@/components/BackButton";
import HistoryPostDetail from "@/components/HistoryPostDetail";
import React from "react";

const HistoryDetail = async ({
  params,
}: {
  params: Promise<{ historyId: string }>;
}) => {
  const historyId = (await params).historyId;
  return (
    <main className="w-full space-y-5">
      <BackButton />
      <HistoryPostDetail post_id={historyId} />
    </main>
  );
};

export default HistoryDetail;
