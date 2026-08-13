import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import { Plus, Calendar, Users, ArrowRight, X, Loader2, Layers } from 'lucide-react'

const Sessions = () => {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [sessions, setSessions] = useState([
    {
      id: 1,
      name: 'Session 2026 - Batch A',
      startDate: 'Jan 2026',
      endDate: 'Jun 2026',
      domains: 4,
      interns: 48,
      status: 'Active',
      color: 'bg-indigo-500',
    },
    {
      id: 2,
      name: 'Session 2026 - Batch B',
      startDate: 'Jul 2026',
      endDate: 'Dec 2026',
      domains: 3,
      interns: 36,
      status: 'Active',
      color: 'bg-green-500',
    },
    {
      id: 3,
      name: 'Session 2025 - Batch A',
      startDate: 'Jan 2025',
      endDate: 'Jun 2025',
      domains: 5,
      interns: 60,
      status: 'Completed',
      color: 'bg-gray-500',
    },
    
  ])

  // Create Session Modal State
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleCreateSession = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name.trim() || !formData.startDate || !formData.endDate) {
      setError('Please fill in all fields.')
      return
    }

    setSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newSession = {
        id: Date.now(),
        name: formData.name,
        startDate: new Date(formData.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        endDate: new Date(formData.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        domains: 0,
        interns: 0,
        status: 'Active',
        color: 'bg-indigo-500',
      }
      setSessions((prev) => [newSession, ...prev])
      setFormData({ name: '', startDate: '', endDate: '' })
      setModalOpen(false)
    } catch (err) {
      setError('Failed to create session. Please try again.')
    } finally {
      setSubmitting(false)
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
              <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
              <p className="mt-1 text-sm text-gray-500">Manage internship sessions</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Create Session
            </button>
          </div>

          {/* Session Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => navigate(`/admin/sessions/${session.id}`)}
                className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${session.color} flex items-center justify-center`}>
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      session.status === 'Active'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    {session.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900">{session.name}</h3>

                <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {session.startDate} - {session.endDate}
                  </span>
                </div>

                <div className="flex items-center gap-6 mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-gray-400" />
                    {session.domains} Domains
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gray-400" />
                    {session.interns} Interns
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-indigo-600 font-medium">View Domains</span>
                  <ArrowRight className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Create Session Modal */}
          {modalOpen && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            >
              <div
                className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                      <Layers className="h-4 w-4 text-indigo-600" />
                    </div>
                    <h2 className="text-base font-semibold text-gray-900">Create Session</h2>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateSession} className="px-6 py-5" noValidate>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Session Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Session 2026 - Batch C"
                        className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">End Date</label>
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>

                    {error && (
                      <div role="alert" className="rounded-lg border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-600">
                        {error}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                      {submitting ? 'Creating...' : 'Create Session'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Sessions