import React from 'react';

export default function UsersTable({ users }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-2 text-left text-sm">#</th>
            <th className="px-4 py-2 text-left text-sm">Name</th>
            <th className="px-4 py-2 text-left text-sm">Username</th>
            <th className="px-4 py-2 text-left text-sm">Email</th>
            <th className="px-4 py-2 text-left text-sm">City</th>
            <th className="px-4 py-2 text-left text-sm">Company</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {users.map((u, idx) => (
            <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-4 py-3 text-sm">{idx + 1}</td>
              <td className="px-4 py-3 text-sm">{u.name}</td>
              <td className="px-4 py-3 text-sm">{u.username}</td>
              <td className="px-4 py-3 text-sm">{u.email}</td>
              <td className="px-4 py-3 text-sm">{u.address?.city}</td>
              <td className="px-4 py-3 text-sm">{u.company?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <div className="p-4 text-center text-sm text-gray-600 dark:text-gray-300">No results</div>}
    </div>
  );
}
