import React, { useState, useMemo } from 'react'
import {
    Users,
    ClipboardCheck,
    FileCheck,
    TrendingUp,
    TrendingDown,
} from 'lucide-react'

// Example: stats data keyed by range. Replace with your real API response per range.
const statsByRange = {
    7: [
        { key: 'interns', label: 'Total Interns', value: '48', icon: Users, color: 'bg-indigo-50 text-indigo-600', trend: 'up', change: '+3', note: 'vs last 7 days' },
        { key: 'tasks', label: 'Tasks Completed', value: '112', icon: ClipboardCheck, color: 'bg-emerald-50 text-emerald-600', trend: 'up', change: '+18%', note: 'vs last 7 days' },
        { key: 'submissions', label: 'Submissions', value: '76', icon: FileCheck, color: 'bg-amber-50 text-amber-600', trend: 'down', change: '-4%', note: 'vs last 7 days' },
        { key: 'active', label: 'Active Sessions', value: '9', icon: Users, color: 'bg-rose-50 text-rose-600', trend: 'up', change: '+1', note: 'vs last 7 days' },
    ],
    30: [
        { key: 'interns', label: 'Total Interns', value: '112', icon: Users, color: 'bg-indigo-50 text-indigo-600', trend: 'up', change: '+12', note: 'vs last 30 days' },
        { key: 'tasks', label: 'Tasks Completed', value: '540', icon: ClipboardCheck, color: 'bg-emerald-50 text-emerald-600', trend: 'up', change: '+22%', note: 'vs last 30 days' },
        { key: 'submissions', label: 'Submissions', value: '389', icon: FileCheck, color: 'bg-amber-50 text-amber-600', trend: 'up', change: '+9%', note: 'vs last 30 days' },
        { key: 'active', label: 'Active Sessions', value: '14', icon: Users, color: 'bg-rose-50 text-rose-600', trend: 'down', change: '-2', note: 'vs last 30 days' },
    ],
    90: [
        { key: 'interns', label: 'Total Interns', value: '256', icon: Users, color: 'bg-indigo-50 text-indigo-600', trend: 'up', change: '+34', note: 'vs last 90 days' },
        { key: 'tasks', label: 'Tasks Completed', value: '1,480', icon: ClipboardCheck, color: 'bg-emerald-50 text-emerald-600', trend: 'up', change: '+31%', note: 'vs last 90 days' },
        { key: 'submissions', label: 'Submissions', value: '1,102', icon: FileCheck, color: 'bg-amber-50 text-amber-600', trend: 'up', change: '+15%', note: 'vs last 90 days' },
        { key: 'active', label: 'Active Sessions', value: '21', icon: Users, color: 'bg-rose-50 text-rose-600', trend: 'up', change: '+6', note: 'vs last 90 days' },
    ],
}

const ranges = [
    { value: 7, label: '7 Days' },
    { value: 30, label: '30 Days' },
    { value: 90, label: '90 Days' },
]

const StatsSection = () => {
    const [selectedRange, setSelectedRange] = useState(30)
    const [loading, setLoading] = useState(false)

    const stats = useMemo(() => statsByRange[selectedRange] || [], [selectedRange])

    const handleRangeChange = (value) => {
        if (value === selectedRange) return
        setLoading(true)
        setSelectedRange(value)
        // Simulate fetch latency — replace with a real API call keyed by `value`
        setTimeout(() => setLoading(false), 300)
    }

    return (
        <div className="mb-8">
            {/* Filter control */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
                <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white p-1">
                    {ranges.map((range) => (
                        <button
                            key={range.value}
                            onClick={() => handleRangeChange(range.value)}
                            className={`cursor-pointer rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
                                selectedRange === range.value
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={stat.key}
                            className={`rounded-xl border border-gray-200 bg-white p-6 transition-opacity ${loading ? 'opacity-50' : 'opacity-100'}`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`rounded-lg p-3 ${stat.color}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-1">
                                {stat.trend === 'up' ? (
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : (
                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                )}
                                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change}
                                </span>
                                <span className="text-sm text-gray-400">{stat.note}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StatsSection