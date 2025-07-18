// src/app/firm/payment-scheduler/page.tsx
"use client";

import FirmLayout from "@/components/layout/firm-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const payments = [
  { id: 'PAY-001', client: 'Innovate Inc.', vendor: 'Marketing Agency', amount: 5000.00, scheduledDate: '2024-08-05', currency: 'USD', status: 'Scheduled' },
  { id: 'PAY-002', client: 'Solutions Co.', vendor: 'Euro Supplies', amount: 2500.00, scheduledDate: '2024-08-10', currency: 'EUR', status: 'Scheduled' },
  { id: 'PAY-003', client: 'Apex Industries', vendor: 'Global Logistics', amount: 12000.00, scheduledDate: '2024-08-02', currency: 'USD', status: 'Processed' },
];

export default function PaymentSchedulerPage() {
    return (
        <FirmLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Payment Scheduler</h1>
                    <p className="text-muted-foreground">
                        Schedule, manage, and track multi-currency payments for all your clients.
                    </p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming & Processed Payments</CardTitle>
                        <CardDescription>A consolidated view of all client payment activities.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search by client or vendor..." className="pl-10" />
                            </div>
                             <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Currencies</SelectItem>
                                    <SelectItem value="usd">USD</SelectItem>
                                    <SelectItem value="eur">EUR</SelectItem>
                                    <SelectItem value="gbp">GBP</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button>New Payment</Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Vendor</TableHead>
                                    <TableHead>Scheduled Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-medium">{payment.client}</TableCell>
                                        <TableCell>{payment.vendor}</TableCell>
                                        <TableCell>{payment.scheduledDate}</TableCell>
                                        <TableCell>
                                             <Badge variant={payment.status === 'Processed' ? 'secondary' : 'default'}>{payment.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: payment.currency }).format(payment.amount)}
                                        </TableCell>
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
