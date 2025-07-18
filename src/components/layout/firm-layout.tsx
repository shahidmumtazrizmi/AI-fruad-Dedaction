// src/components/layout/firm-layout.tsx
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import FirmSidebar from "@/components/layout/firm-sidebar"
import Header from "@/components/layout/header"

export default function FirmLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <FirmSidebar />
        <SidebarInset className="min-h-screen">
          {/* Header removed as per request */}
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
