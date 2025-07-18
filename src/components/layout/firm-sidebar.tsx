// src/components/layout/firm-sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Receipt,
  CreditCard,
  DollarSign,
  ShieldCheck,
  Briefcase,
  GitBranch,
  Bell,
  HeartHandshake,
  Database,
  MessageSquare,
  BarChart3
} from "lucide-react"
import Logo from "./logo"
import { Separator } from "../ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"

const FirmSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const isActive = (path: string) => pathname === path

  const handleLogout = () => {
    // In a real app, you'd clear auth tokens here
    router.push('/login');
  };

  const firmNavItems = [
    { href: "/firm-dashboard", icon: <Briefcase />, label: "Firm Dashboard" },
    { href: "/firm/financial-dashboard", icon: <BarChart3 />, label: "Financial Dashboard" },
    { href: "/workflow", icon: <GitBranch />, label: "Workflow" },
  ];

  const clientManagementItems = [
    { href: "/firm/payment-scheduler", icon: <DollarSign />, label: "Payment Scheduler" },
    { href: "/firm/invoice-manager", icon: <Receipt />, label: "Invoice Manager" },
    { href: "/firm/transaction-ledger", icon: <FileText />, label: "Transaction Ledger" },
  ];

  const firmOperationsItems = [
      { href: "/firm/fraud-monitoring", icon: <ShieldCheck />, label: "Fraud Monitoring" },
      { href: "/firm/vendor-insights", icon: <HeartHandshake />, label: "Vendor Insights" },
      { href: "/firm/notifications", icon: <Bell />, label: "Notifications Hub" },
      { href: "/firm/support", icon: <MessageSquare />, label: "Support Chat" },
      { href: "/firm/data-vault", icon: <Database />, label: "Data Vault" },
  ];

  const configurationItems = [
     { href: "/firm/account-settings", icon: <Settings />, label: "Account Settings" },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="text-lg font-semibold font-headline">PayVibe (Firm)</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
         <SidebarMenu>
            {firmNavItems.map(item => (
                 <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                        <Link href={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
         </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupLabel>Client Management</SidebarGroupLabel>
          <SidebarMenu>
             {clientManagementItems.map(item => (
                 <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                        <Link href={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Firm Operations</SidebarGroupLabel>
          <SidebarMenu>
             {firmOperationsItems.map(item => (
                 <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                        <Link href={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

         <SidebarGroup>
          <SidebarGroupLabel>Configuration</SidebarGroupLabel>
          <SidebarMenu>
             {configurationItems.map(item => (
                 <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                        <Link href={item.href}>
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="mb-2" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start h-auto p-2">
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-2 items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage data-ai-hint="person avatar" src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>F</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-medium">Firm User</span>
                    <span className="text-xs text-muted-foreground">firm@payvibe.com</span>
                  </div>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
            <DropdownMenuItem onClick={handleLogout} className="flex items-center w-full cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default FirmSidebar