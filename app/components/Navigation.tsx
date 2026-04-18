"use client";

import { signOut } from "@/lib/actions/auth-actions";
import { auth } from "@/lib/auth";
import { Kayak } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Session = typeof auth.$Infer.Session;

export default function Navigation({session}: { session: Session | null }) {
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

  return (
    <header className="bg-white backdrop-blur-sm border-b border-stone-300 sticky top-0 h-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 text-stone-900 flex items-center justify-center">
              <Kayak />
            </div>
          </Link>

          <nav className="flex items-center space-x-2 md:space-x-6">
            <Link
              href="/"
              className={`rounded-sm border box-border px-3 py-2 hover:bg-stone-100 transition-colors ${
                isActive("/")
                  ? "text-stone-900 bg-stone-50 border-stone-300"
                  : "text-stone-600 hover:text-stone-900 border-transparent"
              }`}
            >
              Home
            </Link>

            {session && <Link
              href="/dashboard"
              className={`rounded-sm border box-border px-3 py-2 hover:bg-stone-100 transition-colors ${
                isActive("/dashboard")
                  ? "text-stone-900 bg-stone-50 border-stone-300"
                  : "text-stone-600 hover:text-stone-900 border-transparent"
              }`}
            >
              Dashboard
            </Link>}

            {!session && <Link
              href="/auth"
              className={`rounded-sm border box-border px-3 py-2 hover:bg-stone-100 transition-colors ${
                isActive("/auth")
                  ? "text-stone-900 bg-stone-50 border-stone-300"
                  : "text-stone-600 hover:text-stone-900 border-transparent"
              }`}
            >
              Sign In
            </Link>}

            {session && <Link
              href="/auth"
              className={`rounded-sm border box-border px-3 py-2 hover:bg-stone-100 transition-colors ${
                isActive("/auth")
                  ? "text-stone-900 bg-stone-50 border-stone-300"
                  : "text-stone-600 hover:text-stone-900 border-transparent"
              }`}
              onClick={handleSignOut}
            >
              Sign Out
            </Link>}
          </nav>
        </div>
      </div>
    </header>
  );
}