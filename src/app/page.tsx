import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/layout/auth-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ShieldCheck, Clock, ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Eliminate Payment Fraud",
    description: "Every transaction is monitored by our AI fraud detection system, protecting your business from costly vendor-related threats before they happen.",
    problem: "Vendor-related fraud, from fake invoices to compromised accounts, is a constant and costly threat.",
    solution: "Our AI cross-references every payment against vendor history and known fraud patterns, flagging suspicious activity in real-time to keep your funds safe."
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Automate Your Accounts Payable",
    description: "Stop wasting hours on manual data entry. Upload invoices via email or drag-and-drop, and let our AI extract the data in seconds.",
    problem: "Manual invoice processing is slow, tedious, and filled with human error, leading to incorrect payments.",
    solution: "PayVibe's AI-powered OCR automates data entry with over 99% accuracy, freeing up your team."
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Optimize Your Cash Flow",
    description: "Use our AI-powered Smart Scheduler to pay bills at the optimal time, avoiding late fees while holding onto your cash longer.",
    problem: "Poorly timed payments can strain cash flow, damage vendor relationships, and lead to missed opportunities.",
    solution: "Our intelligent scheduler analyzes your finances to suggest the best payment dates, improving your cash position."
  }
];

export default function LandingPage() {
  return (
    <AuthLayout>
      <div className="w-full">
        {/* Hero Section */}
        <section className="text-center py-20 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl text-accent">
              AI-Powered Fraud Detection for Secure, Automated Payments
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl my-6">
            PayVibe is an AI-first platform that automates your accounts payable, secures every transaction with advanced fraud detection, and optimizes your cash flow. Stop chasing invoices and start growing your business with confidence.

            </p>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black" asChild>
              <Link href="/signup">
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">No credit card required. Secure and easy setup.</p>
          </div>
        </section>

      
        {/* Features Section */}
        <section className="py-20 lg:py-24 bg-card">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-accent">Tired of the Payment Grind?</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg mt-4">
                You're losing valuable time and money to outdated processes and hidden risks. Here's how PayVibe fixes that.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col border-border/50 hover:border-primary transition-colors hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="font-headline text-accent/90">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <div>
                        <div className="flex items-start gap-2 mb-2">
                           <CheckCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                           <p className="text-sm"><strong>Problem:</strong> {feature.problem}</p>
                        </div>
                         <div className="flex items-start gap-2">
                           <CheckCircle className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                           <p className="text-sm"><strong>Solution:</strong> {feature.solution}</p>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Three Steps Section */}
        <section className="py-20 lg:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left column: Steps explanation */}
              <div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-accent mb-6">How PayVibe Works in 3 Simple Steps</h2>
                <ol className="space-y-6 list-decimal list-inside text-lg text-muted-foreground">
                  <li>
                    <span className="font-semibold text-foreground">Sign Up & Onboard:</span> Create your free account and complete a quick KYC to unlock all features.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Upload or Forward Invoices:</span> Easily upload invoices or forward them by email. Our AI extracts and verifies all the details for you.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Automate & Secure Payments:</span> Schedule, approve, and pay bills with AI-powered fraud detection and cash flow optimization.
                  </li>
                </ol>
              </div>
              {/* Right column: Image */}
              <div className="flex justify-center">
                <img
                  src="https://ideogram.ai/assets/image/lossless/response/8IQMa0dYQTCSsGTDwc6DqQ"
                  alt="Powering bill pay and invoicing for millions"
                  width={400}
                  height={400}
                  className="rounded-xl shadow-lg object-cover border border-[#2d1846]"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-24 bg-card text-center">
           <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-accent">
                    Ready to Transform Your Finances?
                </h2>
                <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl my-6">
                    Join thousands of businesses that trust PayVibe to handle their payments securely. Sign up today and experience the future of accounts payable.
                </p>
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black" asChild>
                    <Link href="/signup">
                        Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
           </div>
        </section>
      </div>
    </AuthLayout>
  );
}