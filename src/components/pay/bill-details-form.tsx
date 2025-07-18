// src/components/pay/bill-details-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Plus, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Bill } from "@/types";

const formSchema = z.object({
  vendor: z.string().min(1, "Please select a vendor."),
  amount: z.coerce.number().positive("Amount must be positive."),
  invoiceNumber: z.string().optional(),
  frequency: z.string().default("one-time"),
  invoiceDate: z.date().optional(),
  dueDate: z.date({ required_error: "A due date is required." }),
  note: z.string().max(500, "Note must be 500 characters or less.").optional(),
});

export function BillDetailsForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [bills, setBills] = useLocalStorage<Bill[]>("bills", []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0.00,
            invoiceNumber: "",
            frequency: "one-time",
            note: "",
        },
    });

    const saveBill = (values: z.infer<typeof formSchema>) => {
        const newBill: Bill = {
            id: crypto.randomUUID(),
            vendor: values.vendor,
            amount: values.amount,
            invoiceNumber: values.invoiceNumber,
            dueDate: format(values.dueDate, "yyyy-MM-dd"),
            status: "Pending",
        };
        setBills([...bills, newBill]);
    }

    function onContinueToPay(values: z.infer<typeof formSchema>) {
        saveBill(values);
        toast({
            title: "Continue to Pay",
            description: "Redirecting to payment options. This is a demo.",
        });
        // In a real app, you would navigate to the next step
        // router.push('/pay/select-method');
    }

    function onSaveAndClose() {
        const values = form.getValues();
        const result = formSchema.safeParse(values);
        if (result.success) {
            saveBill(result.data);
            toast({
                title: "Bill Saved",
                description: "Your bill details have been saved as a draft.",
            });
            router.push('/pay?tab=bills');
        } else {
             toast({
                variant: "destructive",
                title: "Invalid data",
                description: "Please fill out all required fields.",
            });
        }
    }

    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onContinueToPay)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="vendor"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Vendor business name <span className="text-destructive">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Search or add a vendor" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="Innovate Inc.">Innovate Inc.</SelectItem>
                    <SelectItem value="Solutions Co.">Solutions Co.</SelectItem>
                    <SelectItem value="Synergy Corp">Synergy Corp</SelectItem>
                    <SelectItem value="Web Services LLC">Web Services LLC</SelectItem>
                    <SelectItem value="Office Supplies Co.">Office Supplies Co.</SelectItem>
                    <SelectItem value="Cloud Solutions Inc.">Cloud Solutions Inc.</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Bill amount <span className="text-destructive">*</span></FormLabel>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input type="number" placeholder="0.00" className="pl-6" {...field} />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">USD</span>
                </div>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Invoice #</FormLabel>
                    <Input placeholder="Add an invoice number" {...field} />
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Payment frequency <span className="text-destructive">*</span></FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="one-time">One time payment</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
             <FormField
              control={form.control}
              name="invoiceDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Invoice date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due date <span className="text-destructive">*</span></FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note to self</FormLabel>
              <Textarea
                placeholder="e.g. office expenses"
                className="resize-none"
                {...field}
              />
               <p className="text-xs text-muted-foreground text-right">{field.value?.length || 0}/500</p>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
            <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">Line Items</h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Premium</Badge>
            </div>
            <div className="p-6 text-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground mb-4">Add line items to your bill for more detailed tracking.</p>
                <Button type="button" variant="outline" disabled>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add line items
                </Button>
            </div>
        </div>
        
        <Separator />

        <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => router.push('/pay')}>Cancel</Button>
            <Button type="button" variant="outline" onClick={onSaveAndClose}>Save and close</Button>
            <Button type="submit">Continue to pay</Button>
        </div>
      </form>
    </Form>
    );
}
