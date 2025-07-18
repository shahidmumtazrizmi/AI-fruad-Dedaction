
"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Logo from "@/components/layout/logo";
import AuthLayout from "@/components/layout/auth-layout";
import { useToast } from "@/hooks/use-toast";
import { GoogleIcon } from "@/components/icons/google-icon";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { login } from "@/actions/auth";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleLogin = () => {
    toast({
      title: "Redirecting to Google",
      description: "In a real application, you would be redirected to Google to complete the login process.",
    });
  };

  const handleLogin = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data.error) {
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: data.error,
          });
        }
        if (data.success) {
          toast({
            title: "Login Successful!",
            description: "You will be redirected shortly.",
          });
          router.push("/verify-email");
        }
      });
    });
  };

  return (
    <AuthLayout>
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <Logo className="w-12 h-12 text-primary" />
            </div>
          <CardTitle className="text-2xl font-headline text-accent">Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="grid gap-4">
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center">
                            <FormLabel>Password</FormLabel>
                            <Link href="/forgot-password" className="ml-auto inline-block text-sm underline hover:text-primary">
                                Forgot your password?
                            </Link>
                        </div>
                        <FormControl>
                            <Input type="password" {...field} disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </Form>
           <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                  </span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
              <GoogleIcon className="mr-2 h-4 w-4" />
              Login with Google
            </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline hover:text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
