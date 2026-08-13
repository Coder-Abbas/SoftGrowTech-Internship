import React from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import { Calendar, ArrowRight } from 'lucide-react'

const Tasks = () => {
  const tasks = [
    { title: 'Build Login Page', description: 'Create a responsive login page using React and Tailwind.', due: 'Aug 14', status: 'Completed', progress: 100 },
    { title: 'Notes App', description: 'Build a CRUD notes application with local storage.', due: 'Aug 16', status: 'In Progress', progress: 80 },
    { title: 'Password Generator', description: 'Create a password generator with multiple options.', due: 'Aug 18', status: 'In Progress', progress: 60 },
    { title: 'Dashboard UI', description: 'Design a professional dashboard interface.', due: 'Aug 20', status: 'Pending', progress: 40 },
  ]

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700'
      case 'In Progress':
        return 'bg-blue-50 text-blue-700'
      default:
        return 'bg-amber-50 text-amber-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-[250px]">
        <Header userName="Intern" basePath="/intern" />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="mt-1 text-sm text-gray-500">Your assigned tasks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((task, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusStyle(task.status)}`}>
                    {task.status}
                  </span>
                </div>

                <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    Due: {task.due}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium text-gray-700">{task.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                <button className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800 cursor-pointer">
                  View Task
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Tasks