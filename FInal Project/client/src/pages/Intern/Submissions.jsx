import React from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import { Plus, ExternalLink, GitBranch } from 'lucide-react'

const Submissions = () => {
  const submissions = [
    { task: 'Build Login Page', status: 'Approved', submitted: 'Aug 12, 2026', feedback: 'Great work! Clean code.' },
    { task: 'Notes App', status: 'Pending', submitted: 'Aug 12, 2026', feedback: 'Awaiting review...' },
    { task: 'Password Generator', status: 'In Progress', submitted: '-', feedback: 'Not submitted yet' },
  ]

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-50 text-green-700'
      case 'Pending':
        return 'bg-amber-50 text-amber-700'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-[250px]">
        <Header userName="Intern" basePath="/intern" />

        <main className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Submissions</h1>
              <p className="mt-1 text-sm text-gray-500">Submit and track your task submissions</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 cursor-pointer">
              <Plus className="w-4 h-4" />
              New Submission
            </button>
          </div>

          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{submission.task}</h3>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusStyle(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Submitted: {submission.submitted}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium text-gray-700">Feedback:</span> {submission.feedback}
                    </p>
                  </div>

                  {submission.status !== 'In Progress' && (
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 cursor-pointer">
                        <GitBranch className="w-4 h-4" />
                        Repo
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 cursor-pointer">
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Submissions