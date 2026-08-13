import React, { useState, useEffect, useRef } from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import { Plus, Search, MoreVertical, X, Loader2, UserPlus, Trash2, Edit, Eye } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const Interns = () => {
  const [interns, setInterns] = useState([
    { id: 1, name: 'Ali Raza', email: 'ali@gmail.com', internship: 'Web Development', tasks: '8/10', status: 'Active', color: 'bg-blue-500' },
    { id: 2, name: 'Sara Khan', email: 'sara@gmail.com', internship: 'UI/UX Design', tasks: '7/10', status: 'Active', color: 'bg-green-500' },
    { id: 3, name: 'Ahmed Hassan', email: 'ahmed@gmail.com', internship: 'MERN Development', tasks: '9/10', status: 'Active', color: 'bg-purple-500' },
    { id: 4, name: 'Muhammad Ali', email: 'muhammad@gmail.com', internship: 'Python Internship', tasks: '6/10', status: 'Active', color: 'bg-amber-500' },
  ])

  // searchTerm is controlled state — interns (the source data) is never mutated by search
  const [searchTerm, setSearchTerm] = useState('')
  const [internshipFilter, setInternshipFilter] = useState('Internship')
  const [statusFilter, setStatusFilter] = useState('Status')

  // Derive the filtered list from the full list + search term + filters (non-destructive)
  const filteredInterns = interns.filter((intern) => {
    const term = searchTerm.trim().toLowerCase()
    const matchesSearch =
      !term ||
      intern.name.toLowerCase().includes(term) ||
      intern.email.toLowerCase().includes(term) ||
      intern.internship.toLowerCase().includes(term)

    const matchesInternship =
      internshipFilter === 'Internship' || intern.internship === internshipFilter

    const matchesStatus =
      statusFilter === 'Status' || intern.status === statusFilter

    return matchesSearch && matchesInternship && matchesStatus
  })

  // Modal / dropdown state
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [actionMenuOpenId, setActionMenuOpenId] = useState(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewIntern, setViewIntern] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editIntern, setEditIntern] = useState(null)

  // Form state
  const [addFormData, setAddFormData] = useState({ name: '', email: '', internship: '', status: 'Active' })
  const [editFormData, setEditFormData] = useState({ name: '', email: '', internship: '', status: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Ref that tracks the currently-open menu's DOM node only (not every row)
  const openMenuRef = useRef(null)
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500', 'bg-pink-500', 'bg-indigo-500']

  // Close action menu when clicking outside (only when a menu is open)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuRef.current && !openMenuRef.current.contains(event.target)) {
        setActionMenuOpenId(null)
      }
    }
    if (actionMenuOpenId !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [actionMenuOpenId])

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (addModalOpen || viewModalOpen || editModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [addModalOpen, viewModalOpen, editModalOpen])

  // Close modals on Escape
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setAddModalOpen(false)
        setViewModalOpen(false)
        setEditModalOpen(false)
        setActionMenuOpenId(null)
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  // --- Add Intern ---
  const handleAddIntern = async (e) => {
    e.preventDefault()
    setError('')

    if (!addFormData.name.trim() || !addFormData.email.trim() || !addFormData.internship.trim()) {
      setError('Please fill in all fields.')
      return
    }

    setSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newIntern = {
        id: Date.now(),
        name: addFormData.name.trim(),
        email: addFormData.email.trim(),
        internship: addFormData.internship.trim(),
        tasks: '0/10',
        status: addFormData.status,
        color: colors[interns.length % colors.length],
      }
      setInterns((prev) => [...prev, newIntern])
      setAddFormData({ name: '', email: '', internship: '', status: 'Active' })
      setAddModalOpen(false)
      toast.success('Intern added successfully!')
    } catch (err) {
      setError('Failed to add intern. Please try again.')
      toast.error('Failed to add intern.')
    } finally {
      setSubmitting(false)
    }
  }

  // --- Update Intern ---
  const openEditModal = (intern) => {
    setEditIntern(intern)
    setEditFormData({
      name: intern.name,
      email: intern.email,
      internship: intern.internship,
      status: intern.status,
    })
    setEditModalOpen(true)
    setActionMenuOpenId(null)
  }

  const handleUpdateIntern = async (e) => {
    e.preventDefault()
    setError('')

    if (!editFormData.name.trim() || !editFormData.email.trim() || !editFormData.internship.trim()) {
      setError('Please fill in all fields.')
      return
    }

    setSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setInterns((prev) =>
        prev.map((intern) =>
          intern.id === editIntern.id
            ? { ...intern, name: editFormData.name.trim(), email: editFormData.email.trim(), internship: editFormData.internship.trim(), status: editFormData.status }
            : intern
        )
      )
      setEditModalOpen(false)
      setEditIntern(null)
      toast.success('Intern updated successfully!')
    } catch (err) {
      setError('Failed to update intern. Please try again.')
      toast.error('Failed to update intern.')
    } finally {
      setSubmitting(false)
    }
  }

  // --- View Intern ---
  const openViewModal = (intern) => {
    setViewIntern(intern)
    setViewModalOpen(true)
    setActionMenuOpenId(null)
  }

  // --- Delete Intern ---
  const handleDeleteIntern = (id) => {
    setInterns((prev) => prev.filter((intern) => intern.id !== id))
    setActionMenuOpenId(null)
    toast.success('Intern deleted successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Sidebar />
      <div className="ml-[250px]">
        <Header userName="Admin" userRole="Administrator" />

        <main className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Interns</h1>
              <p className="mt-1 text-sm text-gray-500">{interns.length} total interns</p>
            </div>
            <button
              onClick={() => setAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Intern
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 flex-1 max-w-sm bg-white border border-gray-200 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search interns..."
                className="w-full text-sm focus:outline-none placeholder-gray-400"
              />
            </div>
            <select
              value={internshipFilter}
              onChange={(e) => setInternshipFilter(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option>Internship</option>
              <option>Web Development</option>
              <option>UI/UX Design</option>
              <option>MERN Development</option>
              <option>Python Internship</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option>Status</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Interns Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Intern</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Internship</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Tasks</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInterns.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-400">
                      No interns found
                    </td>
                  </tr>
                ) : (
                  filteredInterns.map((intern) => (
                    <tr key={intern.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${intern.color} flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">
                              {intern.name.split(' ').map(w => w[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{intern.name}</p>
                            <p className="text-xs text-gray-500">{intern.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{intern.internship}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{intern.tasks}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                          {intern.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative" ref={actionMenuOpenId === intern.id ? openMenuRef : null}>
                          <button
                            onClick={() => setActionMenuOpenId(actionMenuOpenId === intern.id ? null : intern.id)}
                            className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                          </button>
                          {actionMenuOpenId === intern.id && (
                            <div className="absolute right-0 mt-1 w-40 z-[100] bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                              <button
                                onClick={() => openViewModal(intern)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                              <button
                                onClick={() => openEditModal(intern)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                              >
                                <Edit className="w-4 h-4" />
                                Update
                              </button>
                              <button
                                onClick={() => handleDeleteIntern(intern.id)}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Add Intern Modal */}
      {addModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => setAddModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                  <UserPlus className="h-4 w-4 text-indigo-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Add New Intern</h2>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddIntern} className="px-6 py-5" noValidate>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={addFormData.name}
                    onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                    placeholder="e.g. Fatima Noor"
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={addFormData.email}
                    onChange={(e) => setAddFormData({ ...addFormData, email: e.target.value })}
                    placeholder="e.g. fatima@gmail.com"
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Internship</label>
                  <input
                    type="text"
                    value={addFormData.internship}
                    onChange={(e) => setAddFormData({ ...addFormData, internship: e.target.value })}
                    placeholder="e.g. Web Development"
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={addFormData.status}
                    onChange={(e) => setAddFormData({ ...addFormData, status: e.target.value })}
                    className="w-full cursor-pointer rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
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
                  onClick={() => { setAddModalOpen(false); setError('') }}
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
                  {submitting ? 'Adding...' : 'Add Intern'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Intern Modal */}
      {viewModalOpen && viewIntern && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => setViewModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                  <Eye className="h-4 w-4 text-indigo-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Intern Details</h2>
              </div>
              <button
                onClick={() => setViewModalOpen(false)}
                className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full ${viewIntern.color} flex items-center justify-center`}>
                  <span className="text-white text-sm font-bold">
                    {viewIntern.name.split(' ').map(w => w[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{viewIntern.name}</p>
                  <p className="text-sm text-gray-500">{viewIntern.email}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Internship</span>
                  <span className="text-sm font-medium text-gray-900">{viewIntern.internship}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">Tasks</span>
                  <span className="text-sm font-medium text-gray-900">{viewIntern.tasks}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="text-sm font-medium text-gray-900">{viewIntern.status}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setViewModalOpen(false)}
                className="cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Intern Modal */}
      {editModalOpen && editIntern && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => setEditModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                  <Edit className="h-4 w-4 text-indigo-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Update Intern</h2>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateIntern} className="px-6 py-5" noValidate>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    placeholder="e.g. Fatima Noor"
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    placeholder="e.g. fatima@gmail.com"
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Internship</label>
                  <input
                    type="text"
                    value={editFormData.internship}
                    onChange={(e) => setEditFormData({ ...editFormData, internship: e.target.value })}
                    placeholder="e.g. Web Development"
                    className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    className="w-full cursor-pointer rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
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
                  onClick={() => { setEditModalOpen(false); setError('') }}
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
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Interns
