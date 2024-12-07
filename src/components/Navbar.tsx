import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <main className="fixed left-0 right-0 top-0 w-full py-4">
      <nav className="mx-auto max-w-screen-lg px-5">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent"
          >
            Gemini
          </Link>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
