"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/apiActions";
import { storeToken } from "@/lib/storeToken";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (
    data,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await login(data);

    if (response.status === 202) {
      form.reset();
      const accessToken = response.data.data.accessToken;
      await storeToken(accessToken);
      router.push("/dashboard");
    }
  };
  return (
    <Form {...form}>
      <form
        className="mt-5 w-[35rem] space-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  className="w-full border-2 border-indigo-500 bg-gray-800 text-gray-100 focus:ring-offset-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  className="w-full border-2 border-indigo-500 bg-gray-800 text-gray-100 focus:ring-offset-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant={"secondary"}
          disabled={form.formState.isSubmitting}
          className="w-full"
          onClick={form.handleSubmit(onSubmit)}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
