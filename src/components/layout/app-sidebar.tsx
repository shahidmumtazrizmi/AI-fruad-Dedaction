
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
  ArrowRightLeft,
  FileText,
  Settings,
  LogOut,
  Receipt,
  User,
  CreditCard,
  Users,
  DollarSign,
  ShieldCheck,
  Building,
  Landmark,
  Briefcase,
  GitBranch,
} from "lucide-react"
import Logo from "./logo"
import { Separator } from "../ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "../ui/label"
import type { ComponentProps } from "react"

type UserRole = 'Admin' | 'Accountant' | 'Viewer' | 'Firm';

const SidebarSection = ({ role, allowedRoles, children }: { role: UserRole, allowedRoles: UserRole[], children: React.ReactNode }) => {
  if (!allowedRoles.includes(role)) {
    return null;
  }
  return <>{children}</>;
};


const AppSidebar = () => {
  const pathname = usePathname()
  const [currentRole, setCurrentRole] = useLocalStorage<UserRole>('userRole', 'Admin');

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="text-lg font-semibold font-headline">PayVibe</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0">
        <SidebarMenu className="px-2">
            <SidebarSection role={currentRole} allowedRoles={['Admin', 'Accountant', 'Viewer']}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")} tooltip="Dashboard">
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarSection>
             <SidebarSection role={currentRole} allowedRoles={['Firm']}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/firm-dashboard")} tooltip="Firm Dashboard">
                  <Link href="/firm-dashboard">
                    <Briefcase />
                    <span>Firm Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/workflow")} tooltip="Workflow">
                  <Link href="/workflow">
                    <GitBranch />
                    <span>Workflow</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarSection>
            
            <SidebarSection role={currentRole} allowedRoles={['Admin', 'Firm', 'Accountant']}>
              <SidebarMenuItem>
                 <SidebarMenuButton asChild isActive={isActive("/pay")} tooltip="Pay">
                  <Link href="/pay">
                    <DollarSign />
                    <span>Pay</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                 <SidebarMenuButton asChild isActive={isActive("/get-paid")} tooltip="Get Paid">
                  <Link href="/get-paid">
                    <Landmark />
                    <span>Get Paid</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                 <SidebarMenuButton asChild isActive={isActive("/customers")} tooltip="Customers">
                  <Link href="/customers">
                    <Users />
                    <span>Customers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarSection>
        </SidebarMenu>
        
        <SidebarSection role={currentRole} allowedRoles={['Admin', 'Accountant', 'Firm']}>
            <SidebarGroup className="mt-2">
            <SidebarGroupLabel>Reporting</SidebarGroupLabel>
            <SidebarMenu className="px-2">
                <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/invoices")} tooltip="Invoices">
                    <Link href="/invoices">
                    <Receipt />
                    <span>Invoices</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/transactions")} tooltip="Transactions">
                    <Link href="/transactions">
                    <ArrowRightLeft />
                    <span>Transactions</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/reports")} tooltip="Reports">
                    <Link href="/reports">
                    <FileText />
                    <span>Reports</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            </SidebarGroup>
        </SidebarSection>


        <SidebarSection role={currentRole} allowedRoles={['Admin', 'Firm']}>
            <SidebarGroup className="mt-2">
            <SidebarGroupLabel>Configuration</SidebarGroupLabel>
            <SidebarMenu className="px-2">
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip="General Settings">
                    <Link href="/settings">
                        <Settings />
                        <span>Settings</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarSection>

      </SidebarContent>
      <SidebarFooter>
         <div className="px-4 mb-2 space-y-1 group-data-[collapsible=icon]:hidden">
            <Label className="text-xs text-muted-foreground">Role</Label>
            <Select value={currentRole} onValueChange={(value: UserRole) => setCurrentRole(value)}>
                <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Accountant">Accountant</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                    <SelectItem value="Firm">Accounting Firm</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <Separator className="mb-2" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start h-auto p-2">
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-2 items-center">
                  <Avatar className="w-8 h-8">
                    <AvatarImage data-ai-hint="person avatar" src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-medium">{currentRole} User</span>
                    <span className="text-xs text-muted-foreground">{currentRole.toLowerCase()}@payvibe.com</span>
                  </div>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentRole} User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {currentRole.toLowerCase()}@payvibe.com
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
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
