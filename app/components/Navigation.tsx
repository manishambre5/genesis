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
    <header className="bg-white backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 text-emerald-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sailboat-icon lucide-sailboat">
                <path d="M10 2v15"/>
                <path d="M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z"/>
                <path d="M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z"/>
              </svg>
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className={`border-2 border-transparent px-3 py-2 text-lg font-medium transition-colors ${
                isActive("/")
                  ? "text-white bg-emerald-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Home
            </Link>

            {session && <Link
              href="/dashboard"
              className={`border-2 border-transparent px-4 py-2 text-lg font-medium transition-colors ${
                isActive("/dashboard")
                  ? "text-white bg-emerald-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Dashboard
            </Link>}

            {!session && <Link
              href="/auth"
              className={`border-2 border-transparent px-3 py-2 text-lg font-medium transition-colors ${
                isActive("/auth")
                  ? "text-white bg-emerald-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Sign In
            </Link>}

            {session && <Link
              href="/auth"
              className={`border-2 border-transparent px-3 py-2 text-lg font-medium transition-colors ${
                isActive("/auth")
                  ? "text-white bg-emerald-600"
                  : "text-gray-500 hover:text-gray-900"
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