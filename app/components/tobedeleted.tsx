"use client";

import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton } from "@/components/ui/sidebar";
import { signOut } from "@/lib/actions/auth-actions";
import { auth } from "@/lib/auth";
import { Grid, Home, Kayak, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Session = typeof auth.$Infer.Session;

export default function AppSidebar({session}: { session: Session | null }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  // don't show sidebar if not logged in
  if (session === null) return null;

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/"><Kayak /></Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={isActive("/")} asChild>
                  <Link href="/"><Home />Home</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                {session &&
                <SidebarMenuButton isActive={isActive("/dashboard")} asChild>
                  <Link href="/dashboard"><Grid />Dashboard</Link>
                </SidebarMenuButton>}
              </SidebarMenuItem>
              <SidebarMenuItem>
                {!session &&
                <SidebarMenuButton isActive={isActive("/auth")} asChild>
                  <Link href="/auth"><LogIn />Sign In</Link>
                </SidebarMenuButton>}
              </SidebarMenuItem>
              <SidebarMenuItem>
                {session &&
                <SidebarMenuButton isActive={isActive("/auth")} asChild>
                  <Link href="/auth" onClick={handleSignOut}><LogOut />Sign Out</Link>
                </SidebarMenuButton>}
              </SidebarMenuItem>
            </SidebarMenu>
            
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}