// src/app/firm/fraud-monitoring/page.tsx
"use client";

import { useMemo, useState } from "react";
import FirmLayout from "@/components/layout/firm-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const flaggedTransactions = [
  { id: "TXN-F-001", client: "Innovate Inc.", date: "2024-07-28", amount: 5250.00, risk: "High", reason: "Unusual location" },
  { id: "TXN-F-002", client: "Solutions Co.", date: "2024-07-27", amount: 1500.00, risk: "Medium", reason: "Large one-time payment" },
  { id: "TXN-F-003", client: "Apex Industries", date: "2024-07-26", amount: 7300.00, risk: "High", reason: "Multiple rapid payments" },
  { id: "TXN-F-004", client: "Synergy Corp", date: "2024-07-25", amount: 200.00, risk: "Low", reason: "Historical pattern mismatch" },
];

export default function FraudMonitoringPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return flaggedTransactions.filter(tx =>
      (tx.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
       tx.reason.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (riskFilter === "all" || tx.risk === riskFilter)
    );
  }, [searchTerm, riskFilter]);

  return (
    <FirmLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Fraud Monitoring Center</h1>
                <p className="text-muted-foreground">
                    Review and act on potentially fraudulent activities across your clients.
                </p>
            </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Flagged Transactions</CardTitle>
            <CardDescription>
              Transactions flagged for manual review by the AI fraud detection system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by client or reason..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredTransactions.map((tx) => (
                        <TableRow key={tx.id}>
                            <TableCell className="font-medium">{tx.client}</TableCell>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell>{tx.reason}</TableCell>
                            <TableCell>
                                <Badge variant={
                                  tx.risk === 'High' ? 'destructive' 
                                  : tx.risk === 'Medium' ? 'outline'
                                  : 'secondary'
                                }>{tx.risk}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">${tx.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Review</Button>
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
