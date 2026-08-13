import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import { X, Loader2, ArrowLeft, UserPlus, MoreVertical, Search, Code2, Palette, Atom, Terminal, Smartphone, Bot } from 'lucide-react'

const DomainDetail = () => {
    const { id, domainId } = useParams()
    const navigate = useNavigate()

    const [domains, setDomains] = useState([
        { id: 1, name: 'Web Development', interns: 12, color: 'bg-indigo-500', icon: Code2 },
        { id: 2, name: 'UI/UX Design', interns: 8, color: 'bg-emerald-500', icon: Palette },
        { id: 3, name: 'MERN Development', interns: 15, color: 'bg-purple-500', icon: Atom },
        { id: 4, name: 'Python Development', interns: 13, color: 'bg-amber-500', icon: Terminal },
        { id: 5, name: 'Mobile Development', interns: 10, color: 'bg-blue-500', icon: Smartphone },
        { id: 6, name: 'AI & ML', interns: 7, color: 'bg-pink-500', icon: Bot },
    ])

    const [modalOpen, setModalOpen] = useState(false)
    const [interns, setInterns] = useState([
        { id: 1, name: 'Ali Raza', email: 'ali@gmail.com', tasks: '8/10', status: 'Active', color: 'bg-blue-500' },
        { id: 2, name: 'Sara Khan', email: 'sara@gmail.com', tasks: '7/10', status: 'Active', color: 'bg-green-500' },
        { id: 3, name: 'Ahmed Hassan', email: 'ahmed@gmail.com', tasks: '9/10', status: 'Active', color: 'bg-purple-500' },
        { id: 4, name: 'Muhammad Ali', email: 'muhammad@gmail.com', tasks: '6/10', status: 'Active', color: 'bg-amber-500' },
    ])
    // searchTerm is controlled state — interns (the source data) is never mutated by search
    const [searchTerm, setSearchTerm] = useState('')

    // Derive the filtered list from the full list + search term (non-destructive)
    const filteredInterns = interns.filter((intern) =>
        intern.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )

    // Find the current domain based on domainId from URL
    const currentDomain = domains.find((d) => d.id === parseInt(domainId))

    // Add Student Modal State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const handleAddStudent = async (e) => {
        e.preventDefault()
        setError('')

        if (!formData.name.trim() || !formData.email.trim()) {
            setError('Please fill in all fields.')
            return
        }

        setSubmitting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500', 'bg-pink-500', 'bg-indigo-500']
            const newIntern = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                tasks: '0/10',
                status: 'Active',
                color: colors[interns.length % colors.length],
            }
            setInterns((prev) => [...prev, newIntern])
            setFormData({ name: '', email: '' })
            setModalOpen(false)
        } catch (err) {
            setError('Failed to add student. Please try again.')
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
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(`/admin/sessions/${id}`)}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-4 cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Domains
                    </button>

                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{currentDomain?.name || 'Domain'} - Interns</h1>
                            <p className="mt-1 text-sm text-gray-500">Manage interns in this domain</p>
                        </div>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 cursor-pointer"
                        >
                            <UserPlus className="w-4 h-4" />
                            Add Student
                        </button>
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2 flex-1 max-w-sm bg-white border border-gray-200 rounded-lg px-3 py-2 mb-6">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search interns..."
                            className="w-full text-sm focus:outline-none placeholder-gray-400"
                        />
                    </div>

                    {/* Interns Table */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Intern</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Email</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Tasks</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Status</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInterns.map((intern) => (
                                    <tr key={intern.id} className="border-b border-gray-50 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full ${intern.color} flex items-center justify-center`}>
                                                    <span className="text-white text-xs font-bold">
                                                        {intern.name.split(' ').map(w => w[0]).join('')}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">{intern.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{intern.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{intern.tasks}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                                {intern.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
                                                <MoreVertical className="w-5 h-5 text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Student Modal */}
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
                                            <UserPlus className="h-4 w-4 text-indigo-600" />
                                        </div>
                                        <h2 className="text-base font-semibold text-gray-900">Add Student</h2>
                                    </div>
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                        aria-label="Close"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleAddStudent} className="px-6 py-5" noValidate>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Student Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. Fatima Noor"
                                                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="e.g. fatima@gmail.com"
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
                                            {submitting ? 'Adding...' : 'Add Student'}
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

export default DomainDetail
