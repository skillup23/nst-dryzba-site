import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

import { dbConnect } from "@/lib/mongo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "НСТ Дружба",
  description: "Управление шлагбаумом",
};

export default async function RootLayout({ children }) {
  const conn = await dbConnect();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="p-2">{children}</main>
      </body>
    </html>
  );
}
