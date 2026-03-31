import { auth } from "@/lib/auth";
import ShelfClientPage from "./shelf-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
    if(!session) {
      // to prevent user from accessing dashboard without signing in.
      redirect("/auth");
    }
  return <ShelfClientPage />;
}