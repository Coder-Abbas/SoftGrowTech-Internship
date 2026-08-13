import React, { useEffect, useState } from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import {
    Plus, Calendar, Users, ArrowRight, X, Loader2, ClipboardCheck,
    Layers, CheckCircle2, Clock, Search, FileText, Send,
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const sessions = [
    {
        id: 'session-01',
        title: 'React Foundation Session',
        description: 'UI building, components, props, and state management.',
        domains: ['Web Development', 'UI/UX Design'],
    },
    {
        id: 'session-02',
        title: 'MERN Sprint Session',
        description: 'Full-stack tasks that connect frontend and API work.',
        domains: ['MERN Development', 'Web Development'],
    },
    {
        id: 'session-03',
        title: 'Python Practice Session',
        description: 'Logic, scripting, and problem-solving tasks.',
        domains: ['Python Development'],
    },
]

const initialTasks = [
    {
        id: '01',
        title: 'Build Login Page',
        description: 'Create a responsive login page using React and Tailwind.',
        due: 'Aug 14',
        interns: 12,
        progress: 85,
        completed: 10,
        pending: 2,
        status: 'Completed',
        sessionId: 'session-01',
        domain: 'Web Development',
        attachment: 'login-page-wireframe.pdf',
    },
    {
        id: '02',
        title: 'Notes App',
        description: 'Build a CRUD notes application with local storage.',
        due: 'Aug 16',
        interns: 12,
        progress: 70,
        completed: 8,
        pending: 4,
        status: 'In Progress',
        sessionId: 'session-01',
        domain: 'Web Development',
        attachment: 'notes-app-guide.docx',
    },
    {
        id: '03',
        title: 'Password Generator',
        description: 'Create a password generator with multiple options.',
        due: 'Aug 18',
        interns: 12,
        progress: 60,
        completed: 7,
        pending: 5,
        status: 'In Progress',
        sessionId: 'session-03',
        domain: 'Python Development',
        attachment: 'password-generator.doc',
    },
    {
        id: '04',
        title: 'Dashboard UI',
        description: 'Design a professional dashboard interface.',
        due: 'Aug 20',
        interns: 12,
        progress: 40,
        completed: 5,
        pending: 7,
        status: 'Pending',
        sessionId: 'session-01',
        domain: 'UI/UX Design',
        attachment: 'dashboard-ui.pdf',
    },
]

const statusStyles = {
    Completed: 'bg-green-50 text-green-700',
    'In Progress': 'bg-blue-50 text-blue-700',
    Pending: 'bg-amber-50 text-amber-700',
}

const Tasks = () => {
    const [tasks, setTasks] = useState(initialTasks)
    const [selectedSessionId, setSelectedSessionId] = useState(sessions[0].id)
    const selectedSession = sessions.find((session) => session.id === selectedSessionId) || sessions[0]
    const [selectedDomain, setSelectedDomain] = useState(selectedSession.domains[0])
    const [searchTerm, setSearchTerm] = useState('')
    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [viewTask, setViewTask] = useState(null)
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        domain: selectedSession.domains[0],
        dueDate: '',
        attachment: '',
    })
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        document.body.style.overflow = viewModalOpen || createModalOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [viewModalOpen, createModalOpen])

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setViewModalOpen(false)
                setCreateModalOpen(false)
            }
        }
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [])

    useEffect(() => {
        setSelectedDomain(selectedSession.domains[0])
        setFormData((current) => ({
            ...current,
            domain: selectedSession.domains[0],
        }))
    }, [selectedSessionId])

    const openViewModal = (task) => {
        setViewTask(task)
        setViewModalOpen(true)
    }

    const handleOpenCreateModal = () => {
        setCreateModalOpen(true)
        setFormData({
            title: '',
            description: '',
            domain: selectedDomain || selectedSession.domains[0],
            dueDate: '',
            attachment: '',
        })
        setError('')
    }

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false)
        setFormData({ title: '', description: '', domain: selectedSession.domains[0], dueDate: '', attachment: '' })
        setError('')
    }

    const handleCreateTask = async (e) => {
        e.preventDefault()
        setError('')

        if (!formData.title.trim() || !formData.description.trim() || !formData.domain || !formData.dueDate || !formData.attachment) {
            setError('Please fill in the title, description, domain, end date, and file.')
            return
        }

        setSubmitting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 500))

            const newTask = {
                id: String(Date.now()).slice(-6),
                title: formData.title.trim(),
                description: formData.description.trim(),
                due: new Date(formData.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                interns: 0,
                progress: 0,
                completed: 0,
                pending: 0,
                status: 'Pending',
                sessionId: selectedSession.id,
                domain: formData.domain,
                attachment: formData.attachment,
            }

            setTasks((prev) => [newTask, ...prev])
            handleCloseCreateModal()
            toast.success('Task sent successfully!')
        } catch (err) {
            setError('Failed to send task. Please try again.')
            toast.error('Failed to send task.')
        } finally {
            setSubmitting(false)
        }
    }

    const visibleTasks = tasks.filter((task) => {
        const term = searchTerm.trim().toLowerCase()
        const matchesSession = task.sessionId === selectedSession.id
        const matchesDomain = task.domain === selectedDomain
        const matchesSearch = !term || (
            task.title.toLowerCase().includes(term) ||
            task.description.toLowerCase().includes(term) ||
            task.domain.toLowerCase().includes(term) ||
            task.attachment.toLowerCase().includes(term)
        )

        return matchesSession && matchesDomain && matchesSearch
    })

    const getSessionTitle = (sessionId) => sessions.find((session) => session.id === sessionId)?.title || 'Session'

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Sidebar />
            <div className="ml-0 transition-[margin] duration-300 md:ml-(--admin-sidebar-width)">
                <Header userName="Admin" userRole="Administrator" />

                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
                            <p className="mt-1 text-sm text-gray-500">Pick a session, choose a domain, and send a task.</p>
                        </div>
                        <button
                            onClick={handleOpenCreateModal}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 sm:w-auto"
                        >
                            <Plus className="h-4 w-4" />
                            Add Task
                        </button>
                    </div>

                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">Sessions</p>
                                <h2 className="mt-1 text-lg font-semibold text-gray-900">Choose a session</h2>
                                <p className="mt-1 text-sm text-gray-500">Click a session card to reveal its domains.</p>
                            </div>
                            <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                                {selectedSession.title}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            {sessions.map((session) => {
                                const isActive = session.id === selectedSession.id
                                return (
                                    <button
                                        key={session.id}
                                        type="button"
                                        onClick={() => setSelectedSessionId(session.id)}
                                        className={`rounded-xl border p-4 text-left transition ${isActive ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-gray-200 bg-white hover:border-indigo-200 hover:shadow-sm'}`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-xs text-gray-400">Session</p>
                                                <h3 className="mt-1 text-sm font-semibold text-gray-900">{session.title}</h3>
                                            </div>
                                            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600 shadow-sm">
                                                {session.domains.length} domains
                                            </span>
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-500">{session.description}</p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">Domains</p>
                                <h2 className="mt-1 text-lg font-semibold text-gray-900">{selectedSession.title}</h2>
                                <p className="mt-1 text-sm text-gray-500">Select the domain where this task belongs.</p>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                                <Layers className="h-3.5 w-3.5 text-gray-400" />
                                {selectedDomain}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            {selectedSession.domains.map((domain) => {
                                const isActive = domain === selectedDomain
                                return (
                                    <button
                                        key={domain}
                                        type="button"
                                        onClick={() => setSelectedDomain(domain)}
                                        className={`rounded-xl border px-4 py-3 text-left transition ${isActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white hover:border-indigo-200'}`}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm font-semibold text-gray-900">{domain}</span>
                                            {isActive && <CheckCircle2 className="h-4 w-4 text-indigo-600" />}
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Open tasks for this domain.</p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mb-6 flex w-full max-w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 sm:max-w-sm">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search tasks..."
                            className="w-full text-sm outline-none placeholder:text-gray-400"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        {visibleTasks.length === 0 ? (
                            <div className="py-12 text-center text-sm text-gray-400 xl:col-span-2">
                                No tasks found
                            </div>
                        ) : (
                            visibleTasks.map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => openViewModal(task)}
                                    className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                                >
                                    <div className="mb-4 flex items-start justify-between">
                                        <div>
                                            <p className="mb-1 text-xs text-gray-400">Task #{task.id}</p>
                                            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                                        </div>
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[task.status]}`}>
                                            {task.status}
                                        </span>
                                    </div>

                                    <p className="mb-4 text-sm text-gray-500">{task.description}</p>

                                    <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            Due: {task.due}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Users className="h-4 w-4 text-gray-400" />
                                            {task.interns} Interns
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Layers className="h-4 w-4 text-gray-400" />
                                            {task.domain}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <FileText className="h-4 w-4 text-gray-400" />
                                            {task.attachment}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <div className="mb-1.5 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">Progress</span>
                                            <span className="text-xs font-medium text-gray-700">{task.progress}%</span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                            <div className="h-full rounded-full bg-indigo-600" style={{ width: `${task.progress}%` }} />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium text-gray-700">{task.completed} Completed</span> · {task.pending} Pending
                                        </p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); openViewModal(task) }}
                                            className="flex cursor-pointer items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
                                        >
                                            View Task
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="mt-4 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
                                        Session: <span className="font-medium text-gray-700">{getSessionTitle(task.sessionId)}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>

            {viewModalOpen && viewTask && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
                    onClick={() => setViewModalOpen(false)}
                >
                    <div
                        className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                                    <ClipboardCheck className="h-4 w-4 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Task #{viewTask.id}</p>
                                    <h2 className="text-base font-semibold text-gray-900">{viewTask.title}</h2>
                                </div>
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
                            <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[viewTask.status]}`}>
                                {viewTask.status}
                            </span>

                            <p className="mt-4 text-sm leading-6 text-gray-600">{viewTask.description}</p>

                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Calendar className="h-3.5 w-3.5" />
                                        Due Date
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{viewTask.due}</p>
                                </div>
                                <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Layers className="h-3.5 w-3.5" />
                                        Domain
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{viewTask.domain}</p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="mb-1.5 flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Progress</span>
                                    <span className="text-xs font-medium text-gray-700">{viewTask.progress}%</span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                    <div className="h-full rounded-full bg-indigo-600" style={{ width: `${viewTask.progress}%` }} />
                                </div>
                                <p className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1.5">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        {viewTask.completed} Completed
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4 text-amber-500" />
                                        {viewTask.pending} Pending
                                    </span>
                                </p>
                            </div>

                            {viewTask.attachment && (
                                <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <FileText className="h-3.5 w-3.5" />
                                        Attachment
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{viewTask.attachment}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
                            <button
                                onClick={() => setViewModalOpen(false)}
                                className="cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {createModalOpen && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
                    onClick={handleCloseCreateModal}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                                    <Plus className="h-4 w-4 text-indigo-600" />
                                </div>
                                <h2 className="text-base font-semibold text-gray-900">Send Task</h2>
                            </div>
                            <button
                                onClick={handleCloseCreateModal}
                                className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateTask} className="px-6 py-5" noValidate>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="task-session" className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Session
                                    </label>
                                    <div id="task-session" className="rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-gray-700">
                                        {selectedSession.title}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="task-domain" className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Domain
                                    </label>
                                    <select
                                        id="task-domain"
                                        value={formData.domain}
                                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                                        className="w-full cursor-pointer rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    >
                                        <option value="">Select a domain</option>
                                        {selectedSession.domains.map((domain) => (
                                            <option key={domain} value={domain}>{domain}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="task-title" className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        id="task-title"
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Build Login Page"
                                        className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="task-desc" className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="task-desc"
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="What should interns build or complete?"
                                        className="w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="task-file" className="mb-1.5 block text-sm font-medium text-gray-700">
                                        PDF or DOC file
                                    </label>
                                    <input
                                        id="task-file"
                                        type="file"
                                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        onChange={(e) => setFormData({ ...formData, attachment: e.target.files[0]?.name || '' })}
                                        className="w-full cursor-pointer text-sm text-gray-900 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="task-due" className="mb-1.5 block text-sm font-medium text-gray-700">
                                        End Date
                                    </label>
                                    <input
                                        id="task-due"
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        className="w-full cursor-pointer rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                    />
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
                                    onClick={handleCloseCreateModal}
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
                                    <Send className="h-4 w-4" />
                                    {submitting ? 'Sending...' : 'Send Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Tasks
