import { auth } from "@/lib/auth";
import AddBookClientPage from "./add-book-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AddBookPage() {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
    if(!session) {
      // to prevent user from accessing dashboard without signing in.
      redirect("/auth");
    }
  return <AddBookClientPage />;
}