// src/components/settings/plans-settings.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

const planDetails = [
  {
    name: "Free",
    price: "0",
    period: "/month",
    description: "For individuals and small businesses getting started with smarter payments.",
    features: [
      "Pay by ACH bank transfer",
      "Pay by credit card (2.9% fee)",
      "Standard delivery speed",
      "Basic approval workflows",
    ],
  },
  {
    name: "Pro",
    price: "49",
    period: "/month",
    description: "For businesses that need advanced control, collaboration, and efficiency.",
    features: [
      "Everything in Free, plus:",
      "Pay by international SWIFT",
      "Advanced approval workflows",
      "Sync with QuickBooks & Xero",
      "Priority customer support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations requiring tailored solutions and dedicated support.",
    features: [
      "Everything in Pro, plus:",
      "Dedicated account manager",
      "Custom API integrations",
      "Multi-subsidiary support",
      "Advanced security features",
    ],
  },
];

export function PlansSettings() {
  const [currentPlan, setCurrentPlan] = useLocalStorage('currentPlan', 'Free');

  const handleChoosePlan = (planName: string) => {
    if (planName !== 'Enterprise') {
      setCurrentPlan(planName);
    }
  };

  return (
    <div className="space-y-6">
      <CardDescription>
        Choose the plan that's right for your business. You can upgrade or downgrade at any time.
      </CardDescription>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {planDetails.map((plan) => {
            const isCurrent = plan.name === currentPlan;
            const isEnterprise = plan.name === 'Enterprise';

            const buttonLink = isEnterprise ? '/contact-sales' : `/checkout?plan=${plan.name}&price=${plan.price}`;

            return (
              <Card key={plan.name} className={cn(
                'flex flex-col transition-all hover:shadow-xl hover:border-primary', 
                isCurrent ? 'border-primary ring-2 ring-primary' : ''
              )}>
                <CardHeader>
                  <CardTitle className="font-headline text-accent/80">{plan.name}</CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-teal-400 mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                   <Button asChild={isEnterprise} className={cn('w-full mt-6', isCurrent ? '' : 'bg-amber-500 hover:bg-amber-600 text-black')} disabled={isCurrent}>
                      {isEnterprise ? (
                         <Link href={buttonLink}>
                           {isCurrent ? "Current Plan" : "Contact Sales"}
                         </Link>
                      ) : (
                        <Link href={buttonLink} onClick={() => handleChoosePlan(plan.name)}>
                           {isCurrent ? "Current Plan" : "Choose Plan"}
                        </Link>
                      )}
                    </Button>
                </CardContent>
              </Card>
            )
        })}
      </div>
    </div>
  );
}
