import Link from "next/link";
import React from "react";
import SignOutBtn from "./SignOutBtn";

const Navbar = () => {
  return (
    <main className="fixed left-0 right-0 top-0 z-10 w-full bg-white py-4">
      <nav className="mx-auto max-w-screen-xl px-5">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent"
          >
            Gemini
          </Link>

          <div className="flex items-center gap-5">
            <Link
              href={"/dashboard/history"}
              className="text-base font-medium text-gray-700"
            >
              History
            </Link>
            <SignOutBtn />
          </div>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
