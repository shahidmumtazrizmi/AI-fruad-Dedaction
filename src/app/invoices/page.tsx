// src/app/invoices/page.tsx
"use client";

import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { InvoiceDataExtractionOutput } from "@/ai/flows/invoice-data-extraction";
import { useLocalStorage } from "@/hooks/use-local-storage";
import InvoiceList from "@/components/invoices/invoice-list";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const initialInvoices: InvoiceDataExtractionOutput[] = [
    { vendor: "Web Services LLC", amount: 150.00, dueDate: "2024-08-01" },
    { vendor: "Office Supplies Co.", amount: 75.50, dueDate: "2024-07-25" },
    { vendor: "Cloud Solutions Inc.", amount: 300.00, dueDate: "2024-08-10" },
    { vendor: "Marketing Agency", amount: 1200.00, dueDate: "2024-08-15" },
    { vendor: "Consulting Firm", amount: 2500.00, dueDate: "2024-07-30" },
];

export default function InvoicesPage() {
  const [invoices] = useLocalStorage<InvoiceDataExtractionOutput[]>("invoices", initialInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => 
      invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [invoices, searchTerm]);
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your invoice data is being exported and will be downloaded shortly.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Invoices</h1>
                <p className="text-muted-foreground">
                    Manage your invoices and automated data extraction.
                </p>
            </div>
            <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Data
            </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Invoices</CardTitle>
            <CardDescription>
              This is a list of invoices you've uploaded and extracted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by vendor..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <InvoiceList invoices={filteredInvoices} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
