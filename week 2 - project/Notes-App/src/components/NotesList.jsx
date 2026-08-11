import NoteCard from "./NoteCard";

function NotesList({
  notes,
  totalNotes,
  onDeleteNote,
  onNewNote,
  onView,
  filter,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
}) {
  // No notes at all
  if (totalNotes === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 bg-indigo-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No notes yet</h2>
        <p className="text-gray-500 mb-6">
          Click "New Note" to create your first note.
        </p>
        <button
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer shadow-lg shadow-indigo-200"
          onClick={onNewNote}
        >
          + Create Your First Note
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-800">
          My Notes{" "}
          <span className="ml-2 px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
            {totalNotes}
          </span>
        </h2>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === "newest"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onFilterChange("newest")}
          >
            Newest
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === "oldest"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onFilterChange("oldest")}
          >
            Oldest
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filter === "az"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onFilterChange("az")}
          >
            A-Z
          </button>
        </div>
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDeleteNote={onDeleteNote}
            onView={onView}
          />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            className="px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}

export default NotesList;