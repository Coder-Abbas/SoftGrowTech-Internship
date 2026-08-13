import React from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import StatsSection from '../../components/common/StatsSection'
import { Plus, ArrowRight } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const Dashboard = () => {
  const chartData = [
    { day: 'Mon', tasks: 12 },
    { day: 'Tue', tasks: 18 },
    { day: 'Wed', tasks: 15 },
    { day: 'Thu', tasks: 24 },
    { day: 'Fri', tasks: 20 },
    { day: 'Sat', tasks: 28 },
    { day: 'Sun', tasks: 22 },
  ]

  const activities = [
    { name: 'Ahmed Hassan', action: 'submitted "React Authentication"', time: '10 minutes ago', color: 'bg-blue-500' },
    { name: 'Sara Khan', action: 'completed "Dashboard UI"', time: '32 minutes ago', color: 'bg-green-500' },
    { name: 'Muhammad Ali', action: 'was added to MERN Internship', time: '1 hour ago', color: 'bg-purple-500' },
    { name: 'System', action: 'New task assigned to Ali', time: '2 hours ago', color: 'bg-amber-500' },
    { name: 'System', action: 'Internship "Web Development" created', time: 'Yesterday', color: 'bg-indigo-500' },
  ]

  const submissions = [
    { intern: 'Ali Raza', task: 'React Login', time: '10 min ago', color: 'bg-blue-500' },
    { intern: 'Sara Khan', task: 'Notes App', time: '35 min ago', color: 'bg-green-500' },
    { intern: 'Ahmed Hassan', task: 'Password Generator', time: '1 hr ago', color: 'bg-purple-500' },
  ]

  const internships = [
    { name: 'Web Development', interns: 12, progress: 72, tasks: '18/25', status: 'Active' },
    { name: 'UI/UX Design', interns: 8, progress: 54, tasks: '12/22', status: 'Active' },
    { name: 'MERN Development', interns: 15, progress: 81, tasks: '24/30', status: 'Active' },
    { name: 'Python Internship', interns: 13, progress: 48, tasks: '10/21', status: 'Active' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-[250px]">
        {/* Top Header */}
        <Header userName="Admin" basePath="/admin" />

        {/* Main Content */}
        <main className="p-8">
          {/* Dashboard Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Welcome back, Admin 👋 Here's what's happening with your internship program today.
              </p>
            </div>
           
          </div>

          {/* Stats Cards with Range Filter */}
          <StatsSection />

          {/* Internship Overview */}
          <div className="bg-white rounded-xl border border-gray-200 mb-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Active Internships</h2>
              <button className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Internship</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Interns</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Progress</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Tasks</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {internships.map((internship) => (
                    <tr key={internship.name} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{internship.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{internship.interns}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-600 rounded-full"
                              style={{ width: `${internship.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{internship.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{internship.tasks}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {internship.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart + Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Task Completion Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Task Completion</h2>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="tasks"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      fill="url(#colorTasks)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-5">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center shrink-0`}>
                      <span className="text-white text-xs font-bold">
                        {activity.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{activity.name}</span>{' '}
                        <span className="text-gray-500">{activity.action}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Submissions */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Pending Submissions</h2>
              <button className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Intern</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Task</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Submitted</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${submission.color} flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">
                              {submission.intern.split(' ').map(w => w[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{submission.intern}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{submission.task}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{submission.time}</td>
                      <td className="px-6 py-4">
                        <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-lg hover:bg-indigo-100 cursor-pointer">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard