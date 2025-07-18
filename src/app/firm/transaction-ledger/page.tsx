// src/app/firm/transaction-ledger/page.tsx
"use client";

import FirmLayout from "@/components/layout/firm-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const transactions = [
  { id: 'TXN-C1-001', client: 'Innovate Inc.', date: '2024-07-28', description: 'Payment to Web Services LLC', amount: -1250.00, status: 'Completed' },
  { id: 'TXN-C2-005', client: 'Solutions Co.', date: '2024-07-29', description: 'ACH from Customer A', amount: 800.00, status: 'Completed' },
  { id: 'TXN-C1-002', client: 'Innovate Inc.', date: '2024-07-25', description: 'Payment to Cloud Solutions Inc.', amount: -3500.00, status: 'Pending' },
];

export default function TransactionLedgerPage() {
    return (
        <FirmLayout>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Transaction Ledger</h1>
                        <p className="text-muted-foreground">
                            A unified, compliance-focused ledger of all client transactions.
                        </p>
                    </div>
                    <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Ledger</Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Cross-Client Transactions</CardTitle>
                        <CardDescription>
                            All financial movements are automatically logged for auditing and compliance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by client, description or transaction ID..." className="pl-10" />
                          </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                                        <TableCell>{tx.client}</TableCell>
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell>{tx.description}</TableCell>
                                        <TableCell>
                                            <Badge variant={tx.status === 'Completed' ? 'secondary' : 'outline'}>{tx.status}</Badge>
                                        </TableCell>
                                        <TableCell className={`text-right font-medium ${tx.amount > 0 ? 'text-teal-400' : 'text-foreground'}`}>
                                            {tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
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
