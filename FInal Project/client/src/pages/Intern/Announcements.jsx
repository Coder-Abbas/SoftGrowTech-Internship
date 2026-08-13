import React from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import { Megaphone } from 'lucide-react'

const Announcements = () => {
  const announcements = [
    {
      title: 'New Task Assigned',
      content: 'All interns are required to complete the React Authentication task by Friday.',
      date: 'Aug 12, 2026',
      author: 'Admin',
      color: 'bg-indigo-500',
    },
    {
      title: 'Internship Update',
      content: 'The MERN Development internship has been extended by one week.',
      date: 'Aug 10, 2026',
      author: 'Admin',
      color: 'bg-green-500',
    },
    {
      title: 'Submission Deadline',
      content: 'All pending submissions must be reviewed by the end of this week.',
      date: 'Aug 8, 2026',
      author: 'Admin',
      color: 'bg-amber-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-[250px]">
        <Header userName="Intern" basePath="/intern" />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
            <p className="mt-1 text-sm text-gray-500">Latest updates from your internship program</p>
          </div>

          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg ${announcement.color} flex items-center justify-center shrink-0`}>
                    <Megaphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{announcement.content}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {announcement.author} · {announcement.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Announcements