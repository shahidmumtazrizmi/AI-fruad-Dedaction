// src/app/firm/vendor-insights/page.tsx
"use client";

import FirmLayout from "@/components/layout/firm-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HeartHandshake } from "lucide-react";

const vendors = [
  { id: 1, name: "Web Services LLC", clients: 5, score: 92, status: "Verified" },
  { id: 2, name: "Office Supplies Co.", clients: 12, score: 85, status: "Verified" },
  { id: 3, name: "Marketing Agency", clients: 2, score: 68, status: "Review" },
  { id: 4, name: "Cloud Solutions Inc.", clients: 8, score: 95, status: "Preferred" },
  { id: 5, name: "Consulting Firm", clients: 1, score: 75, status: "Verified" },
];

export default function VendorInsightsPage() {
  return (
    <FirmLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Vendor Insights Portal</h1>
                <p className="text-muted-foreground">
                    Analyze vendor performance, risk, and relationships across all clients.
                </p>
            </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Cross-Client Vendor Analysis</CardTitle>
            <CardDescription>
              A unified view of vendors used by your clients.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Vendor Name</TableHead>
                        <TableHead>Used by # Clients</TableHead>
                        <TableHead>Trust Score</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.clients}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Progress value={vendor.score} className="w-24 h-2" />
                                <span>{vendor.score}%</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant={
                                vendor.status === 'Preferred' ? 'default'
                                : vendor.status === 'Verified' ? 'secondary'
                                : 'destructive'
                            }>
                                {vendor.status}
                            </Badge>
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
