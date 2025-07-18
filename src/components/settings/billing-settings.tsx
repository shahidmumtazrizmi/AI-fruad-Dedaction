// src/components/settings/billing-settings.tsx
"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

const billingHistory = [
  { id: 'INV-2024-007', date: '2024-07-01', amount: 49.00, status: 'Paid', plan: 'Pro' },
  { id: 'INV-2024-006', date: '2024-06-01', amount: 49.00, status: 'Paid', plan: 'Pro' },
  { id: 'INV-2024-005', date: '2024-05-01', amount: 49.00, status: 'Paid', plan: 'Pro' },
  { id: 'INV-2024-004', date: '2024-04-01', amount: 0.00, status: 'Paid', plan: 'Free' },
  { id: 'INV-2024-003', date: '2024-03-01', amount: 0.00, status: 'Paid', plan: 'Free' },
  { id: 'INV-2024-002', date: '2024-02-01', amount: 0.00, status: 'Due', plan: 'Free' },
  { id: 'INV-2024-001', date: '2024-01-01', amount: 0.00, status: 'Paid', plan: 'Free' },
];

const planDetails: { [key: string]: { price: number } } = {
    Free: { price: 0 },
    Pro: { price: 49 },
    Enterprise: { price: 0 },
};

const PAGE_SIZE = 4;

type BillingSettingsProps = {
  onTabChange: (tab: string) => void;
};

export function BillingSettings({ onTabChange }: BillingSettingsProps) {
  const [currentPlan] = useLocalStorage('currentPlan', 'Free');
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const planPrice = planDetails[currentPlan]?.price || 0;

  const filteredInvoices = useMemo(() => {
    return billingHistory.filter(invoice =>
      (invoice.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || invoice.status === statusFilter)
    );
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredInvoices.length / PAGE_SIZE);
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the {currentPlan} Plan.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">${planPrice.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ month</span></p>
            <p className="text-muted-foreground">Billed monthly. Next payment on August 1, 2024.</p>
          </div>
          <Button variant="outline" onClick={() => onTabChange('plans')}>Change Plan</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Review your past invoices and payments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Invoice ID..."
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
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Due">Due</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableCaption>Your recent billing history.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'destructive'}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Download</Button>
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
  );
}
