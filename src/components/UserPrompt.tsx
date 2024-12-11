"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/env";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formatText } from "@/lib/formattingText";
import Chat from "./Chat";

const promptSchema = z.object({
  prompt: z.string().min(3, {
    message: "Prompt must be at least 3 characters.",
  }),
});

const UserPrompt = () => {
  const genAI = new GoogleGenerativeAI(env.NEXT_PUBLIC_GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const [result, setResult] = React.useState("");
  const [prompt, setPrompt] = React.useState("");

  const form = useForm({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof promptSchema>> = async (
    data,
  ) => {
    setPrompt("");
    setResult("");
    const response = await model.generateContentStream(data.prompt);
    const prompt = setPrompt(data.prompt);
    form.reset();
    for await (const chunk of response.stream) {
      const chunkText = chunk.text();
      setResult((prev) => prev + formatText(chunkText));
    }
  };

  return (
    <main className="mb-14 space-y-5">
      <h1 className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent">
        Try it out!
      </h1>
      <Form {...form}>
        <form
          className="flex items-center justify-between gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your prompt..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={"outline"}
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            Send
          </Button>
        </form>
      </Form>

      {form.formState.isSubmitting ? <p>Loading...</p> : null}
      {result !== "" ? <Chat prompt={prompt} result={result} /> : null}
    </main>
  );
};

export default UserPrompt;
