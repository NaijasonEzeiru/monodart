import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <Input id="email" type="email" placeholder="Email" required />
          <Input
            id="password"
            type="password"
            required
            placeholder="Password"
          />
          <a
            href="#"
            className="ml-auto text-sm underline-offset-4 hover:underline text-primary"
          >
            Forgot your password?
          </a>
          <Button type="submit" className="w-full bg-black hover:bg-black/80">
            Login
          </Button>
          <p className="text-center text-sm">
            New to Monostore?{" "}
            <Link href="/auth/register" className="text-primary">
              create account
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
