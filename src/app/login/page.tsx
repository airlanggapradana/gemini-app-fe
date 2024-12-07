import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="mx-auto max-w-screen-lg px-5">
        <div className="space-y-3">
          <h1 className="mx-auto max-w-md text-center text-5xl font-bold leading-snug">
            Login
          </h1>
          <p className="mx-auto max-w-xl text-center font-light italic leading-relaxed text-gray-100">
            sign in with your existing account
          </p>
        </div>

        {/* Form */}
        <LoginForm />

        <p className="mt-5 text-center text-sm text-gray-500">
          don&apos;t have an account?{" "}
          <span>
            <Link href={"/"} className="italic text-blue-500">
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
