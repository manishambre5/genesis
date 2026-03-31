import Sidebar from "../components/Sidebar";

export default function AddMemberClientPage() {
  return (
    <div className="min-h-full flex gap-2">
      <Sidebar currentPath="/add-member" />
      {/* Main Content */}
      <main className="p-8 flex flex-col gap-4 w-full">

        {/* Header */}
        <header className="">
          <div>
            <h1 className="text-2xl">Add a new member to the library</h1>
          </div>
        </header>

        <form className="flex flex-col items-center bg-stone-100 rounded-sm border-2 border-stone-100 p-4 gap-2 max-w-1/2">
          <input type="text" id="firstName" name="firstName" required placeholder="First Name" />

          <input type="text" id="lastName" name="lastName" required placeholder="Last Name" />

          <input type="email" id="email" name="email" required placeholder="Email Adress" />

          <input type="tel" id="contact" name="contact" required placeholder="Contact number" />

          <input type="date" id="membershipExpires" name="membershipExpires" required placeholder="Membership End Date" />

          <span><label>Member type: </label>
          <select id="type" name="type" required className="p-1 border border-stone-300 rounded-sm bg-stone-50">
            <option value="regular">Regular</option>
            <option value="student">Student</option>
            <option value="senior">Senior Citizen</option>
          </select>
          </span>

          <button>Add Member</button>
        </form>
      </main>
    </div>
  );
}