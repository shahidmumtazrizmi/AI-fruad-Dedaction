import { AuthNav, OnboardingHeader } from "./header";

type AuthLayoutProps = {
    children: React.ReactNode;
    headerType?: 'default' | 'onboarding';
}

export default function AuthLayout({ children, headerType = 'default' }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {headerType === 'onboarding' ? <OnboardingHeader /> : <AuthNav />}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
