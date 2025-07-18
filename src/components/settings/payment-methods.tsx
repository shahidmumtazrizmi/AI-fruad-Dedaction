// src/components/settings/payment-methods.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddPaymentMethodDialog } from "./add-payment-method-dialog";

const paymentMethods = [
  { id: '1', type: 'Bank Account', details: 'Chase Bank **** 1234', isDefault: true },
  { id: '2', type: 'Credit Card', details: 'Visa **** 5678', isDefault: false },
  { id: '3', type: 'Bank Account', details: 'Bank of America **** 4321', isDefault: false },
];

export function PaymentMethodsSettings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>
      <div className="space-y-4">
        {paymentMethods.map(method => (
          <Card key={method.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="text-lg">
                {method.type === 'Bank Account' ? '🏦' : '💳'}
              </div>
              <div>
                <p className="font-semibold">{method.details}</p>
                <p className="text-sm text-muted-foreground">{method.type}</p>
              </div>
              {method.isDefault && (
                <span className="text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded-full">Default</span>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!method.isDefault && <DropdownMenuItem>Set as Default</DropdownMenuItem>}
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Card>
        ))}
      </div>
      <AddPaymentMethodDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
