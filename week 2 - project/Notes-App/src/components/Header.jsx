function Header({ onNewNote, searchTerm, onSearchChange }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Notes App Logo"
            className="w-10 h-10"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Notes</h1>
            <p className="text-sm text-gray-500">Capture your thoughts and ideas</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-56"
            />
          </div>

          <button
            onClick={onNewNote}
            aria-label="New Note"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            + New Note
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;