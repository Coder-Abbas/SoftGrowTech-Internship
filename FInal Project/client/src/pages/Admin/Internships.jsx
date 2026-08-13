import React, { useState, useMemo } from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import {
    Plus, Search, Users, CheckCircle2, Calendar, MoreVertical, ArrowRight,
    X, Loader2, Code2, Palette, Atom, Terminal, Smartphone, Bot,
} from 'lucide-react'

const iconOptions = [
    { icon: Code2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { icon: Palette, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Atom, color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: Terminal, color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Bot, color: 'text-pink-600', bg: 'bg-pink-50' },
]

const initialInternships = [
    {
        id: 1,
        name: 'Web Development Internship',
        description: 'Learn modern web development using React and Node.js.',
        interns: 12,
        tasks: 25,
        date: 'Aug 1 - Aug 31',
        progress: 72,
        status: 'Active',
        style: iconOptions[0],
        createdAt: '2026-08-01',
    },
    {
        id: 2,
        name: 'UI/UX Design Internship',
        description: 'Master user interface and experience design principles.',
        interns: 8,
        tasks: 22,
        date: 'Aug 5 - Sep 5',
        progress: 54,
        status: 'Active',
        style: iconOptions[1],
        createdAt: '2026-08-05',
    },
    {
        id: 3,
        name: 'MERN Development Internship',
        description: 'Full-stack development with MongoDB, Express, React, Node.',
        interns: 15,
        tasks: 30,
        date: 'Jul 20 - Aug 20',
        progress: 81,
        status: 'Completed',
        style: iconOptions[2],
        createdAt: '2026-07-20',
    },
    {
        id: 4,
        name: 'Python Internship',
        description: 'Backend development and automation with Python.',
        interns: 13,
        tasks: 21,
        date: 'Aug 10 - Sep 10',
        progress: 48,
        status: 'Active',
        style: iconOptions[3],
        createdAt: '2026-08-10',
    },
]

const Internships = () => {
    const [internships, setInternships] = useState(initialInternships)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('Status')
    const [sortOrder, setSortOrder] = useState('Sort')
    const [modalOpen, setModalOpen] = useState(false)

    // Create modal state
    const [formData, setFormData] = useState({ name: '', description: '', startDate: '', endDate: '' })
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const filteredInternships = useMemo(() => {
        let result = [...internships]

        const term = searchTerm.trim().toLowerCase()
        if (term) {
            result = result.filter(
                (item) =>
                    item.name.toLowerCase().includes(term) ||
                    item.description.toLowerCase().includes(term)
            )
        }

        if (statusFilter !== 'Status') {
            result = result.filter((item) => item.status === statusFilter)
        }

        if (sortOrder === 'Newest') {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        } else if (sortOrder === 'Oldest') {
            result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        }

        return result
    }, [internships, searchTerm, statusFilter, sortOrder])

    const handleCloseModal = () => {
        setModalOpen(false)
        setFormData({ name: '', description: '', startDate: '', endDate: '' })
        setError('')
    }

    const handleCreateInternship = async (e) => {
        e.preventDefault()
        setError('')

        if (!formData.name.trim() || !formData.description.trim()) {
            setError('Please fill in the name and description.')
            return
        }
        if (!formData.startDate || !formData.endDate) {
            setError('Please select a start and end date.')
            return
        }
        if (new Date(formData.endDate) < new Date(formData.startDate)) {
            setError('End date cannot be before the start date.')
            return
        }

        setSubmitting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 500)) // replace with real API call

            const style = iconOptions[internships.length % iconOptions.length]
            const formatDate = (d) =>
                new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

            const newInternship = {
                id: Date.now(),
                name: formData.name.trim(),
                description: formData.description.trim(),
                interns: 0,
                tasks: 0,
                date: `${formatDate(formData.startDate)} - ${formatDate(formData.endDate)}`,
                progress: 0,
                status: 'Active',
                style,
                createdAt: formData.startDate,
            }

            setInternships((prev) => [newInternship, ...prev])
            handleCloseModal()
        } catch (err) {
            setError('Failed to create internship. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="ml-[250px]">
                <Header userName="Admin" userRole="Administrator" />

                <main className="p-8">
                    <div className="mb-8 flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Internships</h1>
                            <p className="mt-1 text-sm text-gray-500">Manage your internship programs</p>
                        </div>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                        >
                            <Plus className="h-4 w-4" />
                            Create Internship
                        </button>
                    </div>

                    {/* Search & Filters */}
                    <div className="mb-6 flex items-center gap-4">
                        <div className="flex max-w-sm flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                            <Search className="h-4 w-4 shrink-0 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search internships..."
                                className="w-full text-sm text-gray-900 outline-none placeholder-gray-400"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option>Status</option>
                            <option>Active</option>
                            <option>Completed</option>
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option>Sort</option>
                            <option>Newest</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    {/* Internship Cards */}
                    {filteredInternships.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
                            <Search className="mb-3 h-8 w-8 text-gray-300" />
                            <p className="text-sm font-medium text-gray-700">No internships found</p>
                            <p className="mt-1 text-sm text-gray-400">Try a different search term or filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {filteredInternships.map((internship) => {
                                const Icon = internship.style.icon
                                return (
                                    <div key={internship.id} className="rounded-xl border border-gray-200 bg-white p-6">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${internship.style.bg}`}>
                                                    <Icon className={`h-6 w-6 ${internship.style.color}`} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{internship.name}</h3>
                                                    <p className="mt-0.5 text-sm text-gray-500">{internship.description}</p>
                                                </div>
                                            </div>
                                            <button className="cursor-pointer rounded-lg p-1 hover:bg-gray-100">
                                                <MoreVertical className="h-5 w-5 text-gray-400" />
                                            </button>
                                        </div>

                                        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                                            <span className="flex items-center gap-1.5">
                                                <Users className="h-4 w-4 text-gray-400" />
                                                {internship.interns} Interns
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <CheckCircle2 className="h-4 w-4 text-gray-400" />
                                                {internship.tasks} Tasks
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                {internship.date}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="mb-1.5 flex items-center justify-between">
                                                <span className="text-xs text-gray-500">Progress</span>
                                                <span className="text-xs font-medium text-gray-700">{internship.progress}%</span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                                <div
                                                    className="h-full rounded-full bg-indigo-600"
                                                    style={{ width: `${internship.progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    internship.status === 'Active'
                                                        ? 'bg-green-50 text-green-700'
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${
                                                        internship.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                                                    }`}
                                                ></span>
                                                {internship.status}
                                            </span>
                                            <button className="flex cursor-pointer items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800">
                                                View Details
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Create Internship Modal */}
                    {modalOpen && (
                        <div
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
                            onClick={handleCloseModal}
                        >
                            <div
                                className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                                            <Plus className="h-4 w-4 text-indigo-600" />
                                        </div>
                                        <h2 className="text-base font-semibold text-gray-900">Create Internship</h2>
                                    </div>
                                    <button
                                        onClick={handleCloseModal}
                                        className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                        aria-label="Close"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleCreateInternship} className="px-6 py-5" noValidate>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="intern-name" className="mb-1.5 block text-sm font-medium text-gray-700">
                                                Internship Name
                                            </label>
                                            <input
                                                id="intern-name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. Data Science Internship"
                                                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="intern-desc" className="mb-1.5 block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                id="intern-desc"
                                                rows={3}
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Brief description of the internship..."
                                                className="w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="intern-start" className="mb-1.5 block text-sm font-medium text-gray-700">
                                                    Start Date
                                                </label>
                                                <input
                                                    id="intern-start"
                                                    type="date"
                                                    value={formData.startDate}
                                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                    className="w-full cursor-pointer rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="intern-end" className="mb-1.5 block text-sm font-medium text-gray-700">
                                                    End Date
                                                </label>
                                                <input
                                                    id="intern-end"
                                                    type="date"
                                                    value={formData.endDate}
                                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                    className="w-full cursor-pointer rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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
                                            onClick={handleCloseModal}
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
                                            {submitting ? 'Creating...' : 'Create Internship'}
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

export default Internships