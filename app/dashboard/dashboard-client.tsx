"use client";

import { signOut } from "@/lib/actions/auth-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function DashboardClientPage() {
  const router = useRouter();

  // Redirect to auth if not authenticated

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <div className="min-h-full flex gap-2">
      <Sidebar currentPath="/dashboard" />
      {/* Main Content */}
      <main className="">
        Dashboard
      </main>
    </div>
  );
}