import { noteColors } from "../data/noteColors";

function NoteCard({ note, onDeleteNote, onView }) {
  const color = noteColors.find((item) => item.name === note.color) || noteColors[0];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <article
      className="rounded-xl p-[18px] min-h-[150px] flex flex-col transition-all duration-200 ease hover:-translate-y-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] cursor-pointer"
      style={{ backgroundColor: color.background }}
      onClick={() => onView(note)}
    >
      {/* Title */}
      <h3
        className="text-base font-bold leading-snug break-words"
        style={{ color: color.text }}
      >
        {note.title}
      </h3>

      {/* Content - line clamped to 2 lines */}
      <p className="mt-3 text-sm leading-relaxed text-[#374151] flex-1 overflow-hidden line-clamp-3 whitespace-pre-wrap break-words">
        {note.content}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-[18px] flex items-center justify-between">
        <span
          className="flex items-center gap-1.5 text-xs font-medium"
          style={{ color: color.text }}
        >
          <svg
            className="w-3.5 h-3.5"
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
          {formatDate(note.createdAt)}
        </span>

        <button
          className="w-8 h-8 rounded-lg border border-black/[0.08] bg-white/55 cursor-pointer flex items-center justify-center transition-all duration-200 ease hover:bg-white/90 hover:scale-[1.05]"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteNote(note.id);
          }}
          aria-label="Delete note"
          title="Delete note"
          style={{ color: color.text }}
        >
          <svg
            className="w-[15px] h-[15px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default NoteCard;