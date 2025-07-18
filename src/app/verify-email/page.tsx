import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Logo from "@/components/layout/logo";
import AuthLayout from "@/components/layout/auth-layout";

export default function VerifyEmailPage() {
  return (
    <AuthLayout headerType="onboarding">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                 <Logo className="w-12 h-12 text-primary" />
            </div>
          <CardTitle className="text-2xl font-headline text-accent">Check your email</CardTitle>
          <CardDescription>
            We've sent a 6-digit code to your email address. Please enter it below to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
                <div className="flex justify-center">
                    <InputOTP maxLength={6}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            </div>
            <Button asChild className="w-full bg-amber-500 hover:bg-amber-600 text-black">
              <Link href="/account-type">Verify Email</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Didn't receive the code?{" "}
            <Button variant="link" className="p-0 h-auto">
              Resend code
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
