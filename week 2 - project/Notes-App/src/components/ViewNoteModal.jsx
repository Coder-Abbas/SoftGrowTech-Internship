import { useEffect } from "react";
import { noteColors } from "../data/noteColors";

function ViewNoteModal({ note, onClose }) {
  const color = noteColors.find((item) => item.name === note.color) || noteColors[0];

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-[modalIn_0.2s_ease]"
        style={{ backgroundColor: color.background }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-xl font-bold break-words pr-2"
            style={{ color: color.text }}
          >
            {note.title}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-600 transition-colors leading-none cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <p className="text-sm leading-relaxed text-[#374151] whitespace-pre-wrap break-words mb-6">
          {note.content}
        </p>

        <div
          className="flex items-center gap-2 pt-4 border-t border-black/10 text-sm font-medium"
          style={{ color: color.text }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Created on {formatDate(note.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default ViewNoteModal;