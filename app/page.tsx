import Link from "next/link";
//import { stackServerApp } from "@/stack/server";
//import { redirect } from "next/navigation";

//export default async function Home() {
export default function Home(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-serif text-9xl font-bold text-gray-900 mb-6">Genesis</h1>
          <h2 className="text-4xl mb-6">Library Management</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Effortless library management - track collections, monitor checkouts and returns, and gain valuable insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth"
              className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="#"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold border-2 border-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}