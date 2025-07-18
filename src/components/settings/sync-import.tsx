// src/components/settings/sync-import.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const LogoPlaceholder = ({ text, className }: { text: string; className?: string }) => (
    <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-muted text-muted-foreground font-bold text-xs ${className}`}>
        {text}
    </div>
);


export function SyncImportSettings() {
    const { toast } = useToast();

    const handleConnect = (serviceName: string) => {
        toast({
            title: `Connecting to ${serviceName}`,
            description: `You are being redirected to ${serviceName} to authorize the connection. (This is a demo).`,
        });
    };

    const handleCopyEmail = (email: string) => {
        navigator.clipboard.writeText(email);
        toast({
            title: "Email Copied!",
            description: "The Pay Bills email address has been copied to your clipboard.",
        });
    };

    const payBillsEmail = "vivaharoon_7333@invoicesmelio.com";

    return (
        <div className="space-y-8">
            <section>
                <h3 className="text-lg font-medium mb-1">Sync Accounting Software</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Connect your accounting software to sync your bills, invoices, contacts and payments.
                </p>
                <div className="space-y-4">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-4">
                            <LogoPlaceholder text="QBO" />
                            <div className="flex-grow">
                                <h4 className="font-semibold">QuickBooks Online</h4>
                                <p className="text-sm text-muted-foreground">
                                    Connect your account to sync bills, invoices, contacts, and payments.
                                </p>
                            </div>
                            <Button variant="outline" onClick={() => handleConnect("QuickBooks Online")}>Connect</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-4">
                            <LogoPlaceholder text="QBD" />
                            <div className="flex-grow">
                                <h4 className="font-semibold">QuickBooks Desktop</h4>
                                <p className="text-sm text-muted-foreground">
                                    Connect your account to sync bills, invoices, contacts, and payments.
                                </p>
                            </div>
                            <Button variant="outline" onClick={() => handleConnect("QuickBooks Desktop")}>Connect</Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardContent className="flex items-center gap-4 p-4">
                            <LogoPlaceholder text="Xero" />
                            <div className="flex-grow">
                                <h4 className="font-semibold">Xero</h4>
                                <p className="text-sm text-muted-foreground">
                                    Connect your account to sync bills, invoices, contacts, and payments.
                                </p>
                            </div>
                            <Button variant="outline" onClick={() => handleConnect("Xero")}>Connect</Button>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator />

            <section>
                <h3 className="text-lg font-medium mb-1">Bill Importing</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Import bills directly from your Gmail and Amazon business account.
                </p>
                <div className="space-y-4">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-4">
                            <LogoPlaceholder text="AMZN" className="bg-orange-100 text-orange-600" />
                            <div className="flex-grow">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold">Amazon Business</h4>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">New</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Automatically import your Amazon Business invoices directly to your Bills tab.
                                </p>
                            </div>
                            <Button variant="outline" onClick={() => handleConnect("Amazon Business")}>Connect</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-4">
                            <LogoPlaceholder text="Gmail" className="bg-red-100 text-red-600" />
                            <div className="flex-grow">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold">Gmail</h4>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">New</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Have attachments auto-imported and added from your inbox to your Bills tab.
                                </p>
                            </div>
                            <Button variant="outline" onClick={() => handleConnect("Gmail")}>Connect</Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
            
            <Separator />

            <section>
                <h3 className="text-lg font-medium mb-1">Pay Bills email</h3>
                <p className="text-sm text-muted-foreground">
                    Use your Pay Bills email to forward or receive invoices from vendors. We’ll scan & add them to Pay Inbox so you can schedule payments easily.
                </p>
                <div className="flex items-center gap-2 mt-4 p-3 rounded-md border bg-muted">
                    <p className="font-mono text-primary flex-grow">{payBillsEmail}</p>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyEmail(payBillsEmail)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy email
                    </Button>
                </div>
            </section>
        </div>
    );
}
