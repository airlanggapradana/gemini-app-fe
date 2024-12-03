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

const formSchema = z.object({
  fname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form
          className="mt-10 space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-between gap-5">
            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      {...field}
                      placeholder="Enter your first name"
                      className="w-full border-2 border-indigo-500 bg-gray-800 text-gray-100 focus:ring-offset-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      {...field}
                      placeholder="Enter your last name"
                      className="w-full border-2 border-indigo-500 bg-gray-800 text-gray-100 focus:ring-offset-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl className="w-full">
                  <Input
                    {...field}
                    placeholder="Enter your email"
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
                <FormControl className="w-full">
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border-2 border-indigo-500 bg-gray-800 text-gray-100 focus:ring-offset-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={"secondary"}
            className="w-full"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            Register
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
