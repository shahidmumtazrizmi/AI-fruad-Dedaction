// src/components/pay/vendor-list.tsx
"use client"

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Customer } from "@/types";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type VendorListProps = {
  vendors: Customer[];
};

const PAGE_SIZE = 5;

export default function VendorList({ vendors }: VendorListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(vendors.length / PAGE_SIZE);
  const paginatedVendors = vendors.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (vendors.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No vendors match your search.</p>;
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your vendors.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Contact Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedVendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage data-ai-hint="logo company" src={`https://logo.clearbit.com/${vendor.companyName.toLowerCase().replace(/\s/g, "")}.com`} alt={vendor.companyName} />
                  <AvatarFallback>{vendor.companyName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {vendor.companyName}
              </TableCell>
              <TableCell>{vendor.contactName || "N/A"}</TableCell>
              <TableCell>{vendor.email || "N/A"}</TableCell>
              <TableCell>{vendor.phone || "N/A"}</TableCell>
              <TableCell className="text-right">
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
    </>
  );
}
