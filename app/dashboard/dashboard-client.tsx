import prisma from "@/lib/prisma";
import Sidebar from "../components/Sidebar";
import { TrendingUp } from "lucide-react";

export default async function DashboardClientPage() {

  const totalBooks = await prisma.shelf.count();
  //const totalMembers = await prisma.club.count();
  const totalBooksOnRent = await prisma.shelf.count();
  const newBooks = await prisma.shelf.findMany({
    take: 5,
    orderBy: {dateAdded: "desc"},
  });


  return (
    <div className="min-h-full flex gap-2 bg-white">
      <Sidebar currentPath="/dashboard" />
      {/* Main Content */}
      <main className="p-8 w-full">

        {/* Header */}
        <header>
          <div>
            <div>
              <h1 className="text-2xl">Dashboard</h1>
              <p>Welcome back! Here's an overview of your library.</p>
            </div>
          </div>
        </header>

        <section className="flex flex-wrap gap-4">
          {/* Key Metrics */}
          <div className="bg-stone-50 border rounded-sm border-stone-300 p-4 h-full w-fit hover:bg-white transition-all">
            <h2 className="text-sm font-semibold text-stone-500 mb-6 uppercase">Key Metrics</h2>
            <div className="flex justify-between gap-16">

              <div className="flex flex-col gap-2 items-baseline">
                <div className="text-sm uppercase text-stone-700">Total Members</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl">{totalBooks}</span>
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-emerald-600">+ {totalBooks}</span>
                    <TrendingUp className="w-3 h-3 text-emerald-600 ml-1"/>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-baseline">
                <div className="text-sm uppercase text-stone-700">Total Books</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl">{totalBooks}</span>
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-sm text-emerald-600">+ {totalBooks}</span>
                    <TrendingUp className="w-3 h-3 text-emerald-600 ml-1"/>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-baseline">
                <div className="text-sm uppercase text-stone-700">currently rented</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl">{totalBooksOnRent}</span>
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-sm text-emerald-600">+ {totalBooksOnRent}</span>
                    <TrendingUp className="w-3 h-3 text-emerald-600 ml-1"/>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-stone-50 rounded-sm border border-stone-300 p-4 w-fit hover:bg-white transition-all">
            <h2 className="text-sm font-semibold text-stone-500 mb-6 uppercase">New Books</h2>
            <div className="grid grid-rows-5 gap-4 ">
              {newBooks.map((book, key) => {
                return (
                  <div key={key} className="">
                    <div>
                      <span className="text-xl">{book.title}</span>
                    </div>
                    <div><span className="text-sm">{book.dateAdded.toLocaleString()}</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}