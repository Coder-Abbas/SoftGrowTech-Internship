import { useState, useEffect } from "react";
import { noteColors } from "../data/noteColors";

function NoteModal({ onClose, onAddNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * noteColors.length);
    return noteColors[randomIndex].name;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    const finalColor = selectedColor || getRandomColor();

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      color: finalColor,
      createdAt: new Date().toISOString(),
    };

    onAddNote(newNote);
  };

  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-[modalIn_0.2s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Create New Note</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-600 transition-colors leading-none cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Note Title
            </label>
            <input
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Note Content
            </label>
            <textarea
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[180px] resize-y"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-semibold text-sm text-gray-700">
              Choose a color
            </label>
            <div className="flex gap-3 mt-2">
              {noteColors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center text-sm font-bold ${
                    selectedColor === color.name
                      ? "border-gray-800 shadow-lg scale-110"
                      : "border-transparent hover:scale-110"
                  }`}
                  style={{ backgroundColor: color.background, color: color.text }}
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={`Select ${color.name} color`}
                >
                  {selectedColor === color.name && "✓"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;