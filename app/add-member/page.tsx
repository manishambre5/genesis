import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { addMember } from "@/lib/actions/crud";

export default async function AddBookPage() {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
    if(!session) {
      // to prevent user from accessing dashboard without signing in.
      redirect("/auth");
    }
  return (
    <div className="min-h-full w-full flex gap-2">
        <Sidebar currentPath="/add-member" />
        {/* Main Content */}
        <main className="p-2 md:p-8 flex flex-col gap-4 w-full">

            {/* Header */}
            <header className="">
            <div>
                <h1 className="text-2xl">Add a new member</h1>
            </div>
            </header>

            <form action={addMember} className="flex flex-col items-center bg-stone-50 rounded-sm border border-stone-300 p-2 md:p-4 gap-2 md:max-w-1/2">
            <div>
              <label htmlFor="firstName" className="text-sm">First Name *</label>
              <input type="text" id="firstName" name="firstName" required placeholder="Enter First Name" />
            </div>

            <div>
              <label htmlFor="lastName" className="text-sm">Last Name *</label>
              <input type="text" id="lastName" name="lastName" required placeholder="Enter Last Name" />
            </div>

            <div>
              <label htmlFor="email" className="text-sm">Email *</label>
              <input type="email" id="email" name="email" required placeholder="Enter Member Email Adress" />
            </div>

            <div>
              <label htmlFor="contact" className="text-sm">Contact no. *</label>
              <input type="tel" id="contact" name="contact" required placeholder="Enter Member Contact number" />
            </div>

            <div>
              <label htmlFor="membershipExpires" className="text-sm">Membership end date *</label>
              <input type="date" id="membershipExpires" name="membershipExpires" required placeholder="Enter Membership End Date" />
            </div>

            <div>
              <label htmlFor="type" className="text-sm">Member type</label>
              <select id="type" name="type" required className="p-1 border border-stone-300 rounded-sm bg-stone-50">
                <option value="regular">Regular</option>
                <option value="student">Student</option>
                <option value="senior">Senior Citizen</option>
              </select>
            </div>

            <button>Add Member</button>
            </form>

        </main>
    </div>
  );
}