"use client";

import { useState } from "react";
import { usersData, UserType } from "@/lib/data";

export default function UsersPage() {
  const [users] = useState<UserType[]>(usersData);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Users</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Name</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">#{user.id}</td>
                <td className="p-3">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}