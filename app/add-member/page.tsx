import { auth } from "@/lib/auth";
import AddMemberClientPage from "./add-member-client";
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
  return <AddMemberClientPage />;
}