// src/app/reports/page.tsx
"use client";

import { useMemo, useState } from "react";
import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DownloadReportDialog } from "@/components/reports/download-report-dialog";

const reports = [
  { id: "REP-001", type: "Cash Flow", date: "2024-07-01", status: "Generated" },
  { id: "REP-002", type: "Profit & Loss", date: "2024-07-01", status: "Generated" },
  { id: "REP-003", type: "Balance Sheet", date: "2024-06-30", status: "Generated" },
  { id: "REP-004", type: "A/P Aging", date: "2024-07-15", status: "Pending" },
  { id: "REP-005", type: "A/R Aging", date: "2024-07-15", status: "Generated" },
  { id: "REP-006", type: "Cash Flow", date: "2024-06-01", status: "Generated" },
  { id: "REP-007", type: "A/P Aging", date: "2024-06-15", status: "Generated" },
];

const PAGE_SIZE = 5;

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);

  const filteredReports = useMemo(() => {
    return reports.filter(report =>
      (report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
       report.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || report.status === statusFilter)
    );
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredReports.length / PAGE_SIZE);
  const paginatedReports = filteredReports.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Tax & Reports</h1>
                <p className="text-muted-foreground">
                    Generate tax documents and financial reports.
                </p>
            </div>
            <Button variant="outline" onClick={() => setIsDownloadDialogOpen(true)}>
                Download Report
            </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>
              A list of recently generated financial reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID or type..."
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
                  <SelectItem value="Generated">Generated</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
                <TableCaption>List of your financial reports.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedReports.map((report) => (
                    <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                            <Badge variant={report.status === 'Generated' ? 'secondary' : 'outline'}>
                                {report.status}
                            </Badge>
                        </TableCell>
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
      <DownloadReportDialog isOpen={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen} />
    </AppLayout>
  );
}
