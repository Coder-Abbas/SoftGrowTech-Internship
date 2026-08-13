import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard'
import AdminSessions from './pages/Admin/Sessions'
import AdminSessionDetail from './pages/Admin/SessionDetail'
import AdminDomainDetail from './pages/Admin/DomainDetail'
import AdminInternships from './pages/Admin/Internships'
import AdminUsers from './pages/Admin/Users'
import AdminInterns from './pages/Admin/Interns'
import AdminTasks from './pages/Admin/Tasks'
import AdminSubmissions from './pages/Admin/Submissions'
import AdminReports from './pages/Admin/Reports'
import AdminAnnouncements from './pages/Admin/Announcements'
import AdminSettings from './pages/Admin/Settings'

// Intern Pages
import InternDashboard from './pages/Intern/Dashboard'
import InternTasks from './pages/Intern/Tasks'
import InternProjects from './pages/Intern/Projects'
import InternSubmissions from './pages/Intern/Submissions'
import InternAnnouncements from './pages/Intern/Announcements'
import InternSettings from './pages/Intern/Settings'

const getAuthState = () => {
  const accessToken = localStorage.getItem('accessToken')
  const userRole = localStorage.getItem('userRole')

  return {
    isAuthenticated: Boolean(accessToken && userRole),
    userRole,
  }
}

const roleHome = {
  admin: '/admin/dashboard',
  intern: '/intern/dashboard',
}

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, userRole } = getAuthState()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={roleHome[userRole] || '/'} replace />
  }

  return children
}

const PublicRoute = ({ children }) => {
  const { isAuthenticated, userRole } = getAuthState()

  if (isAuthenticated) {
    return <Navigate to={roleHome[userRole] || '/'} replace />
  }

  return children
}

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Navigate to="/admin/dashboard" replace /></ProtectedRoute>} />
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/sessions" element={<ProtectedRoute allowedRoles={['admin']}><AdminSessions /></ProtectedRoute>} />
      <Route path="/admin/sessions/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdminSessionDetail /></ProtectedRoute>} />
      <Route path="/admin/sessions/:id/domains/:domainId" element={<ProtectedRoute allowedRoles={['admin']}><AdminDomainDetail /></ProtectedRoute>} />
      <Route path="/admin/internships" element={<ProtectedRoute allowedRoles={['admin']}><AdminInternships /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/interns" element={<ProtectedRoute allowedRoles={['admin']}><AdminInterns /></ProtectedRoute>} />
      <Route path="/admin/tasks" element={<ProtectedRoute allowedRoles={['admin']}><AdminTasks /></ProtectedRoute>} />
      <Route path="/admin/submissions" element={<ProtectedRoute allowedRoles={['admin']}><AdminSubmissions /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
      <Route path="/admin/announcements" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnnouncements /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />

      {/* Intern Routes */}
      <Route path="/intern" element={<ProtectedRoute allowedRoles={['intern']}><Navigate to="/intern/dashboard" replace /></ProtectedRoute>} />
      <Route path="/intern/dashboard" element={<ProtectedRoute allowedRoles={['intern']}><InternDashboard /></ProtectedRoute>} />
      <Route path="/intern/tasks" element={<ProtectedRoute allowedRoles={['intern']}><InternTasks /></ProtectedRoute>} />
      <Route path="/intern/projects" element={<ProtectedRoute allowedRoles={['intern']}><InternProjects /></ProtectedRoute>} />
      <Route path="/intern/submissions" element={<ProtectedRoute allowedRoles={['intern']}><InternSubmissions /></ProtectedRoute>} />
      <Route path="/intern/announcements" element={<ProtectedRoute allowedRoles={['intern']}><InternAnnouncements /></ProtectedRoute>} />
      <Route path="/intern/settings" element={<ProtectedRoute allowedRoles={['intern']}><InternSettings /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App