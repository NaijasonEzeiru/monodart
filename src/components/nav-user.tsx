"use client";

import { LogOut } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AuthContext from "./auth-context";

export function NavUser() {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("monodat_token");
    localStorage.removeItem("verify");
    setUser(null);
    router.push("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => logout()}
          variant="outline"
          tooltip="Log out"
          // className="bg-foreground text-background hover:bg-foreground/80 outline-none ring-0"
          asChild
        >
          {/* Log out */}
          <Button
            // variant="link"
            className="justify-start px-2 bg-black hover:bg-black/90 shadow-none"
            onClick={() => logout()}
          >
            <LogOut />
            Log out
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
