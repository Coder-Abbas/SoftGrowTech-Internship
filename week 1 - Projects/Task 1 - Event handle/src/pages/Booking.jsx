import { useMemo, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { Minus, Plus, Calendar, Clock, MapPin } from "lucide-react"
import { getEventById } from "../data/events"
import { createBooking } from "../utils/storage"

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
}

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = getEventById(id)

  const [form, setForm] = useState({ name: "", email: "", phone: "" })
  const [tickets, setTickets] = useState(1)
  const [errors, setErrors] = useState({})

  const total = useMemo(() => (event ? event.price * tickets : 0), [event, tickets])

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Event not found</h1>
        <Link to="/events" className="mt-4 inline-block text-primary-2 underline">Back to Events</Link>
      </div>
    )
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = "Full name is required"
    if (!form.email.trim()) e.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email"
    if (!form.phone.trim()) e.phone = "Phone number is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    const booking = createBooking({
      eventId: event.id,
      eventTitle: event.title,
      eventImage: event.image,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.venue + ", " + event.location,
      name: form.name,
      email: form.email,
      phone: form.phone,
      tickets,
      pricePerTicket: event.price,
      total,
    })
    navigate(`/booking-confirmation/${booking.bookingId}`)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <h1 className="mb-8 text-center font-display text-3xl font-bold">Complete Your Booking</h1>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Event summary */}
        <div className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">Event Summary</h2>
          <div className="overflow-hidden rounded-xl">
            <img src={event.image} alt={event.title} className="aspect-video w-full object-cover" />
          </div>
          <h3 className="mt-4 font-display text-lg font-bold">{event.title}</h3>
          <div className="mt-3 space-y-2 text-sm text-muted">
            <div className="flex items-center gap-2"><Calendar size={14} /> {formatDate(event.date)}</div>
            <div className="flex items-center gap-2"><Clock size={14} /> {event.time}</div>
            <div className="flex items-center gap-2"><MapPin size={14} /> {event.venue}, {event.location}</div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm text-muted">Ticket Price</span>
            <span className="font-display text-lg font-bold text-primary-2">${event.price}</span>
          </div>
        </div>

        {/* Booking form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="mb-5 font-display text-lg font-semibold">Booking Form</h2>

          <Field label="Full Name" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-primary-2"
            />
          </Field>

          <Field label="Email Address" error={errors.email}>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-primary-2"
            />
          </Field>

          <Field label="Phone Number" error={errors.phone}>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-primary-2"
            />
          </Field>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-muted">Number of Tickets</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setTickets((t) => Math.max(1, t - 1))}
                className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:border-primary-2/60"
              >
                <Minus size={15} />
              </button>
              <span className="w-6 text-center font-semibold">{tickets}</span>
              <button
                type="button"
                onClick={() => setTickets((t) => Math.min(10, t + 1))}
                className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:border-primary-2/60"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between rounded-lg bg-surface-2 px-4 py-4">
            <div>
              <div className="text-sm text-muted">Total Amount</div>
              <div className="text-xs text-muted">For {tickets} ticket{tickets > 1 ? "s" : ""}</div>
            </div>
            <div className="font-display text-2xl font-bold text-primary-2">${total}</div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full rounded-lg bg-gradient-to-r from-primary to-primary-2 py-3 text-sm font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Confirm Booking
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            By continuing, you agree to our Terms & Conditions.
          </p>
        </form>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-muted">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}
