"use client"

import { Session, User } from "better-auth";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import React from "react";


type AppHeaderProps = React.ComponentProps<typeof Breadcrumb> & {
  session: {
    session: Session
    user: User
  } | null
}

export function AppHeader({ session, ...props }: AppHeaderProps) {

    // don't show sidebar if not logged in
    if (session === null) return null;

    const path = usePathname();
    // Split the path into segments and filter out empty strings
    const pathSegments = path.split("/").filter((segment) => segment !== "");

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="" />
        <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-8"
        />
        <Breadcrumb>
            <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                    <Home size="16" />
                </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.length > 0 && (
                <BreadcrumbSeparator className="hidden md:block" />
            )}

            {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const isLast = index === pathSegments.length - 1;
                
                //format label - capitalize and replace dashes with spaces
                const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

                return (
                    <React.Fragment key={href}>
                        <BreadcrumbItem>
                            {isLast ? (
                                <BreadcrumbPage>{label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                            )}
                            <BreadcrumbPage></BreadcrumbPage>
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                    </React.Fragment>
                );
            })}
            </BreadcrumbList>
        </Breadcrumb>
        </div>
    </header>
  )
}