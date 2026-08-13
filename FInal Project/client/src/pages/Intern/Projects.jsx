import React from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import { Users, Calendar, ArrowRight } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      name: 'Web Development Internship',
      description: 'Learn modern web development using React and Node.js.',
      interns: 12,
      date: 'Aug 1 - Aug 31',
      progress: 72,
      status: 'Active',
    },
    {
      name: 'MERN Development Internship',
      description: 'Full-stack development with MongoDB, Express, React, Node.',
      interns: 15,
      date: 'Jul 20 - Aug 20',
      progress: 81,
      status: 'Active',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-[250px]">
        <Header userName="Intern" basePath="/intern" />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="mt-1 text-sm text-gray-500">Your assigned projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    {project.status}
                  </span>
                </div>

                <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gray-400" />
                    {project.interns} Interns
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {project.date}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium text-gray-700">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <button className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800 cursor-pointer">
                  View Details
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

export default Projects