// src/app/get-paid/page.tsx
"use client";

import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const getPaidTabs = [
  { value: "unsent", label: "Unsent", count: 0, amount: "$0.00" },
  { value: "sent", label: "Sent", count: 0, amount: "$0.00" },
  { value: "in-progress", label: "In-progress", count: 0, amount: "$0.00" },
  { value: "paid", label: "Paid", count: 0, amount: "$0.00" },
];

const PlaceholderContent = () => (
    <div className="text-center py-20 bg-card border-2 border-dashed rounded-lg mt-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold font-headline text-foreground mb-3">Your first step to getting paid faster starts here</h2>
        <p className="text-muted-foreground mb-6">
          Create and send invoices, payment requests or share your payment link so customers can pay you faster with just a few clicks.
        </p>
        <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
          <Link href="/get-paid/onboarding/logo">Get Started</Link>
        </Button>
      </div>
    </div>
  );

export default function GetPaidPage() {

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Get Paid</h1>
                <p className="text-muted-foreground">
                  Invoice customers, create payment links, and track your income.
                </p>
            </div>
        </div>
        
        <Card>
            <CardContent className="p-4 md:p-6">
                 <Tabs defaultValue="unsent" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                        {getPaidTabs.map(tab => (
                        <TabsTrigger key={tab.value} value={tab.value} className="flex-1 flex-col h-auto py-2 data-[state=active]:bg-card data-[state=active]:shadow-md">
                            <span className="text-sm font-semibold">{tab.label}</span>
                            <span className="text-xs text-muted-foreground">No items</span>
                            <span className="text-lg font-bold">{tab.amount}</span>
                        </TabsTrigger>
                        ))}
                    </TabsList>
                    
                    <TabsContent value="unsent">
                       <PlaceholderContent />
                    </TabsContent>

                    <TabsContent value="sent">
                        <PlaceholderContent />
                    </TabsContent>

                    <TabsContent value="in-progress">
                        <PlaceholderContent />
                    </TabsContent>

                    <TabsContent value="paid">
                        <PlaceholderContent />
                    </TabsContent>
                    </Tabs>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
