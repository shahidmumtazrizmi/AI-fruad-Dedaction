
"use client"
import FirmLayout from "@/components/layout/firm-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, FileText, Search, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const clients = [
    { id: '1', name: 'Innovate Inc.', status: 'Active', outstanding: 2, overdue: 1 },
    { id: '2', name: 'Solutions Co.', status: 'Active', outstanding: 5, overdue: 0 },
    { id: '3', name: 'Synergy Corp', status: 'Inactive', outstanding: 0, overdue: 0 },
    { id: '4', name: 'Apex Industries', status: 'Active', outstanding: 1, overdue: 1 },
];

const pendingApprovals = [
    { id: '1', client: 'Innovate Inc.', amount: 1250.00, date: '2024-07-28' },
    { id: '2', client: 'Solutions Co.', amount: 800.00, date: '2024-07-29' },
    { id: '3', client: 'Apex Industries', amount: 3500.00, date: '2024-07-30' },
];

export default function FirmDashboardPage() {
    return (
        <FirmLayout>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Firm Dashboard</h1>
                        <p className="text-muted-foreground">
                            Manage your clients and their financial operations.
                        </p>
                    </div>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Client
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="font-headline text-accent">Client Management</CardTitle>
                            <CardDescription>
                                An overview of all your managed clients.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search clients..." className="pl-10" />
                                </div>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Client Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Outstanding Bills</TableHead>
                                        <TableHead>Overdue Bills</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clients.map(client => (
                                        <TableRow key={client.id}>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage data-ai-hint="logo company" src={`https://logo.clearbit.com/${client.name.toLowerCase().replace(/\s/g, "")}.com`} alt={client.name} />
                                                    <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                {client.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={client.status === 'Active' ? 'secondary' : 'outline'}>{client.status}</Badge>
                                            </TableCell>
                                            <TableCell>{client.outstanding}</TableCell>
                                            <TableCell>
                                                <span className={client.overdue > 0 ? "text-destructive font-semibold" : ""}>
                                                    {client.overdue}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-accent">Pending Approvals</CardTitle>
                            <CardDescription>
                                Payments that require your firm's approval.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-4">
                                {pendingApprovals.map(approval => (
                                    <div key={approval.id} className="flex items-center justify-between p-3 rounded-lg bg-card-foreground/5">
                                        <div>
                                            <p className="font-semibold">{approval.client}</p>
                                            <p className="text-sm text-muted-foreground">
                                                ${approval.amount.toFixed(2)} due on {approval.date}
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">Review</Button>
                                    </div>
                                ))}
                                {pendingApprovals.length === 0 && (
                                    <p className="text-center text-muted-foreground py-8">No pending approvals.</p>
                                )}
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </FirmLayout>
    );
}
