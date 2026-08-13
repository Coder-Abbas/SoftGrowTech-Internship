import React, { useState } from 'react'
import Sidebar from './Components/sidebar'
import Header from '../../components/common/Header'
import { User, Globe, Camera, Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'site', label: 'Site Settings', icon: Globe },
]

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile')

    // --- Profile state ---
    const [profile, setProfile] = useState({
        name: 'Admin',
        email: 'admin@internflow.com',
        avatar: null, // data URL once an image is picked
    })
    const [profileForm, setProfileForm] = useState({ name: profile.name, email: profile.email })
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [savingProfile, setSavingProfile] = useState(false)
    const [profileError, setProfileError] = useState('')

    // --- Password state ---
    const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [savingPassword, setSavingPassword] = useState(false)
    const [passwordError, setPasswordError] = useState('')

    // --- Site settings state ---
    const [siteForm, setSiteForm] = useState({ siteName: '', description: '' })
    const [savingSite, setSavingSite] = useState(false)

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file.')
            return
        }
        const reader = new FileReader()
        reader.onload = () => setAvatarPreview(reader.result)
        reader.readAsDataURL(file)
    }

    const handleSaveProfile = async (e) => {
        e.preventDefault()
        setProfileError('')

        if (!profileForm.name.trim() || !profileForm.email.trim()) {
            setProfileError('Please fill in both name and email.')
            return
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(profileForm.email.trim())) {
            setProfileError('Please enter a valid email address.')
            return
        }

        setSavingProfile(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 500)) // replace with real API call
            setProfile({
                name: profileForm.name.trim(),
                email: profileForm.email.trim(),
                avatar: avatarPreview ?? profile.avatar,
            })
            toast.success('Profile updated successfully!')
        } catch (err) {
            setProfileError('Failed to update profile. Please try again.')
        } finally {
            setSavingProfile(false)
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        setPasswordError('')

        if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
            setPasswordError('Please fill in all password fields.')
            return
        }
        if (passwordForm.next.length < 8) {
            setPasswordError('New password must be at least 8 characters.')
            return
        }
        if (passwordForm.next !== passwordForm.confirm) {
            setPasswordError('New password and confirmation do not match.')
            return
        }

        setSavingPassword(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 500)) // replace with real API call
            setPasswordForm({ current: '', next: '', confirm: '' })
            toast.success('Password changed successfully!')
        } catch (err) {
            setPasswordError('Failed to change password. Please try again.')
        } finally {
            setSavingPassword(false)
        }
    }

    const handleSaveSite = async (e) => {
        e.preventDefault()
        setSavingSite(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 500)) // replace with real API call
            toast.success('Site settings saved!')
        } catch (err) {
            toast.error('Failed to save site settings.')
        } finally {
            setSavingSite(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Sidebar />
            <div className="ml-[250px]">
                <Header userName={profile.name} userRole="Administrator" />

                <main className="p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                        <p className="mt-1 text-sm text-gray-500">Manage your account and system settings</p>
                    </div>

                    <div className="max-w-2xl">
                        {/* Tabs */}
                        <div className="mb-6 inline-flex items-center rounded-lg border border-gray-200 bg-white p-1">
                            {tabs.map((tab) => {
                                const Icon = tab.icon
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {tab.label}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div className="rounded-xl border border-gray-200 bg-white p-6">
                                    <h2 className="mb-6 text-lg font-semibold text-gray-900">Profile</h2>

                                    <form onSubmit={handleSaveProfile} noValidate>
                                        {/* Avatar */}
                                        <div className="mb-6 flex items-center gap-4">
                                            <div className="relative">
                                                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-indigo-600">
                                                    {avatarPreview || profile.avatar ? (
                                                        <img
                                                            src={avatarPreview || profile.avatar}
                                                            alt="Profile avatar"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-xl font-bold text-white">
                                                            {profile.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <label
                                                    htmlFor="avatar-upload"
                                                    className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 shadow ring-1 ring-gray-200 hover:text-indigo-600"
                                                >
                                                    <Camera className="h-3.5 w-3.5" />
                                                    <input
                                                        id="avatar-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleAvatarChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Profile photo</p>
                                                <p className="text-xs text-gray-400">JPG or PNG, up to 5MB.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="profile-name" className="mb-1.5 block text-sm font-medium text-gray-700">
                                                    Full Name
                                                </label>
                                                <input
                                                    id="profile-name"
                                                    type="text"
                                                    value={profileForm.name}
                                                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                                    className="w-full rounded-lg border border-gray-200 p-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="profile-email" className="mb-1.5 block text-sm font-medium text-gray-700">
                                                    Email Address
                                                </label>
                                                <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-2.5 focus-within:ring-2 focus-within:ring-indigo-500">
                                                    <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                                                    <input
                                                        id="profile-email"
                                                        type="email"
                                                        value={profileForm.email}
                                                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                                        className="w-full text-sm text-gray-900 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            {profileError && (
                                                <div role="alert" className="rounded-lg border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-600">
                                                    {profileError}
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={savingProfile}
                                            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {savingProfile && <Loader2 className="h-4 w-4 animate-spin" />}
                                            {savingProfile ? 'Saving...' : 'Save Profile'}
                                        </button>
                                    </form>
                                </div>

                                {/* Password */}
                                <div className="rounded-xl border border-gray-200 bg-white p-6">
                                    <h2 className="mb-6 text-lg font-semibold text-gray-900">Change Password</h2>

                                    <form onSubmit={handleChangePassword} noValidate>
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="pw-current" className="mb-1.5 block text-sm font-medium text-gray-700">
                                                    Current Password
                                                </label>
                                                <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-2.5 focus-within:ring-2 focus-within:ring-indigo-500">
                                                    <Lock className="h-4 w-4 shrink-0 text-gray-400" />
                                                    <input
                                                        id="pw-current"
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={passwordForm.current}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                                        className="w-full text-sm text-gray-900 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="pw-new" className="mb-1.5 block text-sm font-medium text-gray-700">
                                                        New Password
                                                    </label>
                                                    <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-2.5 focus-within:ring-2 focus-within:ring-indigo-500">
                                                        <Lock className="h-4 w-4 shrink-0 text-gray-400" />
                                                        <input
                                                            id="pw-new"
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={passwordForm.next}
                                                            onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })}
                                                            className="w-full text-sm text-gray-900 outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="pw-confirm" className="mb-1.5 block text-sm font-medium text-gray-700">
                                                        Confirm Password
                                                    </label>
                                                    <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-2.5 focus-within:ring-2 focus-within:ring-indigo-500">
                                                        <Lock className="h-4 w-4 shrink-0 text-gray-400" />
                                                        <input
                                                            id="pw-confirm"
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={passwordForm.confirm}
                                                            onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                                            className="w-full text-sm text-gray-900 outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                                {showPassword ? 'Hide passwords' : 'Show passwords'}
                                            </button>

                                            {passwordError && (
                                                <div role="alert" className="rounded-lg border border-rose-100 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-600">
                                                    {passwordError}
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={savingPassword}
                                            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {savingPassword && <Loader2 className="h-4 w-4 animate-spin" />}
                                            {savingPassword ? 'Updating...' : 'Update Password'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Site Settings Tab */}
                        {activeTab === 'site' && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <h2 className="mb-6 text-lg font-semibold text-gray-900">Site Settings</h2>

                                <form onSubmit={handleSaveSite} noValidate>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="site-name" className="mb-1 block text-sm font-medium text-gray-700">
                                                Site Name
                                            </label>
                                            <input
                                                id="site-name"
                                                type="text"
                                                value={siteForm.siteName}
                                                onChange={(e) => setSiteForm({ ...siteForm, siteName: e.target.value })}
                                                placeholder="Enter site name"
                                                className="w-full rounded-lg border border-gray-200 p-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="site-desc" className="mb-1 block text-sm font-medium text-gray-700">
                                                Site Description
                                            </label>
                                            <textarea
                                                id="site-desc"
                                                rows={4}
                                                value={siteForm.description}
                                                onChange={(e) => setSiteForm({ ...siteForm, description: e.target.value })}
                                                placeholder="Enter site description"
                                                className="w-full resize-none rounded-lg border border-gray-200 p-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={savingSite}
                                        className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {savingSite && <Loader2 className="h-4 w-4 animate-spin" />}
                                        {savingSite ? 'Saving...' : 'Save Settings'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Settings