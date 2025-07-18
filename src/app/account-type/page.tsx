
"use client"
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AuthLayout from "@/components/layout/auth-layout";
import { Building, Briefcase } from "lucide-react";

export default function AccountTypePage() {
  return (
    <AuthLayout headerType="onboarding">
      <div className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center mb-8">
            <CardTitle className="text-3xl font-headline text-accent">Choose Your Account Type</CardTitle>
            <CardDescription>
                How will you be using PayVibe? This will help us tailor your experience.
            </CardDescription>
        </CardHeader>
        <div className="grid md:grid-cols-2 gap-8">
            <Link href="/kyc?type=business">
                <Card className="hover:border-primary hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
                    <CardHeader className="text-center">
                        <div className="flex justify-center items-center mb-4">
                            <Building className="w-16 h-16 text-accent" />
                        </div>
                        <CardTitle className="font-headline">I'm a Business</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground text-center">
                            Manage invoices, pay vendors, and streamline your company's finances.
                        </p>
                    </CardContent>
                </Card>
            </Link>
            <Link href="/kyc?type=firm">
                <Card className="hover:border-primary hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
                    <CardHeader className="text-center">
                        <div className="flex justify-center items-center mb-4">
                            <Briefcase className="w-16 h-16 text-accent" />
                        </div>
                        <CardTitle className="font-headline">I'm an Accounting Firm</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground text-center">
                            Manage multiple clients, streamline their payments, and collaborate effectively.
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
