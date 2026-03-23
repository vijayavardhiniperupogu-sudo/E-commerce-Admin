"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Package, ShoppingCart, Users, IndianRupee } from "lucide-react";

export default function DashboardPage() {
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const loadData = () => {
    const p = localStorage.getItem("products");
    setProductsCount(p ? JSON.parse(p).length : 0);

    const o = localStorage.getItem("orders");
    setOrders(
      o
        ? JSON.parse(o)
        : [
            { id: 101, customer: "Ravi", amount: 1200, status: "Delivered" },
            { id: 102, customer: "Sita", amount: 800, status: "Pending" },
            { id: 103, customer: "Arjun", amount: 1500, status: "Shipped" },
          ]
    );

    const u = localStorage.getItem("users");
    setUsers(
      u
        ? JSON.parse(u)
        : [
            { id: 1, name: "Ravi" },
            { id: 2, name: "Sita" },
            { id: 3, name: "Arjun" },
          ]
    );
  };

  useEffect(() => {
    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* 🔥 Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">

        <Link href="/products">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p>Total Products</p>
                <h2 className="text-2xl font-bold">{productsCount}</h2>
              </div>
              <Package size={40} />
            </div>
          </div>
        </Link>

        <Link href="/orders">
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p>Total Orders</p>
                <h2 className="text-2xl font-bold">{orders.length}</h2>
              </div>
              <ShoppingCart size={40} />
            </div>
          </div>
        </Link>

        <Link href="/users">
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p>Total Users</p>
                <h2 className="text-2xl font-bold">{users.length}</h2>
              </div>
              <Users size={40} />
            </div>
          </div>
        </Link>

        <Link href="/revenue">
          <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <p>Revenue</p>
                <h2 className="text-2xl font-bold">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </h2>
              </div>
              <IndianRupee size={40} />
            </div>
          </div>
        </Link>

      </div>

      {/* 🔥 Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <table className="w-full">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="p-2">Order ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.slice(0, 3).map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="p-2">#{o.id}</td>
                <td className="p-2">{o.customer}</td>
                <td className="p-2">₹{o.amount}</td>
                <td className="p-2 font-semibold">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex gap-4">
          <Link href="/products" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Product
          </Link>

          <Link href="/orders" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            View Orders
          </Link>

          <Link href="/users" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
}