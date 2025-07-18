// src/components/settings/notification-settings.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const notificationsSchema = z.object({
  paymentUpdates: z.boolean().default(true),
  invoiceUpdates: z.boolean().default(true),
  securityAlerts: z.boolean().default(true),
  reportGenerated: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
  productUpdates: z.boolean().default(false),
});

export function NotificationSettings() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof notificationsSchema>>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: {
      paymentUpdates: true,
      invoiceUpdates: true,
      securityAlerts: true,
      reportGenerated: true,
      marketingEmails: false,
      productUpdates: true,
    },
  });

  function onSubmit(values: z.infer<typeof notificationsSchema>) {
    console.log(values);
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  }
  
  const notificationItems = [
      { name: "paymentUpdates", label: "Payment Updates", description: "Receive email notifications about the status of your payments." },
      { name: "invoiceUpdates", label: "Invoice Updates", description: "Get notified when invoices are received, processed, or overdue." },
      { name: "securityAlerts", label: "Security Alerts", description: "Receive notifications for suspicious activity or important account changes." },
      { name: "reportGenerated", label: "Report Generated", description: "Get an email when a new financial report is ready for viewing." },
  ] as const;

  const marketingItems = [
    { name: "marketingEmails", label: "Marketing Emails", description: "Receive occasional marketing emails about new products and promotions." },
    { name: "productUpdates", label: "Product Updates", description: "Get notified about new features, improvements, and other product news." },
  ] as const;


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
            <h3 className="text-lg font-medium">Account Notifications</h3>
            <p className="text-sm text-muted-foreground">
                Choose what you want to be notified about.
            </p>
        </div>
        <div className="space-y-4">
          {notificationItems.map((item) => (
             <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">{item.label}</FormLabel>
                      <FormDescription>{item.description}</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
          ))}
        </div>

        <Separator />

        <div>
            <h3 className="text-lg font-medium">Marketing Communications</h3>
            <p className="text-sm text-muted-foreground">
                Manage your marketing email preferences.
            </p>
        </div>
         <div className="space-y-4">
          {marketingItems.map((item) => (
             <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">{item.label}</FormLabel>
                      <FormDescription>{item.description}</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
          ))}
        </div>
        
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
