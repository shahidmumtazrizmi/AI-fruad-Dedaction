// src/components/settings/add-payment-method-dialog.tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Banknote, CreditCard, Landmark, Component } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PaymentMethod = "bank" | "card" | "paypal";

type AddPaymentMethodDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function AddPaymentMethodDialog({ isOpen, onOpenChange }: AddPaymentMethodDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("bank");
  const { toast } = useToast();

  const handleConnect = () => {
    toast({
      title: "Connecting...",
      description: `Initiating connection for ${selectedMethod}. This is a demo.`,
    });
    onOpenChange(false);
  }

  const paymentOptions = [
    { id: "bank", label: "Bank Account (ACH)", icon: <Landmark className="h-5 w-5" />, description: "Connect your bank account instantly via Plaid." },
    { id: "card", label: "Credit or Debit Card", icon: <CreditCard className="h-5 w-5" />, description: "Pay with Visa, Mastercard, Amex, etc." },
    { id: "paypal", label: "PayPal", icon: <Component className="h-5 w-5" />, description: "Connect your PayPal account." },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a new payment method</DialogTitle>
          <DialogDescription>
            Choose how you'd like to pay your bills.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup value={selectedMethod} onValueChange={(value: PaymentMethod) => setSelectedMethod(value)} className="grid gap-4 py-4">
          {paymentOptions.map((option) => (
            <Label key={option.id} htmlFor={option.id} className="flex items-start space-x-4 rounded-md border p-4 hover:bg-accent/50 has-[:checked]:border-primary transition-colors cursor-pointer">
              <RadioGroupItem value={option.id} id={option.id} />
              <div className="flex-1">
                <div className="flex items-center gap-2 font-semibold">
                  {option.icon}
                  {option.label}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
              </div>
            </Label>
          ))}
        </RadioGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleConnect}>
            {selectedMethod === "bank" ? "Connect with Plaid" : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
