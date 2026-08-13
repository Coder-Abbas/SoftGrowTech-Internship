import React, { useState } from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import { Plus, Megaphone, MoreVertical } from 'lucide-react'
import AddAnnouncementModal from '../../components/common/AddAnnouncementModal'

const Announcements = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'New Task Assigned',
      message: 'All interns are required to complete the React Authentication task by Friday.',
      date: 'Aug 12, 2026',
      author: 'Admin',
      priority: 'normal',
      audience: 'all',
      color: 'bg-indigo-500',
    },
    {
      id: 2,
      title: 'Internship Update',
      message: 'The MERN Development internship has been extended by one week.',
      date: 'Aug 10, 2026',
      author: 'Admin',
      priority: 'important',
      audience: 'all',
      color: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Submission Deadline',
      message: 'All pending submissions must be reviewed by the end of this week.',
      date: 'Aug 8, 2026',
      author: 'Admin',
      priority: 'urgent',
      audience: 'all',
      color: 'bg-amber-500',
    },
  ])

  const handleCreateAnnouncement = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newAnnouncement = {
      id: Date.now(),
      ...data,
      author: 'Admin',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      color: data.priority === 'urgent' ? 'bg-red-500' : data.priority === 'important' ? 'bg-amber-500' : 'bg-indigo-500',
    }

    setAnnouncements((prev) => [newAnnouncement, ...prev])
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-50 text-red-700'
      case 'important':
        return 'bg-amber-50 text-amber-700'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-[250px]">
        <Header userName="Admin" basePath="/admin" />

        <main className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
              <p className="mt-1 text-sm text-gray-500">Post and manage announcements</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Announcement
            </button>
          </div>

          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${announcement.color} flex items-center justify-center shrink-0`}>
                      <Megaphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getPriorityBadge(announcement.priority)}`}>
                          {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{announcement.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {announcement.author} · {announcement.date}
                      </p>
                    </div>
                  </div>
                  <button className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <AddAnnouncementModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleCreateAnnouncement}
          />
        </main>
      </div>
    </div>
  )
}

export default Announcements