"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, FileStack, Globe, Headset, Loader } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/lib/zodSchema";
import { apiAddress } from "@/lib/variables";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import VerifyCode from "./verify-code";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState<
    z.infer<typeof LoginSchema> | undefined
  >(undefined);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "jayseehe1035@gmail.com",
      password: "Abc.123",
    },
  });

  async function onSubmit(body: z.infer<typeof LoginSchema>) {
    try {
      const res = await fetch(`${apiAddress}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        setLoginDetails(body);
        // toast("Login successful", { description: "Welcome" });
        // router.push("/login");
      } else {
        if (data.message) {
          if (data.message == "Incorrect password") {
            form.setError("password", {
              message: data.message,
            });
            return;
          }
          if (data.message.startsWith("User with email")) {
            form.setError("email", {
              message: data.message,
            });
            return;
          }
          toast.error("Login failed", {
            description: data.message,
          });
        }
        toast.error("Login failed", {
          description: "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Login failed", {
        description: "Something went wrong",
      });
      console.log("error", error);
    }
  }

  return !loginDetails ? (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        type="email"
                        required
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
                  <FormItem className="space-y-0.5 relative">
                    {/* <FormLabel>Password</FormLabel> */}
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="password"
                          {...field}
                          type={showPassword ? "text" : "password"}
                        />
                      </FormControl>
                      <Button
                        className={`absolute right-0 bottom-0 ${
                          form.formState.isSubmitting && "text-border"
                        }`}
                        disabled={form.formState.isSubmitting}
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} className="h-4 w-4" />
                        ) : (
                          <Eye size={16} className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                href="/auth/forgot-password"
                className="ml-auto text-sm underline-offset-4 hover:underline text-primary"
              >
                Forgot your password?
              </Link>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-black hover:bg-black/80"
              >
                {form.formState.isSubmitting && (
                  <Loader className="animate-spin" />
                )}
                Login
              </Button>
              <p className="text-center text-sm">
                New to Monostore?{" "}
                <Link href="/auth/register" className="text-primary">
                  Create account
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="w-full font-semibold flex justify-between gap-2 flex-col lg:flex-row items-center text-white text-sm">
        <span className="flex gap-1 items-center">
          <Globe />
          <p className="whitespace-nowrap">Monodat website</p>
        </span>
        <span className="flex gap-1 items-center">
          <FileStack />
          <p>documentations</p>
        </span>
        <span className="flex gap-1 items-center">
          <Headset />
          <p>support</p>
        </span>
      </div>
    </>
  ) : (
    <Card>
      <VerifyCode loginDetails={loginDetails} />
    </Card>
  );
}
