import React from "react";
import { cookies } from "next/headers";
import { isTokenExpired } from "@/lib/storeToken";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Github, Instagram } from "lucide-react";
import Link from "next/link";
import TanstackProvider from "@/lib/TanstackProvider";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    return redirect("/login");
  }

  try {
    const tokenExpired = await isTokenExpired(accessToken);
    if (tokenExpired) {
      return <p>Your session has expired. Please log in again.</p>;
    }
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return <p>There was an error verifying your session. Please try again.</p>;
  }

  return (
    <TanstackProvider>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-full">
          <div className="mx-auto max-w-screen-xl px-5">{children}</div>
          <footer className="mx-auto max-w-screen-xl border-t-2 px-5 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-light text-gray-400">
                Created by Airlangga Pradana
              </p>
              <div className="flex items-center gap-5">
                <Link href={"#"}>
                  <Github opacity={0.5} size={20} />
                </Link>
                <Link href={"#"}>
                  <Instagram opacity={0.5} size={20} />
                </Link>
              </div>
              <p className="text-sm font-light text-gray-400">
                &copy; 2024 All Rights Reserved.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </TanstackProvider>
  );
}
