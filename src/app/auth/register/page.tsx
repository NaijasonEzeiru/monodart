"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiAddress } from "@/lib/variables";
import { RegisterSchema } from "@/lib/zodSchema";
import VerifyEmail from "./verify-email";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [regDetails, setRegDetails] = useState<
    z.infer<typeof RegisterSchema> | undefined
  >(undefined);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    // mode: "onChange",
  });

  async function onEmailSubmit(body: z.infer<typeof RegisterSchema>) {
    console.log({ body });
    try {
      const res = await fetch(`${apiAddress}/signup/sendemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: body.email }),
      });
      const data = await res.json();
      console.log({ data });
      if (res.ok) {
        setRegDetails(body);
      } else {
        if (data?.message == "User with email already exist") {
          form.setError("email", {
            message: data?.message,
          });
          return;
        }
        toast.error("Registration failed", {
          description: data?.message || "Something went wrong",
        });
        return;
      }
    } catch (error) {
      toast.error("Registration failed", {
        description: "Something went wrong",
      });
      console.log("error", error);
    }
  }

  return (
    <Card>
      {!regDetails ? (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create account</CardTitle>
            <CardDescription>Lets get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onEmailSubmit)}
                className="grid gap-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormControl>
                        <Input placeholder="Email" {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5 relative">
                      <FormControl>
                        <Input
                          placeholder="Phone number"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormItem className="space-y-0.5 relative">
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          defaultCountry="ng"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5">
                      <FormControl>
                        <Input placeholder="Business name" {...field} />
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
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Password"
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5 relative">
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Confirm password"
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
                      {/* <FormDescription className="text-[10px] mt-2 mb-6 italic">
                        <span className="block">
                          Password must be 6 characters.
                        </span>
                        <span className="block">A number.</span>
                        <span className="block">Upper and lower case.</span>
                        <span className="block">
                          Must contain special character.
                        </span>
                      </FormDescription> */}
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
                  Register
                </Button>
                <p className="text-center text-sm">
                  Have an account?{" "}
                  <Link href="/auth/login" className="text-primary">
                    Login
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </>
      ) : (
        <VerifyEmail regDetails={regDetails} />
      )}
    </Card>
  );
}
