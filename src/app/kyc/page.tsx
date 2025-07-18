
"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, User, FileText, Upload, Briefcase } from "lucide-react";
import AuthLayout from '@/components/layout/auth-layout';

function BusinessKYC() {
    return (
        <>
            <CardHeader>
                <div className="flex justify-center items-center mb-4">
                    <Building className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-2xl font-headline text-accent">Business Onboarding</CardTitle>
                <CardDescription>
                    Please provide your business details for verification.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Acme Inc." />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="tax-id">Tax ID / EIN</Label>
                    <Input id="tax-id" placeholder="12-3456789" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input id="address" placeholder="123 Main St, Anytown, USA" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="document-upload">Incorporation Document</Label>
                    <Button variant="outline" className="w-full justify-start font-normal">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Document
                    </Button>
                </div>
            </CardContent>
        </>
    )
}

function AccountingFirmKYC() {
    return (
        <>
            <CardHeader>
                <div className="flex justify-center items-center mb-4">
                    <Briefcase className="w-12 h-12 text-accent" />
                </div>
                <CardTitle className="text-2xl font-headline text-accent">Accounting Firm Onboarding</CardTitle>
                <CardDescription>
                    Please provide your firm's details for verification.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="firm-name">Firm Name</Label>
                    <Input id="firm-name" placeholder="Accountants & Co." />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="license-number">Professional License Number</Label>
                    <Input id="license-number" placeholder="987654321" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="대표-info">Principal Accountant Info</Label>
                    <Input id="대표-info" placeholder="John Doe, CPA" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="document-upload">Business Registration</Label>
                    <Button variant="outline" className="w-full justify-start font-normal">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Document
                    </Button>
                </div>
            </CardContent>
        </>
    )
}


export default function KycPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const accountType = searchParams.get('type');

    const handleSubmit = () => {
        if (accountType === 'firm') {
            router.push('/firm-dashboard');
        } else if (accountType === 'business') {
            router.push('/dashboard');
        } else {
            router.push('/');
        }
    }

    const renderKYCForm = () => {
        switch (accountType) {
            case 'business':
                return <BusinessKYC />;
            case 'firm':
                return <AccountingFirmKYC />;
            default:
                return (
                    <CardHeader>
                        <CardTitle>Invalid Account Type</CardTitle>
                        <CardDescription>
                            Please go back and select an account type.
                            <Button variant="link" asChild><Link href="/account-type">Go Back</Link></Button>
                        </CardDescription>
                    </CardHeader>
                );
        }
    };

    return (
        <AuthLayout headerType="onboarding">
            <Card className="mx-auto max-w-md w-full text-center">
                {renderKYCForm()}
                 <CardContent>
                    <Button onClick={handleSubmit} className="w-full bg-amber-500 hover:bg-amber-600 text-black">Complete Onboarding</Button>
                    <Button variant="link" asChild className="mt-2">
                        <Link href="/account-type">Change account type</Link>
                    </Button>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
