// src/components/layout/onboarding-layout.tsx
import { OnboardingHeader } from "./header";
import { Progress } from "@/components/ui/progress";

type OnboardingLayoutProps = {
    children: React.ReactNode;
    step: number;
    totalSteps: number;
}

export default function OnboardingLayout({ children, step, totalSteps }: OnboardingLayoutProps) {
  const progressValue = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <OnboardingHeader />
      <div className="w-full max-w-md mx-auto px-4 pt-4">
        <Progress value={progressValue} className="h-2"/>
        <p className="text-sm text-muted-foreground text-right mt-2">
            Step {step} of {totalSteps}
        </p>
      </div>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
