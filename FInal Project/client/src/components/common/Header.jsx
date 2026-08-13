import React from 'react'
import { Search } from 'lucide-react'
import TopbarActions from './TopbarActions'

const Header = ({ basePath, userName }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div className="flex items-center gap-3 w-full max-w-md px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />

        <input
          type="text"
          placeholder="Search interns, tasks, Sessions..."
          className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none border-none"
        />
      </div>

      <TopbarActions basePath={basePath} userName={userName} />
    </header>
  )
}

export default Header