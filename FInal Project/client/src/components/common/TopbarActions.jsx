import React, { useState, useRef, useEffect } from 'react'
import { Bell, ChevronDown, Settings, LogOut, User, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const notifications = [
  { id: 1, title: 'New intern submission', time: '5m ago', unread: true },
  { id: 2, title: 'Task deadline tomorrow', time: '1h ago', unread: true },
  { id: 3, title: 'Weekly report ready', time: '3h ago', unread: false },
]

const TopbarActions = ({ basePath, userName }) => {
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)
  const navigate = useNavigate()

  const adminName = localStorage.getItem('userEmail') ? 'Admin' : userName
  const adminEmail = localStorage.getItem('userEmail') || 'admin@example.com'
  const unreadCount = notifications.filter((n) => n.unread).length

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    navigate('/')
  }

  return (
    <div className="flex items-center gap-4">
      {/* Notification bell */}
      <div className="relative" ref={notifRef}>
        <button
          onClick={() => {
            setNotifOpen((prev) => !prev)
            setProfileOpen(false)
          }}
          className="relative cursor-pointer rounded-lg p-2 hover:bg-gray-100"
        >
          <Bell className="h-5 w-5 text-gray-500" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </button>

        {notifOpen && (
          <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-gray-100 bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <p className="text-sm font-semibold text-gray-800">Notifications</p>
              {unreadCount > 0 && (
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                  {unreadCount} new
                </span>
              )}
            </div>
            <ul className="max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-gray-400">No notifications</li>
              ) : (
                notifications.map((n) => (
                  <li
                    key={n.id}
                    className="cursor-pointer border-b border-gray-50 px-4 py-3 last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-2">
                      {n.unread && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />}
                      <div className={n.unread ? '' : 'pl-3.5'}>
                        <p className="text-sm text-gray-700">{n.title}</p>
                        <p className="mt-0.5 text-xs text-gray-400">{n.time}</p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
            <div className="border-t border-gray-100 px-4 py-2">
              <button className="w-full cursor-pointer py-1 text-center text-xs font-medium text-indigo-600 hover:text-indigo-700">
                View all notifications
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile dropdown */}
      <div className="relative" ref={profileRef}>
        <div
          onClick={() => {
            setProfileOpen((prev) => !prev)
            setNotifOpen(false)
          }}
          className="flex cursor-pointer items-center gap-2"
        >
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${userName === 'Admin' ? 'bg-indigo-600' : 'bg-green-600'}`}>
            <span className="text-xs font-bold text-white">{userName.charAt(0).toUpperCase()}</span>
          </div>
          <span className="text-sm font-medium text-gray-700">{userName}</span>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
        </div>

        {profileOpen && (
          <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-gray-100 bg-white shadow-lg">
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full
                ${userName === 'Admin' ? 'bg-indigo-600' : 'bg-green-600'}`}>
                <span className="text-sm font-bold text-white">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800">{userName}</p>
                <p className="flex items-center gap-1 truncate text-xs text-gray-400">
                  <Mail className="h-3 w-3 shrink-0" />
                  {userName.toLowerCase()}@example.com
                </p>
              </div>
            </div>

            <ul className="py-1">
              <li>
                <button
                  onClick={() => {
                    setProfileOpen(false)
                    navigate(`${basePath}/profile`)
                  }}
                  className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User className="h-4 w-4 text-gray-400" />
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setProfileOpen(false)
                    navigate(`${basePath}/settings`)
                  }}
                  className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="h-4 w-4 text-gray-400" />
                  Settings
                </button>
              </li>
            </ul>

            <div className="border-t border-gray-100 py-1">
              <button
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopbarActions