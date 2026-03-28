"use client";

import { signOut } from "@/lib/actions/auth-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardClientPage() {
  const router = useRouter();

  // Redirect to auth if not authenticated

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <div className="min-h-full">
      {/* Main Content */}
      <main className="max-w-full m-auto">
        Dashboard
      </main>
    </div>
  );
}