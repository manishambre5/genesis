import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppHeader } from "@/components/app-header";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "genesis",
  description: "effortless library management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", playfairDisplay.variable, "font-sans", inter.variable)}
    >
      <body>
        <SidebarProvider>
          <TooltipProvider>
            <AppSidebar session={session} />
            <SidebarInset className="w-full">
              <AppHeader session={session} />
              {children}
            </SidebarInset>
          </TooltipProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
