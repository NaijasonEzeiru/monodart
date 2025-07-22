"use client";

import { AppSidebar } from "@/components/app-sidebar";
import AuthContext from "@/components/auth-context";
import LoadingPage from "@/components/loading";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, authChecking } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authChecking && !user) {
      toast.error("You are not Authorized to view this page", {
        description: "Please log in to before accessing this page",
      });
      router.replace("/auth/login");
    }
  }, [user, authChecking]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        {authChecking || !user ? (
          <LoadingPage />
        ) : (
          <div className="px-8">{children}</div>
        )}
        <div className="px-8"></div>
      </SidebarInset>
    </SidebarProvider>
  );
}
