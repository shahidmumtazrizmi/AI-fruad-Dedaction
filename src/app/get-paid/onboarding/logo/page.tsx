// src/app/get-paid/onboarding/logo/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import OnboardingLayout from "@/components/layout/onboarding-layout";
import { useToast } from "@/hooks/use-toast";

export default function LogoOnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleUploadClick = () => {
    toast({
      title: "File Dialog",
      description: "In a real application, this would open a file picker.",
    });
  };

  return (
    <OnboardingLayout step={1} totalSteps={2}>
      <Card className="mx-auto max-w-xl w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-accent">Upload your business logo</CardTitle>
          <CardDescription className="max-w-md mx-auto">
            Make it easier for your customers to identify your invoices and payment requests by adding your company logo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
            <div 
                className="w-48 h-48 rounded-full border-4 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={handleUploadClick}
            >
                <div className="text-center text-muted-foreground">
                    <Upload className="w-12 h-12 mx-auto mb-2" />
                    <p>Click to upload</p>
                    <p className="text-xs">PNG, JPG, SVG</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                <Button variant="ghost" asChild className="flex-1">
                    <Link href="/">Skip for now</Link>
                </Button>
                <Button className="flex-1" asChild>
                    <Link href="/get-paid/onboarding/payment-link">Continue</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </OnboardingLayout>
  );
}
