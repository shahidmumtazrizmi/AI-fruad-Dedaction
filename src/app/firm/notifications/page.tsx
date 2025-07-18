// src/app/firm/notifications/page.tsx
"use client";

import FirmLayout from "@/components/layout/firm-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  { id: 1, client: "Innovate Inc.", message: "Payment of $1,250.00 has been approved.", time: "2m ago", read: false },
  { id: 2, client: "Solutions Co.", message: "Invoice #INV-007 for $800.00 is now overdue.", time: "1h ago", read: false },
  { id: 3, client: "Apex Industries", message: "New vendor 'Creative Supplies' added.", time: "3h ago", read: true },
  { id: 4, client: "Innovate Inc.", message: "Large payment of $15,000 requires your review.", time: "1d ago", read: true },
];

export default function NotificationsHubPage() {
  return (
    <FirmLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-accent">Notifications Hub</h1>
                <p className="text-muted-foreground">
                    Centralized alerts and updates for all your client activities.
                </p>
            </div>
            <Button variant="outline">Mark all as read</Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {notifications.map(notification => (
                        <div key={notification.id} className={`flex items-start gap-4 p-4 rounded-lg border ${!notification.read ? 'bg-card' : 'bg-muted/50'}`}>
                             <Avatar className="h-10 w-10 border">
                                <AvatarImage data-ai-hint="logo company" src={`https://logo.clearbit.com/${notification.client.toLowerCase().replace(/\s/g, "")}.com`} alt={notification.client} />
                                <AvatarFallback>{notification.client.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-semibold">{notification.client}</p>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon"><Check className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon"><X className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </FirmLayout>
  );
}
