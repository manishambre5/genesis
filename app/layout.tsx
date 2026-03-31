import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const dMSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "genesis",
  description: "effortless library management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dMSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navigation session={session} />
        {children}
      </body>
    </html>
  );
}
