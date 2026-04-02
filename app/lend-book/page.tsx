import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "../components/Sidebar";
//import { lendBook } from "@/lib/actions/crud";

export default async function LendBookPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if(!session) {
        // to prevent user from accessing dashboard without signing in.
        redirect("/auth");
    }

    return (
        <div className="min-h-full flex gap-2">
            <Sidebar currentPath="/lend-book" />
            {/* Main Content */}
            <main className="p-2 md:p-8 flex flex-col gap-4 w-full">

                {/* Header */}
                <header className="">
                <div>
                    <h1 className="text-2xl">Lend a book</h1>
                </div>
                </header>

                <form className="flex flex-col items-center bg-stone-50 rounded-sm border border-stone-300 p-2 md:p-4 gap-2 md:max-w-1/2">
                    <div>
                        <label htmlFor="isbn" className="text-sm">ISBN *</label>
                        <input type="text" id="isbn" name="isbn" required placeholder="Enter ISBN" />
                    </div>

                    <div>
                        <label htmlFor="title" className="text-sm">Title *</label>
                        <input type="text" id="title" name="title" required placeholder="Enter book title" />
                    </div>

                    <div>
                        <label htmlFor="author" className="text-sm">Author *</label>
                        <input type="text" id="author" name="author" required placeholder="Enter Author" />
                    </div>

                    <div>
                        <label htmlFor="publisher" className="text-sm">Publisher *</label>
                        <input type="text" id="publisher" name="publisher" required placeholder="Enter Publisher" />
                    </div>

                    <div>
                        <label htmlFor="publicationYear" className="text-sm">Publication Year *</label>
                        <input type="number" id="publicationYear" name="publicationYear" required min="1800" max="2026" placeholder="Year" />
                    </div>

                    <div>
                        <label htmlFor="edition" className="text-sm">Edition (optional)</label>
                        <input type="text" id="edition" name="edition" placeholder="Enter Edition" />
                    </div>

                    <div>
                        <label htmlFor="genre" className="text-sm">Genre *</label>
                        <input type="text" id="genre" name="genre" required placeholder="Enter Genre" />
                    </div>

                    <div>
                        <label htmlFor="totalCopies" className="text-sm">Total Copies *</label>
                        <input type="number" id="totalCopies" name="totalCopies" required min="1" placeholder="Enter total no. of copies" />
                    </div>

                    <div>
                        <label htmlFor="location" className="text-sm">Location *</label>
                        <input type="text" id="location" name="location" required placeholder="Enter location of the book in the Library" />
                    </div>

                    <button>Lend Book</button>
                </form>

            </main>
        </div>
    );
}