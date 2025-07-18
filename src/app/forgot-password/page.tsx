import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/layout/auth-layout";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <Mail className="w-12 h-12 text-primary" />
            </div>
          <CardTitle className="text-2xl font-headline text-accent">Forgot Password?</CardTitle>
          <CardDescription>
            No worries, we'll send you reset instructions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black">
              Send Reset Link
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline hover:text-primary">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
