import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce Admin",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex">

        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white p-5 flex flex-col">
          <h2 className="text-2xl font-bold mb-6">Ecommerce Admin</h2>
          <ul className="flex flex-col gap-2">
            <li className="hover:bg-gray-700 p-2 rounded">
              <a href="/dashboard">Dashboard</a>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <a href="/products">Products</a>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <a href="/orders">Orders</a>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <a href="/users">Users</a>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-gray-100 p-6 overflow-auto">
          {children}
        </div>

      </body>
    </html>
  );
}