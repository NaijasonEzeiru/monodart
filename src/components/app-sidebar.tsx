"use client";

import {
  AppWindow,
  ArrowLeftRight,
  Book,
  CodeXml,
  LayoutDashboard,
  Settings,
  SquarePen,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Apps",
      url: "/dashboard/apps",
      icon: AppWindow,
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: ArrowLeftRight,
    },
    {
      title: "Reviews",
      url: "/dashboard/reviews",
      icon: SquarePen,
    },
  ],
  navOther: [
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Developer",
      url: "/dashboard/developer",
      icon: CodeXml,
    },
    {
      title: "Documentation",
      url: "/dashboard/documentation",
      icon: Book,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarGroupLabel className="my-6 text-lg">
            Main menu
          </SidebarGroupLabel>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NavMain items={data.navMain} />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-6 text-lg">Other</SidebarGroupLabel>
          <NavMain items={data.navOther} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
