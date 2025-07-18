// src/app/pay/page.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload, Bell, RefreshCw, Users, Settings, CreditCard, Search } from "lucide-react";
import Link from "next/link";
import BillList from "@/components/pay/bill-list";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Bill, Customer } from "@/types";
import AddVendorDialog from "@/components/pay/add-vendor-dialog";
import VendorList from "@/components/pay/vendor-list";
import { Input } from "@/components/ui/input";

const payTabs = [
    { value: "vendors", label: "Vendors" },
    { value: "bills", label: "Bills" },
    { value: "approvals", label: "Approvals" },
    { value: "payments", label: "Payments" },
];

const initialVendors: Customer[] = [
  { id: '1', companyName: 'Web Services LLC', contactName: 'Alex Johnson', email: 'alex@innovate.com', phone: '123-456-7890' },
  { id: '2', companyName: 'Office Supplies Co.', contactName: 'Maria Garcia', email: 'maria@solutions.co', phone: '234-567-8901' },
  { id: '3', companyName: 'Cloud Solutions Inc.', contactName: 'David Chen', email: 'david@synergy.com', phone: '345-678-9012' },
];

export default function PayPage() {
  const [bills, setBills] = useLocalStorage<Bill[]>("bills", []);
  const [vendors, setVendors] = useLocalStorage<Customer[]>("vendors", initialVendors);
  const { toast } = useToast();
  
  const [isAddVendorDialogOpen, setIsAddVendorDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [vendorSearchTerm, setVendorSearchTerm] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImport = useCallback(() => {
    toast({
      title: "Import Started",
      description: "We've started importing your vendor data.",
    });
  }, [toast]);
  
  const handleAddVendor = useCallback(() => {
    toast({
        title: "Vendor Added",
        description: `Successfully added vendor. (Demo)`
    });
    setIsAddVendorDialogOpen(false);
  }, [toast]);

  const filteredVendors = vendors.filter(vendor =>
    vendor.companyName.toLowerCase().includes(vendorSearchTerm.toLowerCase()) ||
    vendor.contactName?.toLowerCase().includes(vendorSearchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Pay</h1>
                <p className="text-muted-foreground">
                Manage your vendors, bills, and payments.
                </p>
            </div>
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon"><RefreshCw className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
                  <Link href="/pay/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Payment
                  </Link>
                </Button>
            </div>
        </div>
        <Tabs defaultValue="bills" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {payTabs.map(cat => (
              <TabsTrigger key={cat.value} value={cat.value} className="flex-1">{cat.label}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="vendors">
              <Card>
                <CardHeader>
                  <CardTitle>Vendors</CardTitle>
                  <CardDescription>Manage your vendors and their information.</CardDescription>
                </CardHeader>
                <CardContent>
                  {isClient && vendors.length > 0 ? (
                    <>
                      <div className="mb-4 flex gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search vendors..."
                            className="pl-10"
                            value={vendorSearchTerm}
                            onChange={(e) => setVendorSearchTerm(e.target.value)}
                          />
                        </div>
                        <Button onClick={() => setIsAddVendorDialogOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Vendor
                        </Button>
                        <Button variant="outline" onClick={handleImport}><Upload className="mr-2 h-4 w-4" /> Import Vendors</Button>
                      </div>
                      <VendorList vendors={filteredVendors} />
                    </>
                  ) : (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold text-foreground mb-2">Add your first vendor to get started</h3>
                        <p className="text-muted-foreground mb-6">You can add vendors manually or import them from a file.</p>
                         <div className="flex justify-center gap-4">
                            <Button onClick={() => setIsAddVendorDialogOpen(true)}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Vendor
                            </Button>
                            <Button variant="outline" onClick={handleImport}><Upload className="mr-2 h-4 w-4" /> Import Vendors</Button>
                        </div>
                    </div>
                  )}
                </CardContent>
              </Card>
          </TabsContent>
          <TabsContent value="bills">
              <Card>
                  <CardHeader>
                      <CardTitle>Bills</CardTitle>
                      <CardDescription>Create, manage, and track your bills.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      {isClient && bills.length > 0 ? (
                         <BillList bills={bills} />
                      ) : (
                          <div className="space-y-4">
                              <div className="text-sm text-muted-foreground p-4 border rounded-lg bg-card-foreground/5">
                                  <p>Manually add or upload bills, sync with accounting software or Gmail to import bills automatically, or forward invoices to:</p>
                                  <p className="font-mono text-primary my-2">vivaharoon_7333@invoicesmelio.com</p>
                                  <Button variant="link" size="sm" className="p-0 h-auto">Copy email address</Button>
                              </div>
                              <div className="flex gap-4 pt-4">
                                  <Button asChild>
                                      <Link href="/pay/new"><PlusCircle className="mr-2 h-4 w-4" /> Add Bill</Link>
                                  </Button>
                                  <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Import Bills</Button>
                              </div>
                          </div>
                      )}
                  </CardContent>
              </Card>
          </TabsContent>
          <TabsContent value="approvals">
              <Card>
                  <CardHeader>
                      <CardTitle>Approvals</CardTitle>
                      <CardDescription>Review and approve pending payments.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                      <div className="max-w-md mx-auto">
                          <h3 className="text-xl font-semibold text-foreground mb-2">Approve or decline payments from here</h3>
                          <p className="text-muted-foreground mb-6">
                              Payments that need your approval will show up here once scheduled.
                          </p>
                          <div className="flex justify-center gap-4">
                              <Button variant="outline" asChild>
                                  <Link href="/settings?tab=workflows">
                                      <Settings className="mr-2 h-4 w-4" />
                                      Manage workflows
                                  </Link>
                              </Button>
                              <Button asChild>
                                  <Link href="/settings?tab=users">
                                      <Users className="mr-2 h-4 w-4" />
                                      Add a user
                                  </Link>
                              </Button>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </TabsContent>
           <TabsContent value="payments">
              <Card>
                  <CardHeader>
                      <CardTitle>Payments</CardTitle>
                      <CardDescription>Track your outgoing payments.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                     <div className="max-w-md mx-auto">
                          <h3 className="text-xl font-semibold text-foreground mb-2">Track Your Payments</h3>
                          <p className="text-muted-foreground mb-6">
                             Once scheduled, payments will show up here for easy tracking every step of the way.
                          </p>
                          <div className="flex justify-center gap-4">
                              <Button variant="outline" asChild>
                                  <Link href="/settings?tab=payment">
                                      <CreditCard className="mr-2 h-4 w-4" />
                                      Add payment method
                                  </Link>
                              </Button>
                              <Button asChild>
                                  <Link href="/pay/new">
                                      <PlusCircle className="mr-2 h-4 w-4" />
                                      New payment
                                  </Link>
                              </Button>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </TabsContent>
        </Tabs>
      </div>
      <AddVendorDialog
        isOpen={isAddVendorDialogOpen}
        onOpenChange={setIsAddVendorDialogOpen}
        onAddVendor={handleAddVendor}
      />
    </AppLayout>
  );
}
