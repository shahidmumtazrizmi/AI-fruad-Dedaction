// src/components/invoices/invoice-list.tsx
"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import type { InvoiceDataExtractionOutput } from "@/ai/flows/invoice-data-extraction";
import { Button } from "../ui/button";

type InvoiceListProps = {
  invoices: InvoiceDataExtractionOutput[];
};

const PAGE_SIZE = 5;

export default function InvoiceList({ invoices }: InvoiceListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!invoices || invoices.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No invoices match your search.</p>;
  }

  const totalPages = Math.ceil(invoices.length / PAGE_SIZE);
  const paginatedInvoices = invoices.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your recently extracted invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedInvoices.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{invoice.vendor}</TableCell>
              <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
              <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
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
    </>
  );
}
