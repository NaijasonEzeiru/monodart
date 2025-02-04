import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileStack, Globe, Headset } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                New to Monostore?{" "}
                <a href="#" className="underline underline-offset-4">
                  create account
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="w-full font-semibold flex justify-between gap-5 flex-wrap">
        <span className="flex gap-2 items-center">
          <Globe />
          <p>Monodat website</p>
        </span>
        <span className="flex gap-2 items-center">
          <FileStack />
          <p>documentations</p>
        </span>
        <span className="flex gap-2 items-center">
          <Headset />
          <p>support</p>
        </span>
      </div>
    </div>
  );
}
