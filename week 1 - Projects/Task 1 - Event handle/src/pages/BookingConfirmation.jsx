import { Link, useParams } from "react-router-dom"
import { CheckCircle2, Calendar, Clock, MapPin, Ticket } from "lucide-react"
import { getBookingById } from "../utils/storage"

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
}

export default function BookingConfirmation() {
  const { bookingId } = useParams()
  const booking = getBookingById(bookingId)

  if (!booking) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Booking not found</h1>
        <Link to="/events" className="mt-4 inline-block text-primary-2 underline">Explore Events</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 lg:px-8">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15">
          <CheckCircle2 size={34} className="text-green-500" />
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold sm:text-3xl">Booking Confirmed!</h1>
        <p className="mt-2 text-muted">Your booking has been successfully confirmed.</p>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-sm text-muted">Booking ID</span>
          <span className="font-mono text-sm font-semibold text-primary-2">{booking.bookingId}</span>
        </div>

        <div className="flex gap-4 py-5">
          <img src={booking.eventImage} alt={booking.eventTitle} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
          <div>
            <h2 className="font-display font-semibold">{booking.eventTitle}</h2>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(booking.eventDate)}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {booking.eventTime}</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted">
              <MapPin size={12} /> {booking.eventLocation}
            </div>
          </div>
        </div>

        <div className="space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between text-muted">
            <span className="flex items-center gap-1.5"><Ticket size={13} /> Tickets</span>
            <span className="text-text">{booking.tickets}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Attendee</span>
            <span className="text-text">{booking.name}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Email</span>
            <span className="text-text">{booking.email}</span>
          </div>
          <div className="flex justify-between pt-2 text-base font-semibold">
            <span>Total Paid</span>
            <span className="text-primary-2">${booking.total}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/my-bookings"
          className="flex-1 rounded-lg bg-gradient-to-r from-primary to-primary-2 py-3 text-center text-sm font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02]"
        >
          View My Bookings
        </Link>
        <Link
          to="/"
          className="flex-1 rounded-lg border border-border py-3 text-center text-sm font-semibold transition-colors hover:border-primary-2/60"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
