import { auth } from "@/lib/auth";
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
    <div className="min-h-full flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-serif md:text-9xl text-8xl font-bold text-gray-900 mb-6">genesis</h1>
          <h2 className="text-3xl md:text-4xl mb-6">Library Management</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Effortless library management - track collections, monitor checkouts and returns, and gain valuable insights.
          </p>
          <div className="flex gap-4 justify-center">
            {!session && <Link
              href="/auth"
              className="bg-gray-100 text-gray-700 border box-border border-transparent px-8 py-3 hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>}
            <Link
              href="#"
              className="bg-gray-100 text-gray-700 border box-border border-transparent px-8 py-3 hover:border-gray-900 hover:text-gray-900 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}