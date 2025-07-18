// src/app/firm/financial-dashboard/page.tsx
"use client";

import FirmLayout from "@/components/layout/firm-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, AlertCircle } from "lucide-react";

export default function FinancialDashboardPage() {
    return (
        <FirmLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Financial Dashboard</h1>
                    <p className="text-muted-foreground">
                        A high-level, automated overview of all client financial activities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Managed A/P</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$1,2M</div>
                            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Client Growth</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12</div>
                            <p className="text-xs text-muted-foreground">in the last quarter</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Efficiency Gains</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">18%</div>
                            <p className="text-xs text-muted-foreground">Avg. time saved per client</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-destructive">3</div>
                            <p className="text-xs text-muted-foreground">Require immediate attention</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Portfolio Overview</CardTitle>
                        <CardDescription>This is a placeholder for a chart showing financial trends across all clients.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-96 w-full bg-muted rounded-lg flex items-center justify-center">
                            <p className="text-muted-foreground">[Chart Placeholder]</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </FirmLayout>
    );
}
