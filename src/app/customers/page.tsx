// src/app/customers/page.tsx
"use client";

import { useMemo, useState } from "react";
import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload, Bell, RefreshCw, Search } from "lucide-react";
import AddCustomerDialog from "@/components/customers/add-customer-dialog";
import CustomerList from "@/components/customers/customer-list";
import type { Customer } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const initialCustomers: Customer[] = [
  { id: '1', companyName: 'Innovate Inc.', contactName: 'Alex Johnson', email: 'alex@innovate.com', phone: '123-456-7890' },
  { id: '2', companyName: 'Solutions Co.', contactName: 'Maria Garcia', email: 'maria@solutions.co', phone: '234-567-8901' },
  { id: '3', companyName: 'Synergy Corp', contactName: 'David Chen', email: 'david@synergy.com', phone: '345-678-9012' },
  { id: '4', companyName: 'Apex Industries', contactName: 'Sarah Lee', email: 'sarah@apex.com', phone: '456-789-0123' },
  { id: '5', companyName: 'QuantumLeap', contactName: 'Michael Brown', email: 'michael@quantum.com', phone: '567-890-1234' },
];


export default function CustomersPage() {
  const [customers, setCustomers] = useLocalStorage<Customer[]>("customers", initialCustomers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer = { ...customer, id: crypto.randomUUID() };
    setCustomers([...customers, newCustomer]);
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer =>
      customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const handleImport = () => {
    toast({
      title: "Import Started",
      description: "We've started importing your customer data.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Customers</h1>
                <p className="text-muted-foreground">
                Manage your customers, invoices, and payments.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon"><RefreshCw className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
                <Button variant="outline" onClick={handleImport}><Upload className="mr-2 h-4 w-4" /> Import</Button>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black" onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Customer
                </Button>
            </div>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>All Customers</CardTitle>
                <CardDescription>A list of all your customers.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <CustomerList customers={filteredCustomers} />
            </CardContent>
        </Card>
      </div>
      <AddCustomerDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddCustomer={addCustomer}
      />
    </AppLayout>
  );
}
