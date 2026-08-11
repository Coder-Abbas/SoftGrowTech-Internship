import { Link } from "react-router-dom"
import { Calendar, MapPin } from "lucide-react"

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
}

export default function EventCard({ event }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 transition-200 hover:border-primary-2/50 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-all-in-out duration-800 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-3 py-1 text-xs font-semibold capitalize backdrop-blur">
          {event.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base font-semibold leading-snug">{event.title}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Calendar size={13} />
          {formatDate(event.date)}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <MapPin size={13} />
          {event.location}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-primary-2">${event.price}</span>
          <span className="rounded-lg bg-surface-2 px-3 py-1.5 text-xs font-semibold text-text transition-color hover:bg-primary transition-all transition-100 hover:text-white">
            View Details
          </span>
        </div>
      </div>
    </Link>
  )
}
