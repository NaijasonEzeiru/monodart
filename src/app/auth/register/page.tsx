import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create account</CardTitle>
        <CardDescription>Lets get you started</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <Input id="email" type="email" placeholder="Email" required />
          <div className="flex gap-3">
            <Input id="firstName" placeholder="First name" required />
            <Input id="lastName" placeholder="Last name" required />
          </div>
          <Input id="phoneNumber" required placeholder="Phone number" />
          <Input id="businessName" required placeholder="Business name" />
          <Input id="password" required placeholder="Password" />
          <Button type="submit" className="w-full bg-black hover:bg-black/80">
            Register
          </Button>
          <p className="text-center text-sm">
            Have an account?{" "}
            <Link href="/auth/login" className="text-primary">
              log in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
