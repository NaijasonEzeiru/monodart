import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { ChangePasswordSchema } from "@/lib/zodSchema";

export default function ChangePassword({ email }: { email: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    // reValidateMode: "onChange",
  });

  async function onSubmit(body: z.infer<typeof ChangePasswordSchema>) {
    console.log({ body });
    try {
      const res = await fetch(`${apiAddress}/password-change-final`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("verify"),
        },
        body: JSON.stringify({ email, password: body.newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        toast.success(data?.message || "Password changed successfully", {
          description: "You can now log in",
        });
        router.push("/auth/login");
      } else {
        toast.error("Password not changed", {
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
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Password change</CardTitle>
        <CardDescription>Enter new password to update</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="space-y-0.5  relative">
                  <FormControl>
                    <Input
                      placeholder="New password"
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem className="space-y-0.5 relative mt-6">
                  <FormControl>
                    <Input
                      placeholder="Repeat password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormDescription className="text-[10px] mt-2 mb-6 italic">
              <span className="block">Password must be 6 characters.</span>
              <span className="block">A number.</span>
              <span className="block">Upper and lower case.</span>
              <span className="block">Must contain special character.</span>
            </FormDescription> */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-black hover:bg-black/80"
            >
              {form.formState.isSubmitting && (
                <Loader className="animate-spin" />
              )}
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
