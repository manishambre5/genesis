"use client";

import { signOut } from "@/lib/actions/auth-actions";
import { auth } from "@/lib/auth";
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-kayak-icon lucide-kayak"><path d="M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z"/><path d="M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61"/><path d="m6.707 6.707 10.586 10.586"/><path d="M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z"/></svg>
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