// src/app/firm/account-settings/page.tsx
"use client";

import FirmLayout from "@/components/layout/firm-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AccountSettingsPage() {
    return (
        <FirmLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Account & Security Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your firm's profile, security, and integration settings.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Firm Profile</CardTitle>
                        <CardDescription>Update your accounting firm's information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firm-name">Firm Name</Label>
                                <Input id="firm-name" defaultValue="Global Accounting Partners" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="license-number">License Number</Label>
                                <Input id="license-number" defaultValue="CPA-12345678" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="firm-address">Business Address</Label>
                            <Input id="firm-address" defaultValue="456 Finance Ave, Suite 100, Capital City, USA" />
                        </div>
                        <div className="flex justify-end">
                            <Button>Save Profile</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>API & Webhook Settings</CardTitle>
                        <CardDescription>Manage API keys and webhook endpoints for custom integrations.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="api-key">API Key</Label>
                            <div className="flex items-center gap-2">
                                <Input id="api-key" readOnly value="********************************" />
                                <Button variant="outline">Regenerate</Button>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="webhook-url">Webhook URL</Label>
                            <div className="flex items-center gap-2">
                                <Input id="webhook-url" placeholder="https://api.yourfirm.com/webhooks/payvibe" />
                                 <Button variant="secondary">Test</Button>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button>Save Integrations</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </FirmLayout>
    );
}
