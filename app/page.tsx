import { AppHeader } from "@/components/app-header";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { ExternalLink, LogIn } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
//import { stackServerApp } from "@/stack/server";
//import { redirect } from "next/navigation";

//export default async function Home() {
export default async function Home(){
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <Separator />
      <main className="flex items-center justify-center">
        <div className="p-4">
          <div className="text-center">
            <h1 className="font-serif md:text-9xl text-8xl font-bold text-stone-900 mb-6">genesis</h1>
            <h2 className="text-3xl md:text-4xl mb-6">Library Management</h2>
            <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
              Effortless library management - track collections, monitor checkouts and returns, and gain valuable insights.
            </p>
            <div className="flex gap-4 justify-center">
              {!session && <Button asChild size="lg">
                  <Link href="/auth">
                    Sign In<LogIn />
                  </Link>
                </Button>
              }
              <Button asChild variant="outline" size="lg">
                <Link href="https://github.com/manishambre5/genesis">
                    Source Code<ExternalLink />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}