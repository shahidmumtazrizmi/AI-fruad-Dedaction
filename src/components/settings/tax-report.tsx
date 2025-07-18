// src/components/settings/tax-report.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const LogoPlaceholder = ({ text, className }: { text: string; className?: string }) => (
    <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-muted text-muted-foreground font-bold text-xs ${className}`}>
        {text}
    </div>
);

export function TaxReportSettings() {
    const { toast } = useToast();

    const handleSync = () => {
        toast({
            title: "Syncing with Tax1099...",
            description: "You are being redirected to complete the integration. (This is a demo)",
        });
    };

    return (
        <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
                Manage tax forms and export payments data.
            </p>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <LogoPlaceholder text="1099" />
                        <div className="flex-grow">
                             <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">1099 e-filing with Tax1099</CardTitle>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Premium</Badge>
                            </div>
                            <CardDescription>
                                Easily e-file 1099s by syncing your vendors' W-9 and payment data. <Button variant="link" className="p-0 h-auto">Learn more</Button>
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex justify-end">
                     <Button variant="outline" onClick={handleSync}>Sync with Tax1099</Button>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                         <LogoPlaceholder text=".CSV" />
                        <div className="flex-grow">
                            <CardTitle className="text-lg">Payments report</CardTitle>
                            <CardDescription>
                                Export a .CSV file of all payments sent within a specific date range. <Button variant="link" className="p-0 h-auto">Read more</Button>
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex justify-end">
                     <Button asChild>
                        <Link href="/reports">Create report</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
