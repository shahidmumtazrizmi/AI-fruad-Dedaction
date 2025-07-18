// src/components/pay/bill-list.tsx
"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import type { Bill } from "@/types";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { format, parseISO } from "date-fns";

type BillListProps = {
  bills: Bill[];
};

const PAGE_SIZE = 5;

export default function BillList({ bills }: BillListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!bills || bills.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No bills found.</p>;
  }

  const totalPages = Math.ceil(bills.length / PAGE_SIZE);
  const paginatedBills = bills.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getStatusVariant = (status: Bill['status']) => {
    switch (status) {
        case 'Paid':
            return 'secondary';
        case 'Overdue':
            return 'destructive';
        default:
            return 'outline';
    }
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your pending and paid bills.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Invoice #</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedBills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell className="font-medium">{bill.vendor}</TableCell>
              <TableCell>{bill.invoiceNumber || "N/A"}</TableCell>
              <TableCell className="text-right">${bill.amount.toFixed(2)}</TableCell>
              <TableCell>{format(parseISO(bill.dueDate), 'MMM dd, yyyy')}</TableCell>
              <TableCell>
                 <Badge variant={getStatusVariant(bill.status)}>
                    {bill.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Pay Bill</Button>
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
          disabled={currentPage === totalPages || totalPages === 1}
        >
          Next
        </Button>
      </div>
    </>
  );
}
