import { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteModal from "./components/NoteModal";
import NotesList from "./components/NotesList";
import ViewNoteModal from "./components/ViewNoteModal";

const NOTES_PER_PAGE = 6;

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingNote, setViewingNote] = useState(null);
  const [filter, setFilter] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setIsModalOpen(false);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // Filter notes based on search term and sort order
  const filteredAndSortedNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (filter === "az") {
        return a.title.localeCompare(b.title);
      }
      // newest is default
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedNotes.length / NOTES_PER_PAGE));

  // Clamp currentPage if it exceeds totalPages (e.g. after deletion)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  const paginatedNotes = filteredAndSortedNotes.slice(
    (currentPage - 1) * NOTES_PER_PAGE,
    currentPage * NOTES_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <Header
        onNewNote={() => setIsModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        <NotesList
          notes={paginatedNotes}
          totalNotes={filteredAndSortedNotes.length}
          onDeleteNote={deleteNote}
          onNewNote={() => setIsModalOpen(true)}
          onView={setViewingNote}
          filter={filter}
          onFilterChange={setFilter}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

      <footer className="py-6 text-center border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <p className="text-sm text-gray-500">
          Made with{" "}
          <span className="text-red-500 inline-block animate-pulse">❤️</span>{" "}
          by <span className="font-semibold text-gray-700">Muhammad Abbas</span>
        </p>
      </footer>

      {isModalOpen && (
        <NoteModal
          onClose={() => setIsModalOpen(false)}
          onAddNote={addNote}
        />
      )}

      {viewingNote && (
        <ViewNoteModal
          note={viewingNote}
          onClose={() => setViewingNote(null)}
        />
      )}
    </div>
  );
}

export default App;