import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { Bell, Monitor, Settings2, UserPen } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if(!session) {
    // to prevent user from accessing dashboard without signing in.
    redirect("/auth");
  }

  return (
    <div className="min-h-full flex gap-2">
      <Sidebar currentPath="/settings" />
      {/* Main Content */}
      <main className="p-2 md:p-8 flex flex-col gap-4 w-full">

        {/* Header */}
        <header className="">
          <div>
            <h1 className="text-2xl">Settings</h1>
          </div>
        </header>

        <section className="flex items-start bg-stone-50 rounded-sm border border-stone-300 p-4 w-full h-full"></section>

      </main>
    </div>
  );
}