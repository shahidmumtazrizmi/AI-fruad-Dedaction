// src/components/customers/customer-list.tsx
"use client"

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Customer } from "@/types";
import { Button } from "../ui/button";

type CustomerListProps = {
  customers: Customer[];
};

const PAGE_SIZE = 5;

export default function CustomerList({ customers }: CustomerListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(customers.length / PAGE_SIZE);
  const paginatedCustomers = customers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (customers.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No customers match your search.</p>;
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your customers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Contact Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage data-ai-hint="logo company" src={`https://logo.clearbit.com/${customer.companyName.toLowerCase().replace(/\s/g, "")}.com`} alt={customer.companyName} />
                  <AvatarFallback>{customer.companyName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {customer.companyName}
              </TableCell>
              <TableCell>{customer.contactName || "N/A"}</TableCell>
              <TableCell>{customer.email || "N/A"}</TableCell>
              <TableCell>{customer.phone || "N/A"}</TableCell>
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
