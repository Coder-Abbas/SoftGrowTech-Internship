import { useState, useEffect } from 'react'
import { X, Megaphone, Loader2 } from 'lucide-react'

function AddAnnouncementModal({ isOpen, onClose, onSubmit }) {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [priority, setPriority] = useState('normal')
    const [audience, setAudience] = useState('all')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    useEffect(() => {
        function handleEsc(event) {
            if (event.key === 'Escape') onClose()
        }
        if (isOpen) document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [isOpen, onClose])

    if (!isOpen) return null

    const resetForm = () => {
        setTitle('')
        setMessage('')
        setPriority('normal')
        setAudience('all')
        setError('')
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        if (!title.trim() || !message.trim()) {
            setError('Please fill in both title and message.')
            return
        }

        setSubmitting(true)
        try {
            await onSubmit({
                title: title.trim(),
                message: message.trim(),
                priority,
                audience,
                createdAt: new Date().toISOString(),
            })
            resetForm()
            onClose()
        } catch (err) {
            setError(err.message || 'Failed to post announcement. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div
                className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                            <Megaphone className="h-4 w-4 text-indigo-600" />
                        </div>
                        <h2 className="text-base font-semibold text-gray-900">New Announcement</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5" noValidate>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="ann-title" className="mb-1.5 block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                id="ann-title"
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder="e.g. New task deadline extended"
                                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div>
                            <label htmlFor="ann-message" className="mb-1.5 block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="ann-message"
                                rows={4}
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                placeholder="Write the announcement details..."
                                className="w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="ann-priority" className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Priority
                                </label>
                                <select
                                    id="ann-priority"
                                    value={priority}
                                    onChange={(event) => setPriority(event.target.value)}
                                    className="w-full cursor-pointer rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                >
                                    <option value="normal">Normal</option>
                                    <option value="important">Important</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="ann-audience" className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Audience
                                </label>
                                <select
                                    id="ann-audience"
                                    value={audience}
                                    onChange={(event) => setAudience(event.target.value)}
                                    className="w-full cursor-pointer rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                >
                                    <option value="all">All Interns</option>
                                    <option value="active">Active Interns</option>
                                    <option value="admins">Admins Only</option>
                                </select>
                            </div>
                        </div>

                        {error && (
                            <div role="alert" className="rounded-lg border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-600">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
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
                            {submitting ? 'Posting...' : 'Post Announcement'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAnnouncementModal