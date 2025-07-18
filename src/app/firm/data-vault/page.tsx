// src/app/firm/data-vault/page.tsx
"use client";

import FirmLayout from "@/components/layout/firm-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database, FileText, Shield, FileLock2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const storedDocuments = [
  { id: 'DOC-001', client: 'Innovate Inc.', type: 'W-9', date: '2024-07-20', sensitivity: 'High' },
  { id: 'DOC-002', client: 'Solutions Co.', type: 'Invoice', date: '2024-07-22', sensitivity: 'Medium' },
  { id: 'DOC-003', client: 'Apex Industries', type: 'Contract', date: '2024-06-15', sensitivity: 'High' },
  { id: 'DOC-004', client: 'Innovate Inc.', type: 'Invoice', date: '2024-07-25', sensitivity: 'Medium' },
];

export default function DataVaultPage() {
    return (
        <FirmLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Data Storage Vault</h1>
                    <p className="text-muted-foreground">
                        Securely manage and access all stored client documents and data.
                    </p>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,482</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                            <Database className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">25.6 GB</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-teal-400">Compliant</div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Stored Documents</CardTitle>
                        <CardDescription>Access and manage client documents from the secure vault.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Document ID</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Date Stored</TableHead>
                                    <TableHead>Sensitivity</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {storedDocuments.map((doc) => (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-mono text-xs">{doc.id}</TableCell>
                                        <TableCell>{doc.client}</TableCell>
                                        <TableCell>{doc.type}</TableCell>
                                        <TableCell>{doc.date}</TableCell>
                                        <TableCell>
                                            <Badge variant={doc.sensitivity === 'High' ? 'destructive' : 'secondary'}>{doc.sensitivity}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">
                                                <FileLock2 className="h-4 w-4 mr-2" />
                                                Access
                                            </Button>
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
