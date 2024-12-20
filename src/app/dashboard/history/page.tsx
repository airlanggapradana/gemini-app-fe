import React from "react";
import { cookies } from "next/headers";
import { getUserSession } from "@/lib/storeToken";
import LatestPrompt from "@/components/LatestPrompt";
import BackButton from "@/components/BackButton";

const History = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) return null;

  const userData = await getUserSession(accessToken);

  return (
    <>
      <div className="mb-10 flex flex-col items-start justify-center">
        <BackButton />
        <div className="mb-5 w-full space-y-3">
          <h1 className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent">
            History
          </h1>
          <p className="text-base font-medium leading-relaxed text-gray-500">
            Riwayat prompt Anda dapat dilihat di halaman ini. Informasi prompt
            yang ditampilkan mencakup tanggal, waktu, dan detail prompt lainnya.
          </p>
        </div>

        <div className="mt-7 w-full space-y-5">
          <h1 className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent">
            Terbaru
          </h1>

          <LatestPrompt user_id={userData.user_id} />
        </div>
      </div>
    </>
  );
};

export default History;
