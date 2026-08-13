import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import {
    Plus, Users, ArrowRight, X, Loader2, ArrowLeft, Briefcase,
    Code2, Palette, Atom, Terminal, Smartphone, Bot, Layers,
} from 'lucide-react'

// Icon + color rotation used when creating new domains
const domainStyles = [
    { icon: Code2, color: 'bg-indigo-500' },
    { icon: Palette, color: 'bg-emerald-500' },
    { icon: Atom, color: 'bg-purple-500' },
    { icon: Terminal, color: 'bg-amber-500' },
    { icon: Smartphone, color: 'bg-blue-500' },
    { icon: Bot, color: 'bg-pink-500' },
]

const SessionDetail = () => {

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





    const { id } = useParams()
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false)
    const [domains, setDomains] = useState([
        { id: 1, name: 'Web Development', interns: 12, color: 'bg-indigo-500', icon: Code2 },
        { id: 2, name: 'UI/UX Design', interns: 8, color: 'bg-emerald-500', icon: Palette },
        { id: 3, name: 'MERN Development', interns: 15, color: 'bg-purple-500', icon: Atom },
        { id: 4, name: 'Python Development', interns: 13, color: 'bg-amber-500', icon: Terminal },
        { id: 5, name: 'Mobile Development', interns: 10, color: 'bg-blue-500', icon: Smartphone },
        { id: 6, name: 'AI & ML', interns: 7, color: 'bg-pink-500', icon: Bot },

    ])

    // Create Domain Modal State
    const [formData, setFormData] = useState({ name: '' })
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const handleCreateDomain = async (e) => {
        e.preventDefault()
        setError('')

        if (!formData.name.trim()) {
            setError('Please enter a domain name.')
            return
        }

        setSubmitting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            const style = domainStyles[domains.length % domainStyles.length]
            const newDomain = {
                id: Date.now(),
                name: formData.name.trim(),
                interns: 0,
                color: style.color,
                icon: style.icon,
            }
            setDomains((prev) => [...prev, newDomain])
            setFormData({ name: '' })
            setModalOpen(false)
        } catch (err) {
            setError('Failed to create domain. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setFormData({ name: '' })
        setError('')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="ml-[250px]">
                <Header userName="Admin" basePath="/admin" />

                <main className="p-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/admin/sessions')}
                        className="mb-4 flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Sessions
                    </button>

                    <div className="mb-8 flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{sessions.find((s) => s.id === parseInt(id))?.name || 'Session'} Domains</h1>
                            <p className="mt-1 text-sm text-gray-500">Select a domain to view its interns</p>
                        </div>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                        >
                            <Plus className="h-4 w-4" />
                            Create Domain
                        </button>
                    </div>

                    {/* Domain Cards */}
                    {domains.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                                <Layers className="h-6 w-6 text-gray-400" />
                            </div>
                            <p className="text-sm font-medium text-gray-700">No domains yet</p>
                            <p className="mt-1 text-sm text-gray-400">Create a domain to start grouping interns.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {domains.map((domain) => {
                                const Icon = domain.icon
                                return (
                                    <div
                                        key={domain.id}
                                        onClick={() => navigate(`/admin/sessions/${id}/domains/${domain.id}`)}
                                        className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                                    >
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${domain.color}`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>
                                            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                                Active
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900">{domain.name}</h3>

                                        <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                                            <span className="flex items-center gap-1.5">
                                                <Users className="h-4 w-4 text-gray-400" />
                                                {domain.interns} Interns
                                            </span>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                                            <span className="text-sm font-medium text-indigo-600">View Interns</span>
                                            <ArrowRight className="h-4 w-4 text-indigo-600" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Create Domain Modal */}
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
                                            <Briefcase className="h-4 w-4 text-indigo-600" />
                                        </div>
                                        <h2 className="text-base font-semibold text-gray-900">Create Domain</h2>
                                    </div>
                                    <button
                                        onClick={handleCloseModal}
                                        className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                        aria-label="Close"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleCreateDomain} className="px-6 py-5" noValidate>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="domain-name" className="mb-1.5 block text-sm font-medium text-gray-700">
                                                Domain Name
                                            </label>
                                            <input
                                                id="domain-name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. Mobile Development"
                                                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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
                                            {submitting ? 'Creating...' : 'Create Domain'}
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

export default SessionDetail