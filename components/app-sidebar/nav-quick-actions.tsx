"use client"

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavQuickActions({
  items, isActive,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isOpened?: boolean
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
  isActive: (path: string) => boolean
}) {

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
            const hasActiveSubItem = item.items?.some((subItem) => isActive(subItem.url));

            return (
                <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={hasActiveSubItem || item.isOpened}
                    className="group/collapsible"
                >
                    <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={isActive(subItem.url)}>
                                <a href={subItem.url}>
                                    {subItem.icon && <subItem.icon />}
                                    <span>{subItem.title}</span>
                                </a>
                            </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            );
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
