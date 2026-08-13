import React, { useState, useMemo } from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import {
    Search, Eye, X, Loader2, Mail, Hash, Users2, Layers, ExternalLink, CheckCircle2, XCircle, Clock,
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const initialSubmissions = [
    {
        id: 1, intern: 'Ali Raza', task: 'Login Page', submitted: '10 min ago', status: 'Pending', color: 'bg-blue-500',
        email: 'ali@gmail.com', studentId: 'FA22-BSE-045', batch: '2022', domain: 'Web Development',
        githubRepo: 'https://github.com/aliraza/login-page', linkedin: 'https://linkedin.com/in/aliraza',
    },
    {
        id: 2, intern: 'Sara Khan', task: 'Notes App', submitted: '35 min ago', status: 'Approved', color: 'bg-green-500',
        email: 'sara@gmail.com', studentId: 'FA22-BSE-012', batch: '2022', domain: 'UI/UX Design',
        githubRepo: 'https://github.com/sarakhan/notes-app', linkedin: 'https://linkedin.com/in/sarakhan',
    },
    {
        id: 3, intern: 'Ahmed Hassan', task: 'Dashboard', submitted: '1 hr ago', status: 'Rejected', color: 'bg-purple-500',
        email: 'ahmed@gmail.com', studentId: 'FA21-BSE-078', batch: '2021', domain: 'MERN Development',
        githubRepo: 'https://github.com/ahmedhassan/dashboard', linkedin: 'https://linkedin.com/in/ahmedhassan',
    },
    {
        id: 4, intern: 'Muhammad Ali', task: 'Password Generator', submitted: '2 hrs ago', status: 'Pending', color: 'bg-amber-500',
        email: 'muhammad@gmail.com', studentId: 'FA22-BSE-091', batch: '2022', domain: 'Python Development',
        githubRepo: 'https://github.com/muhammadali/password-gen', linkedin: 'https://linkedin.com/in/muhammadali',
    },
    {
        id: 5, intern: 'Fatima Noor', task: 'Login Page', submitted: '3 hrs ago', status: 'Approved', color: 'bg-pink-500',
        email: 'fatima@gmail.com', studentId: 'FA22-BSE-033', batch: '2022', domain: 'Web Development',
        githubRepo: 'https://github.com/fatimanoor/login-page', linkedin: 'https://linkedin.com/in/fatimanoor',
    },
]

const getStatusStyle = (status) => {
    switch (status) {
        case 'Approved':
            return 'bg-green-50 text-green-700'
        case 'Rejected':
            return 'bg-red-50 text-red-700'
        default:
            return 'bg-amber-50 text-amber-700'
    }
}

const Submissions = () => {
    const [submissions, setSubmissions] = useState(initialSubmissions)

    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('Status')
    const [internshipFilter, setInternshipFilter] = useState('Internship')
    const [dateFilter, setDateFilter] = useState('Date')

    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [reviewSubmission, setReviewSubmission] = useState(null)
    const [updating, setUpdating] = useState(false)

    const filteredSubmissions = useMemo(() => {
        return submissions.filter((s) => {
            const term = searchTerm.trim().toLowerCase()
            const matchesSearch =
                !term ||
                s.intern.toLowerCase().includes(term) ||
                s.task.toLowerCase().includes(term) ||
                s.email.toLowerCase().includes(term)

            const matchesStatus = statusFilter === 'Status' || s.status === statusFilter
            const matchesInternship = internshipFilter === 'Internship' || s.domain === internshipFilter

            // "submitted" is a relative label here (e.g. "10 min ago") — swap for real timestamp filtering once you have actual dates
            const matchesDate =
                dateFilter === 'Date' ||
                (dateFilter === 'Today' && s.submitted.includes('min ago')) ||
                (dateFilter === 'Today' && s.submitted.includes('hr ago')) ||
                (dateFilter === 'This Week')

            return matchesSearch && matchesStatus && matchesInternship && matchesDate
        })
    }, [submissions, searchTerm, statusFilter, internshipFilter, dateFilter])

    const openReviewModal = (submission) => {
        setReviewSubmission(submission)
        setReviewModalOpen(true)
    }

    const closeReviewModal = () => {
        setReviewModalOpen(false)
        setReviewSubmission(null)
    }

    const handleDecision = async (decision) => {
        setUpdating(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 400)) // replace with real API call
            setSubmissions((prev) =>
                prev.map((s) => (s.id === reviewSubmission.id ? { ...s, status: decision } : s))
            )
            toast.success(
                decision === 'Approved'
                    ? 'Submission approved!'
                    : decision === 'Rejected'
                    ? 'Submission rejected.'
                    : 'Left as pending.'
            )
            closeReviewModal()
        } catch (err) {
            toast.error('Failed to update submission.')
        } finally {
            setUpdating(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Sidebar />
            <div className="ml-[250px]">
                <Header userName="Admin" userRole="Administrator" />

                <main className="p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Submissions</h1>
                        <p className="mt-1 text-sm text-gray-500">Review and manage intern task submissions</p>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 flex items-center gap-4">
                        <div className="flex max-w-sm flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                            <Search className="h-4 w-4 shrink-0 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by intern, task, or email..."
                                className="w-full text-sm text-gray-900 outline-none placeholder-gray-400"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option>Status</option>
                            <option>Pending</option>
                            <option>Approved</option>
                            <option>Rejected</option>
                        </select>
                        <select
                            value={internshipFilter}
                            onChange={(e) => setInternshipFilter(e.target.value)}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option>Internship</option>
                            <option>Web Development</option>
                            <option>UI/UX Design</option>
                            <option>MERN Development</option>
                            <option>Python Development</option>
                        </select>
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option>Date</option>
                            <option>Today</option>
                            <option>This Week</option>
                        </select>
                    </div>

                    {/* Submissions Table */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Intern</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Task</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Submitted</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSubmissions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-400">
                                            No submissions found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSubmissions.map((submission) => (
                                        <tr key={submission.id} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${submission.color}`}>
                                                        <span className="text-xs font-bold text-white">
                                                            {submission.intern.split(' ').map((w) => w[0]).join('')}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{submission.intern}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{submission.task}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{submission.submitted}</td>
                                            <td className="px-6 py-4">
                                                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(submission.status)}`}>
                                                    {submission.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => openReviewModal(submission)}
                                                    className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    Review
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Review Modal */}
            {reviewModalOpen && reviewSubmission && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
                    onClick={closeReviewModal}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-100 bg-white shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${reviewSubmission.color}`}>
                                    <span className="text-sm font-bold text-white">
                                        {reviewSubmission.intern.split(' ').map((w) => w[0]).join('')}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-gray-900">{reviewSubmission.intern}</h2>
                                    <p className="text-xs text-gray-500">{reviewSubmission.task}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeReviewModal}
                                className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="px-6 py-5">
                            <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(reviewSubmission.status)}`}>
                                {reviewSubmission.status}
                            </span>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Mail className="h-3.5 w-3.5" />
                                        Email
                                    </p>
                                    <p className="mt-1 truncate text-sm font-medium text-gray-900">{reviewSubmission.email}</p>
                                </div>
                                <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Hash className="h-3.5 w-3.5" />
                                        Student ID
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{reviewSubmission.studentId}</p>
                                </div>
                                <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Users2 className="h-3.5 w-3.5" />
                                        Batch
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{reviewSubmission.batch}</p>
                                </div>
                                <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                                    <p className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Layers className="h-3.5 w-3.5" />
                                        Domain
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{reviewSubmission.domain}</p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2">
                                {reviewSubmission.githubRepo && (
                                    <a
                                        href={reviewSubmission.githubRepo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        <span className="flex items-center gap-2">
                                        
                                            GitHub Repository
                                        </span>
                                        <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                                    </a>
                                )}
                                {reviewSubmission.linkedin && (
                                    <a
                                        href={reviewSubmission.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        <span className="flex items-center gap-2">
                                            LinkedIn Profile
                                        </span>
                                        <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Decision Actions */}
                        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
                            <button
                                onClick={() => handleDecision('Pending')}
                                disabled={updating}
                                className="flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                <Clock className="h-4 w-4" />
                                Leave Pending
                            </button>
                            <button
                                onClick={() => handleDecision('Rejected')}
                                disabled={updating}
                                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
                                Reject
                            </button>
                            <button
                                onClick={() => handleDecision('Approved')}
                                disabled={updating}
                                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Submissions
