// src/app/get-paid/onboarding/payment-link/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OnboardingLayout from "@/components/layout/onboarding-layout";
import { useToast } from "@/hooks/use-toast";

export default function PaymentLinkOnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const handleConnect = () => {
    toast({
        title: "Connecting Bank",
        description: "Redirecting to connect your bank account."
    })
    // Redirect to the settings page for receiving methods
    router.push("/settings?tab=receiving");
  }

  return (
    <OnboardingLayout step={2} totalSteps={2}>
      <Card className="mx-auto max-w-xl w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-accent">Set up your payment page</CardTitle>
          <CardDescription className="max-w-md mx-auto">
            Personalize your payment page link. Once you connect a bank account, customers can pay you using this link.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
            <div className="w-full max-w-sm space-y-2">
                <Label htmlFor="payment-link" className="text-center block">Link to your payment page</Label>
                <div className="flex items-center">
                    <span className="flex items-center justify-center h-10 px-3 rounded-l-md border border-r-0 bg-muted text-muted-foreground text-sm">
                        melio.me/
                    </span>
                    <Input id="payment-link" defaultValue="vivaharoon" className="rounded-l-none text-base md:text-sm"/>
                </div>
            </div>
            <div className="text-center text-sm text-muted-foreground max-w-xs">
                You can connect your account securely using Plaid. 
                <Button variant="link" className="p-1 h-auto">Learn more</Button>
            </div>
             <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                <Button onClick={handleConnect} className="flex-1 bg-amber-500 hover:bg-amber-600 text-black">
                    Save and connect now
                </Button>
            </div>
        </CardContent>
      </Card>
    </OnboardingLayout>
  );
}
