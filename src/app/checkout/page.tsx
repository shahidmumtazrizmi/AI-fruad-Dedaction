// src/app/checkout/page.tsx
"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/layout/auth-layout";
import { CreditCard, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const plan = searchParams.get('plan') || 'Pro';
    const price = searchParams.get('price') || '49';

    const handlePayment = () => {
        toast({
            title: "Payment Successful!",
            description: `You have successfully subscribed to the ${plan} plan.`,
        });
        router.push("/");
    };

  return (
    <AuthLayout>
      <Card className="mx-auto max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <CreditCard className="w-12 h-12 text-accent" />
          </div>
          <CardTitle className="text-2xl font-headline text-accent">Complete Your Purchase</CardTitle>
          <CardDescription>
            You're subscribing to the <span className="font-bold text-primary">{plan} Plan</span> for <span className="font-bold text-primary">${price}/month</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <Label htmlFor="card-number">Card Number</Label>
                <div className="relative">
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                    <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" placeholder="MM / YY" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="card-holder">Card Holder Name</Label>
                <Input id="card-holder" placeholder="John Doe" />
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Button onClick={handlePayment} className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                Pay ${price}
            </Button>
            <Button variant="link" asChild className="text-sm">
                <Link href="/settings?tab=plans">Change Plan</Link>
            </Button>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
