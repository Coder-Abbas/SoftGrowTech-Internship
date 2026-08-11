import { useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, Clock, Ticket, Trash2 } from "lucide-react"
import { getBookings, cancelBooking } from "../utils/storage"

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })
}

export default function MyBookings() {
  const [bookings, setBookings] = useState(getBookings())

  function handleCancel(bookingId) {
    cancelBooking(bookingId)
    setBookings(getBookings())
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
      <h1 className="font-display text-3xl font-bold">My Bookings</h1>
      <p className="mt-2 text-muted">Track and manage all your event bookings in one place.</p>

      {bookings.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border bg-surface py-16 text-center">
          <p className="text-muted">You haven't booked any events yet.</p>
          <Link
            to="/events"
            className="mt-4 inline-block rounded-lg bg-gradient-to-r from-primary to-primary-2 px-6 py-2.5 text-sm font-semibold"
          >
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {bookings.map((b) => (
            <div
              key={b.bookingId}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center"
            >
              <img src={b.eventImage} alt={b.eventTitle} className="h-20 w-full shrink-0 rounded-lg object-cover sm:w-28" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display font-semibold">{b.eventTitle}</h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      b.status === "Confirmed"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(b.eventDate)}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {b.eventTime}</span>
                  <span className="flex items-center gap-1"><Ticket size={12} /> {b.tickets} ticket{b.tickets > 1 ? "s" : ""}</span>
                </div>
                <div className="mt-1 text-xs text-muted">Booking ID: <span className="font-mono text-text">{b.bookingId}</span></div>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                <span className="font-display text-lg font-bold text-primary-2">${b.total}</span>
                <div className="flex gap-2">
                  <Link
                    to={`/events/${b.eventId}`}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary-2/60"
                  >
                    View Event
                  </Link>
                  {b.status === "Confirmed" && (
                    <button
                      onClick={() => handleCancel(b.bookingId)}
                      className="cursor-pointer flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:border-red-400/60"
                    >
                      <Trash2 size={12} /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
