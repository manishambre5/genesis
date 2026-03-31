import Sidebar from "../components/Sidebar";

export default function AddBookClientPage() {
  return (
    <div className="min-h-full flex gap-2">
      <Sidebar currentPath="/add-book" />
      {/* Main Content */}
      <main className="p-8 flex flex-col gap-4 w-full">

        {/* Header */}
        <header className="">
          <div>
            <h1 className="text-2xl">Add a new book to the collection</h1>
          </div>
        </header>

        <form className="flex flex-col items-center bg-stone-100 rounded-sm border-2 border-stone-100 p-4 gap-2 max-w-1/2">
          <input type="text" id="isbn" name="isbn" required placeholder="ISBN" />

          <input type="text" id="title" name="title" required placeholder="Title" />

          <input type="text" id="author" name="author" required placeholder="Author" />

          <input type="text" id="publisher" name="publisher" required placeholder="Publisher" />

          <input type="number" id="publicationYear" name="publicationYear" required min="1800" max="2026" placeholder="Publication Year" />

          <input type="text" id="edition" name="edition" placeholder="Edition" />

          <input type="text" id="genre" name="genre" required placeholder="Genre" />

          <input type="number" id="totalCopies" name="totalCopies" required min="1" defaultValue={1} />

          <input type="text" id="location" name="location" required placeholder="Location in the Library" />

          <button>Add Book</button>
        </form>
      </main>
    </div>
  );
}