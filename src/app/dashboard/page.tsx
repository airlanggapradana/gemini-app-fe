import React from "react";
import { cookies } from "next/headers";
import { getUserSession } from "@/lib/storeToken";
import Link from "next/link";
import WordPullUp from "@/components/ui/word-pull-up";
import TypingAnimation from "@/components/ui/typing-animation";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import UserPrompt from "@/components/UserPrompt";

const Dashboard = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) return null;
  const userData = await getUserSession(accessToken);
  return (
    <>
      <div className="mb-10 flex h-screen flex-col justify-center gap-5">
        <div className="space-y-2 text-center">
          <WordPullUp
            words={`Halo! ${userData.fname}`}
            className="text-lg font-normal leading-none tracking-tighter"
          />
          <TypingAnimation
            className="text-5xl font-bold leading-normal"
            text="Selamat Datang di Gemini API"
            duration={100}
          />
          <p className="mx-auto max-w-md text-base leading-relaxed text-gray-500">
            Selamat bergabung di aplikasi kami! Kami senang Anda telah memilih
            kami sebagai bagian dari pengalaman Anda.
          </p>
        </div>
        <div className="mx-auto flex max-w-lg items-center gap-5">
          <Link
            href={"#panduan"}
            className="mx-auto w-[15rem] rounded-md bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 px-8 py-3 text-center text-sm font-bold text-white shadow-md"
          >
            Lihat Panduan
          </Link>
          <Link
            href={"#"}
            className="mx-auto w-[15rem] rounded-md bg-gradient-to-tr from-gray-700 to-indigo-500 px-8 py-3 text-center text-sm font-bold text-white shadow-md"
          >
            Github Repository
          </Link>
        </div>
      </div>

      <div className="mb-20 flex flex-col gap-5" id="panduan">
        <div className="space-y-3">
          <h1 className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent">
            Panduan Penggunaan
          </h1>
          <p className="text-base font-medium text-gray-500">
            Gunakan aplikasi kami dengan ikuti langkah-langkah yang disediakan.
          </p>
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>

      <UserPrompt />
    </>
  );
};

export default Dashboard;
