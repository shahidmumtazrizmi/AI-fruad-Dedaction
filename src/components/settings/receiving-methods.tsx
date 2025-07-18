// src/components/settings/receiving-methods.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Landmark } from "lucide-react";

export function ReceivingMethodsSettings() {
    const [dialogStep, setDialogStep] = useState<"closed" | "otp" | "connect">("closed");
    const { toast } = useToast();

    const handleAddMethod = () => {
        setDialogStep("otp");
    }

    const handleOtpVerified = () => {
        toast({
            title: "Identity Verified",
            description: "You can now connect your bank account.",
        });
        setDialogStep("connect");
    }
    
    const handleResendCode = () => {
        toast({
            title: "Code Resent",
            description: "A new verification code has been sent to your phone.",
        });
    }

    const handleConnectBank = () => {
         toast({
            title: "Connection in Progress",
            description: "Redirecting to Plaid to connect your bank account. (This is a demo)",
        });
        handleClose();
    }
    
    const handleClose = () => {
        setDialogStep("closed");
    }

    return (
        <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
                Manage how and where you want to receive your customer payments.
            </p>
            
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Bank account</CardTitle>
                    <CardDescription>
                        Connect your bank account to get paid.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-end">
                     <Button variant="outline" onClick={handleAddMethod}>Add this method</Button>
                </CardContent>
            </Card>

            {/* OTP Dialog */}
            <Dialog open={dialogStep === "otp"} onOpenChange={(open) => !open && handleClose()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Verify Your Identity</DialogTitle>
                        <DialogDescription>
                            For your security, please enter the 6-digit code sent to your phone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4 py-6">
                        <InputOTP maxLength={6}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <div className="text-sm text-muted-foreground">
                            Didn't receive a code?{" "}
                            <Button variant="link" className="p-0 h-auto" onClick={handleResendCode}>
                                Resend
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleOtpVerified}>Verify</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Connect Bank Dialog */}
            <Dialog open={dialogStep === "connect"} onOpenChange={(open) => !open && handleClose()}>
                 <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Connect Bank Account</DialogTitle>
                        <DialogDescription>
                           We use Plaid to securely connect to your bank.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6 flex flex-col items-center justify-center text-center">
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                            <Landmark className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-muted-foreground">You will be redirected to Plaid's secure portal to log in to your bank account.</p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogStep("otp")}>Back</Button>
                        <Button onClick={handleConnectBank}>Continue with Plaid</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
