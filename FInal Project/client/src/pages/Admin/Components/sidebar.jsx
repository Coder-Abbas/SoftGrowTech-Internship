import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  ClipboardCheck,
  FileCheck,
  BarChart3,
  Megaphone,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Hexagon,
  Layers,
} from 'lucide-react'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.style.setProperty('--admin-sidebar-width', collapsed ? '5rem' : '250px')
  }, [collapsed])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    navigate('/')
  }

  const navSections = [
    {
      title: 'MAIN',
      items: [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/sessions', label: 'Sessions', icon: Layers },
        { path: '/admin/internships', label: 'Internships', icon: BriefcaseBusiness },
        { path: '/admin/interns', label: 'Interns', icon: Users },
        { path: '/admin/tasks', label: 'Tasks', icon: ClipboardCheck },
        { path: '/admin/submissions', label: 'Submissions', icon: FileCheck },
        { path: '/admin/Announcements', label: 'Announcements', icon: Megaphone },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { path: '/admin/settings', label: 'Settings', icon: Settings },
      ],
    },
  ]

  return (
    <aside
      className={`${collapsed ? 'md:w-20' : 'md:w-[250px]'
        } w-full h-auto md:h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 md:fixed md:left-0 md:top-0 md:z-50`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Hexagon className="w-8 h-8 text-indigo-600" />
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">InternFlow</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Min/Max Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navSections.map((section) => (
          <div key={section.title} className="mb-6">
            {!collapsed && (
              <p className="px-5 mb-2 text-xs font-semibold text-gray-400 tracking-wider">
                {section.title}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive }) =>
                        `flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg transition-colors ${isActive
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        } ${collapsed ? 'justify-center' : ''}`
                      }
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.label}</span>}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer - User Info & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">A</span>
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          )}

          {/* Logout Icon */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar