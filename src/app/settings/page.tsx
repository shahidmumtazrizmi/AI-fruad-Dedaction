// src/app/settings/page.tsx
"use client";

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import AppLayout from "@/components/layout/app-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserProfileSettings } from "@/components/settings/user-profile";
import { CompanySettings } from "@/components/settings/company-settings";
import { UsersAndRolesSettings } from "@/components/settings/users-roles";
import { PaymentMethodsSettings } from "@/components/settings/payment-methods";
import { BillingSettings } from "@/components/settings/billing-settings";
import { PlansSettings } from "@/components/settings/plans-settings";
import { NotificationSettings } from '@/components/settings/notification-settings';
import { ApprovalWorkflowsSettings } from '@/components/settings/approval-workflows';
import { SyncImportSettings } from '@/components/settings/sync-import';
import { TaxReportSettings } from '@/components/settings/tax-report';
import { ReceivingMethodsSettings } from '@/components/settings/receiving-methods';

export default function SettingsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const settingsCategories = [
    { value: "profile", label: "User Profile", component: <UserProfileSettings /> },
    { value: "company", label: "Company Settings", component: <CompanySettings /> },
    { value: "users", label: "Users & Roles", component: <UsersAndRolesSettings /> },
    { value: "notifications", label: "Email Notifications", component: <NotificationSettings /> },
    { value: "workflows", label: "Approval Workflows", component: <ApprovalWorkflowsSettings /> },
    { value: "sync", label: "Sync & Import", component: <SyncImportSettings /> },
    { value: "tax", label: "Tax & Report", component: <TaxReportSettings /> },
    { value: "payment", label: "Payment Methods", component: <PaymentMethodsSettings /> },
    { value: "receiving", label: "Receiving Methods", component: <ReceivingMethodsSettings /> },
    { value: "plans", label: "Plans", component: <PlansSettings /> },
    { value: "billing", label: "Billing", component: <BillingSettings onTabChange={handleTabChange} /> },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, company, and payment settings.
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full" orientation="vertical">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <TabsList className="flex-col h-auto items-start gap-1 p-2">
              {settingsCategories.map(cat => (
                <TabsTrigger key={cat.value} value={cat.value} className="w-full justify-start data-[state=active]:bg-accent/50 data-[state=active]:text-accent-foreground">
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="md:col-span-3">
              {settingsCategories.map(cat => (
                <TabsContent key={cat.value} value={cat.value} className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-headline text-accent">{cat.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {cat.component}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
}
