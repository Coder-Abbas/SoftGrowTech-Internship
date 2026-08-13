import React from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import { Search, MoreVertical } from 'lucide-react'

const Users = () => {
  const users = [
    { name: 'Admin', email: 'admin@gmail.com', role: 'Admin', status: 'Active', color: 'bg-indigo-500' },
    { name: 'Intern', email: 'intern@gmail.com', role: 'Intern', status: 'Active', color: 'bg-green-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-[250px]">
        <Header userName="Admin" userRole="Administrator" />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="mt-1 text-sm text-gray-500">Manage system users</p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 flex-1 max-w-sm bg-white border border-gray-200 rounded-lg px-3 py-2 mb-6">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full text-sm focus:outline-none placeholder-gray-400"
            />
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Role</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">{user.name[0]}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Users