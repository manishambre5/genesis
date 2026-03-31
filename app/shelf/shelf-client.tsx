import Sidebar from "../components/Sidebar";

export default function ShelfClientPage() {
  return (
    <div className="min-h-full flex gap-2">
      <Sidebar currentPath="/shelf" />
      {/* Main Content */}
      <main className="p-8 flex flex-col gap-4 w-full">

        {/* Header */}
        <header className="">
          <div>
            <h1 className="text-2xl">Shelf</h1>
          </div>
        </header>
      </main>
    </div>
  );
}