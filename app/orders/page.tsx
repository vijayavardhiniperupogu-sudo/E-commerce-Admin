"use client";

import { useState } from "react";

export default function OrdersPage() {
  const [orders] = useState([
    { id: 101, customer: "Ravi", amount: 1200, status: "Delivered" },
    { id: 102, customer: "Sita", amount: 800, status: "Pending" },
    { id: 103, customer: "Arjun", amount: 1500, status: "Shipped" },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">#{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">
                  ₹{order.amount.toLocaleString("en-IN")}
                </td>
                <td
                  className={`p-3 font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}