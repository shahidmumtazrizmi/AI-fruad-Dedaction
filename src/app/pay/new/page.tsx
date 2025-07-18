// src/app/pay/new/page.tsx
import AppLayout from "@/components/layout/app-layout";
import { BillDetailsForm } from "@/components/pay/bill-details-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function NewPaymentPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">New Payment</h1>
          <p className="text-muted-foreground">
            Enter the details of the bill you want to pay.
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Bill Details</CardTitle>
            </CardHeader>
            <CardContent>
                <BillDetailsForm />
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
