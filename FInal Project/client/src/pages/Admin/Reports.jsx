import React from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import { Download } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

const Reports = () => {
  const taskData = [
    { month: 'Jan', completed: 45, pending: 20 },
    { month: 'Feb', completed: 60, pending: 15 },
    { month: 'Mar', completed: 75, pending: 25 },
    { month: 'Apr', completed: 55, pending: 18 },
    { month: 'May', completed: 90, pending: 12 },
    { month: 'Jun', completed: 82, pending: 18 },
  ]

  const statusData = [
    { name: 'Completed', value: 82 },
    { name: 'Pending', value: 18 },
    { name: 'Overdue', value: 5 },
  ]

  const COLORS = ['#16A34A', '#F59E0B', '#DC2626']

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-[250px]">
        <Header userName="Admin" userRole="Administrator" />

        <main className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
              <p className="mt-1 text-sm text-gray-500">Analytics and performance reports</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 cursor-pointer">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Task Completion Bar Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Task Completion Overview</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status Distribution */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Task Status Distribution</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Reports