import React from "react";
import { cookies } from "next/headers";
import { isTokenExpired } from "@/lib/storeToken";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

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
    <>
      <Navbar />
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <div className="mx-auto max-w-screen-lg px-5">{children}</div>
      </main>
    </>
  );
}
