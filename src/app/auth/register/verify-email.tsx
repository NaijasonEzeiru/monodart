"use client";

import { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RegisterSchema, VerifyEmail2Schema } from "@/lib/zodSchema";
import { apiAddress } from "@/lib/variables";
import AuthContext from "@/components/auth-context";
import { Loader } from "lucide-react";

export default function VerifyEmail({
  regDetails,
}: {
  regDetails: z.infer<typeof RegisterSchema>;
}) {
  const { setUser } = useContext(AuthContext);
  const [timeLeft, setTimeLeft] = useState(90);
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const form = useForm<z.infer<typeof VerifyEmail2Schema>>({
    resolver: zodResolver(VerifyEmail2Schema),
  });

  async function onSubmit(body: z.infer<typeof VerifyEmail2Schema>) {
    console.log({ body });
    try {
      const res = await fetch(`${apiAddress}/signup-start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...regDetails, code: body.OTP }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, { description: "You are now logged in" });
        localStorage.setItem("monodat_token", data.token);
        setUser(data.personal);
        router.push("/dashboard");
      } else {
        toast.error("Registration failed", {
          description: data?.message || "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Registration failed", {
        description: "Something went wrong",
      });
      console.log("error", error);
    }
  }

  return (
    <>
      {" "}
      <CardHeader>
        <CardTitle className="text-xl">
          Enter the code sent to your email, {regDetails?.email}
        </CardTitle>
        <CardDescription>
          {timeLeft > 1
            ? `This code will expire in ${timeLeft} seconds`
            : "The code has expired"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="OTP"
              render={({ field }) => (
                <FormItem className="space-y-0.5 mx-auto">
                  <FormControl>
                    <InputOTP
                      maxLength={4}
                      {...field}
                      inputMode="numeric"
                      pattern={`^[0-9]*$`}
                    >
                      <InputOTPGroup className="gap-4">
                        <InputOTPSlot
                          index={0}
                          className="border border-black rounded px-2 py-1 text-center size-14"
                        />
                        <InputOTPSlot
                          index={1}
                          className="border border-black rounded px-2 py-1 text-center size-14"
                        />
                        <InputOTPSlot
                          index={2}
                          className="border border-black rounded px-2 py-1 text-center size-14"
                        />
                        <InputOTPSlot
                          index={3}
                          className="border border-black rounded px-2 py-1 text-center size-14"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-black hover:bg-black/80 gap-2"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader className="animate-spin" />
              )}
              Verify
            </Button>
          </form>
          <FormDescription>
            Didn&apos;t get the email?{" "}
            <Button variant="link" className="px-1" disabled={timeLeft > 1}>
              Resend code
            </Button>
            .
          </FormDescription>
        </Form>
      </CardContent>
    </>
  );
}
