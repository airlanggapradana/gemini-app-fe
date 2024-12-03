import RegisterForm from "@/components/RegisterForm";

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="mx-auto max-w-screen-lg px-5">
        <div className="space-y-3">
          <h1 className="mx-auto max-w-md text-center text-5xl font-bold leading-snug">
            Get Started with <span className="text-indigo-500">Gemini API</span>
          </h1>
          <p className="mx-auto max-w-xl text-center font-light italic leading-relaxed text-gray-100">
            this is a personal project to learn about the gemini api and how to
            integrate it into a nextjs application.
          </p>
        </div>

        {/* Form */}
        <RegisterForm />
      </div>
    </main>
  );
}
