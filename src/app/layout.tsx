import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lawyer House",
  description: "Created by Group 4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <section className="fixed	">
        <Navbar />
      </section>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
