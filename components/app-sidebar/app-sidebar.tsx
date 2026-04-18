"use client"

import { NavQuickActions } from "@/components/app-sidebar/nav-quick-actions";
import { NavPages } from "@/components/app-sidebar/nav-pages";
import { NavUser } from "@/components/app-sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ArrowRightLeft, BookPlus, CornerDownLeft, CornerUpRight, Kayak, LayoutPanelLeft, LibraryBig, Plus, Settings, UserPlus, Users } from "lucide-react"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth-actions";
import { Session, User } from "better-auth";
import { Separator } from "../ui/separator";

const data = {
  navQuickActions: [
    {
      title: "Add",
      url: "",
      icon: Plus,
      isOpened: false,
      items: [
        {
          title: "Book",
          url: "/add-book",
          icon: BookPlus,
        },
        {
          title: "Member",
          url: "/add-member",
          icon: UserPlus,
        },
      ],
    },
    {
      title: "Transactions",
      url: "",
      icon: ArrowRightLeft,
      isOpened: false,
      items: [
        {
          title: "Lend Book",
          url: "/lend-book",
          icon: CornerUpRight,
        },
        {
          title: "Return Book",
          url: "/return-book",
          icon: CornerDownLeft,
        },
      ],
    },
  ],
  navPages: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutPanelLeft,
    },
    {
      name: "Shelf",
      url: "/shelf",
      icon: LibraryBig,
    },
    {
      name: "Club",
      url: "/club",
      icon: Users,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  session: {
    session: Session
    user: User
  } | null
}

export function AppSidebar({ session, ...props }: AppSidebarProps) {
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

  const userDetails = {
    name: session.user.name,
    email: session.user.email,
    avatar: "",
  }


  return (
    <Sidebar className="" collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild variant="outline">
                <Link href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Kayak className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">genesis</span>
                    <span className="truncate text-xs">Library of Baghdad</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <NavPages pages={data.navPages} isActive={isActive} />
            <NavQuickActions items={data.navQuickActions} isActive={isActive} />
        </SidebarContent>
        <Separator />
        <SidebarFooter>
            <NavUser user={userDetails} handleSignOut={handleSignOut} />
        </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
