import React from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import {
  ClipboardList,
  CheckCircle2,
  Rocket,
  Clock,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      label: 'Assigned Tasks',
      value: '10',
      change: '+2',
      trend: 'up',
      note: 'this week',
      icon: ClipboardList,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Completed Tasks',
      value: '8',
      change: '+3',
      trend: 'up',
      note: 'this week',
      icon: CheckCircle2,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Active Projects',
      value: '2',
      change: '+1',
      trend: 'up',
      note: 'this month',
      icon: Rocket,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Pending Tasks',
      value: '2',
      change: '-1',
      trend: 'down',
      note: '1 overdue',
      icon: Clock,
      color: 'bg-amber-50 text-amber-600',
    },
  ]

  const recentTasks = [
    { title: 'Build Login Page', status: 'Completed', due: 'Aug 14', progress: 100 },
    { title: 'Notes App', status: 'In Progress', due: 'Aug 16', progress: 80 },
    { title: 'Password Generator', status: 'In Progress', due: 'Aug 18', progress: 60 },
    { title: 'Dashboard UI', status: 'Pending', due: 'Aug 20', progress: 40 },
  ]

  const announcements = [
    { title: 'New Task Assigned', content: 'Complete the React Authentication task by Friday.', time: '2 hours ago' },
    { title: 'Internship Update', content: 'MERN Development internship extended by one week.', time: 'Yesterday' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-[250px]">
        <Header userName="Intern" basePath="/intern" />

        <main className="p-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, Intern 👋 Here's your progress overview.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                    <span className="text-sm text-gray-400">{stat.note}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Task Progress */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Task Progress</h2>
                <button className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800 cursor-pointer">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                {recentTasks.map((task, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900">{task.title}</span>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            task.status === 'Completed'
                              ? 'bg-green-50 text-green-700'
                              : task.status === 'In Progress'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">Due: {task.due}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Announcements</h2>
              <div className="space-y-5">
                {announcements.map((announcement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <span className="text-green-600 text-xs font-bold">📢</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{announcement.title}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{announcement.content}</p>
                      <p className="text-xs text-gray-400 mt-1">{announcement.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard