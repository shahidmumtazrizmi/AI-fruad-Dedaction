
"use client";

import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { User, CreditCard, Settings, LogOut, Menu, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation";
import Logo from "./logo";

const AuthNav = () => (
  <header className="flex h-16 items-center justify-between px-4 md:px-6 bg-transparent">
    <Link href="/login" className="flex items-center gap-2">
      <Logo className="w-8 h-8 text-primary" />
      <span className="font-headline font-semibold text-lg">PayVibe</span>
    </Link>
    <div className="hidden md:flex items-center gap-4">
        <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
        </Button>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black" asChild>
            <Link href="/signup">Sign Up</Link>
        </Button>
    </div>
    <div className="md:hidden">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild><Link href="/login">Login</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/signup">Sign Up</Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  </header>
);

const OnboardingHeader = () => {
  const router = useRouter();

  return (
    <header className="flex h-16 items-center justify-end px-4 md:px-6 bg-transparent">
        <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
    </header>
  );
};

const AppHeader = () => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-card/50 px-6 sticky top-0 z-30 backdrop-blur-sm">
      <SidebarTrigger className="md:hidden" />
      <div className="w-full flex-1">
        {/* Can add search or page title here */}
      </div>
       <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                <AvatarImage data-ai-hint="person avatar" src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@payvibe.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings?tab=profile" className="flex items-center w-full">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
               <Link href="/settings?tab=billing" className="flex items-center w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center w-full">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login" className="flex items-center w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </header>
  )
}

export { AuthNav, OnboardingHeader };
export default AppHeader;
