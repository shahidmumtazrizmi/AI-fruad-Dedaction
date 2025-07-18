// src/app/firm/invoice-manager/page.tsx
"use client";

import FirmLayout from "@/components/layout/firm-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const invoices = [
  { id: 'INV-C1-001', client: 'Innovate Inc.', vendor: 'Web Services LLC', amount: 1250.00, status: 'Approved', date: '2024-07-28' },
  { id: 'INV-C2-005', client: 'Solutions Co.', vendor: 'Office Supplies Co.', amount: 800.00, status: 'Pending', date: '2024-07-29' },
  { id: 'INV-C1-002', client: 'Innovate Inc.', vendor: 'Cloud Solutions Inc.', amount: 3500.00, status: 'Paid', date: '2024-07-25' },
];

export default function InvoiceManagerPage() {
    return (
        <FirmLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Invoice Manager</h1>
                    <p className="text-muted-foreground">
                        Manage and oversee all incoming invoices for your clients with a focus on compliance.
                    </p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Client Invoices</CardTitle>
                        <CardDescription>
                            All invoices processed through the automated system are listed here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by client, vendor, or invoice ID..." className="pl-10" />
                          </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice ID</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Vendor</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
                                        <TableCell>{invoice.client}</TableCell>
                                        <TableCell>{invoice.vendor}</TableCell>
                                        <TableCell>{invoice.date}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                invoice.status === 'Paid' ? 'secondary'
                                                : invoice.status === 'Pending' ? 'outline'
                                                : 'default'
                                            }>{invoice.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </FirmLayout>
    );
}
