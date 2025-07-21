"use client";

import ChangePassword from "@/app/auth/forgot-password/change-password";
import VerifyCode from "@/app/auth/forgot-password/verify-code";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiAddress } from "@/lib/variables";
import { EmailSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState<string | null>();

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    // reValidateMode: "onChange",
  });

  async function onSubmit(body: z.infer<typeof EmailSchema>) {
    console.log({ body });
    try {
      const res = await fetch(`${apiAddress}/password-email-send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: body.email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStep(1);
        setEmail(body.email);
      } else if (data.message.startsWith("User with email")) {
        form.setError("email", {
          message: data.message,
        });
        return;
      } else {
        toast.error("Ooops!", {
          description: data?.message || "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Password not changed", {
        description: "Something went wrong",
      });
      console.log("error", error);
    }
  }

  if (!email) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Reset password</CardTitle>
          <CardDescription>Enter your email address</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0.5  relative">
                    <FormControl>
                      <Input
                        placeholder="example@abc.xyz"
                        {...field}
                        type="email"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-black hover:bg-black/80"
              >
                {form.formState.isSubmitting && (
                  <Loader className="animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  } else if (step == 1) {
    return (
      <Card>
        <VerifyCode email={email} setStep={setStep} />
      </Card>
    );
  } else return <ChangePassword email={email} />;
}
