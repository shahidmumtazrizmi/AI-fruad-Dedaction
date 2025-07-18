// src/app/transactions/page.tsx
"use client";

import { useMemo, useState } from "react";
import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const transactions = [
  { id: "TXN-001", date: "2024-07-15", description: "Payment to Web Services LLC", amount: -150.00, status: "Completed" },
  { id: "TXN-002", date: "2024-07-14", description: "Payment from Innovate Inc.", amount: 2500.00, status: "Completed" },
  { id: "TXN-003", date: "2024-07-13", description: "Payment to Office Supplies Co.", amount: -75.50, status: "Completed" },
  { id: "TXN-004", date: "2024-07-12", description: "Payment to Cloud Solutions Inc.", amount: -300.00, status: "Pending" },
  { id: "TXN-005", date: "2024-07-11", description: "Payment from Synergy Corp", amount: 1200.00, status: "Completed" },
  { id: "TXN-006", date: "2024-07-10", description: "Subscription Fee", amount: -25.00, status: "Completed" },
  { id: "TXN-007", date: "2024-07-09", description: "Refund from Marketing Agency", amount: 200.00, status: "Completed" },
  { id: "TXN-008", date: "2024-07-08", description: "Hardware Purchase", amount: -850.00, status: "Failed" },
];

const PAGE_SIZE = 5;

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx =>
      (tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       tx.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || tx.status === statusFilter)
    );
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / PAGE_SIZE);
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your transaction data is being exported and will be downloaded shortly.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Transactions</h1>
                <p className="text-muted-foreground">
                    Track all your transactions and export reports.
                </p>
            </div>
            <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Data
            </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              A log of all your recent account transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID or description..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <Select value={statusFilter} onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
                <TableCaption>A list of your recent transactions.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                        <TableCell className="font-medium">{tx.id}</TableCell>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell>
                            <Badge variant={
                              tx.status === 'Completed' ? 'secondary' 
                              : tx.status === 'Failed' ? 'destructive'
                              : 'outline'
                            }>
                                {tx.status}
                            </Badge>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${tx.amount > 0 ? 'text-green-500' : 'text-foreground'}`}>
                            {tx.amount < 0 ? `-$${Math.abs(tx.amount).toFixed(2)}` : `+$${tx.amount.toFixed(2)}`}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
