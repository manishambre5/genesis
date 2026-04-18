import { AppHeader } from "@/components/app-header";
import prisma from "@/lib/prisma";
import { TrendingUp } from "lucide-react";

export default async function DashboardClientPage() {

  const totalBooks = await prisma.shelf.count();
  const totalBooksAddedRecently = await prisma.shelf.count({
    where: {
      dateAdded: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });
  const totalMembers = await prisma.club.count();
  const totalMembersAddedRecently = await prisma.club.count({
    where: {
      membershipStartDate: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  }); // To-Do: add a dateAdded column in table in the future for accurate 'new members recently added' stat.
  const totalBooksOnRent = await prisma.shelf.count({
    where: {
      status: {
        not: "available",
      },
    },
  });
  const newBooks = await prisma.shelf.findMany({
    take: 5,
    orderBy: {dateAdded: "desc"},
  });


  return (
    <div className="min-h-full flex gap-2 bg-white">
      
      {/* Main Content */}
      <main className="p-2 md:p-8 flex flex-col gap-4 w-full">

        {/* Header */}
        <header>
          <div>
            <div>
              <h1 className="text-2xl">Dashboard</h1>
              <p>Welcome back! Here's an overview of your library.</p>
            </div>
          </div>
        </header>

        <section className="flex flex-wrap gap-2 md:gap-4">
          {/* Key Metrics */}
          <div className="bg-stone-50 border rounded-sm border-stone-300 p-2 md:p-4 h-fit w-full md:w-fit hover:bg-white transition-all">
            <h2 className="text-sm font-semibold text-stone-500 mb-6 uppercase">Key Metrics</h2>
            <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4 md:gap-16">

              <div className="flex flex-col md:gap-2 w-full border-t border-t-stone-300">
                <div className="flex items-baseline md:gap-2">
                  <span className="text-9xl">{totalMembers}</span>
                  {totalMembersAddedRecently > 0 && (
                    <div className="flex items-center justify-center mt-1">
                      <span className="text-sm text-emerald-600">+ {totalMembersAddedRecently}</span>
                      <TrendingUp className="w-3 h-3 text-emerald-600 ml-1" />
                    </div>
                  )}
                </div>
                <div className="text-sm uppercase text-stone-700">Total Members</div>
              </div>

              <div className="flex flex-col md:gap-2 w-full border-t border-t-stone-300">
                <div className="flex items-baseline md:gap-2">
                  <span className="text-9xl">{totalBooks}</span>
                  {totalBooksAddedRecently > 0 && (
                    <div className="flex items-center justify-center mt-1">
                      <span className="text-sm text-emerald-600">+ {totalBooksAddedRecently}</span>
                      <TrendingUp className="w-3 h-3 text-emerald-600 ml-1" />
                    </div>
                  )}
                </div>
                <div className="text-sm uppercase text-stone-700">Total Books</div>
              </div>

              <div className="flex flex-col md:gap-2 w-full border-t border-t-stone-300">
                <div className="flex items-baseline md:gap-2">
                  <span className="text-9xl">{totalBooksOnRent}</span>
                </div>
                <div className="text-sm uppercase text-stone-700">currently rented</div>
              </div>

            </div>
          </div>

          <div className="bg-stone-50 rounded-sm border border-stone-300 p-2 md:p-4 w-fit hover:bg-white transition-all">
            <h2 className="text-sm font-semibold text-stone-500 mb-6 uppercase">New Books in the library</h2>
            <div className="flex flex-col gap-2 md:gap-4 ">
              {newBooks.map((book, key) => {
                return (
                  <div key={key} className="border border-stone-300 p-1 rounded-sm bg-white">
                    <div>
                      <span className="text-lg md:text-xl">{book.title}</span>
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