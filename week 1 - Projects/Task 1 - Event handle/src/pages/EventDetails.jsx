import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Tag, Building2 } from "lucide-react"
import { getEventById } from "../data/events"

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
}

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = getEventById(id)

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Event not found</h1>
        <Link to="/events" className="mt-4 inline-block text-primary-2 underline">
          Back to Events
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer mb-6 flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-text"
      >
        <ArrowLeft size={16} /> Back to Events
      </button>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="mb-3 inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold capitalize text-primary-2">
            {event.category}
          </span>
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{event.title}</h1>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-1.5"><Calendar size={15} /> {formatDate(event.date)}</span>
            <span className="flex items-center gap-1.5"><Clock size={15} /> {event.time}</span>
            <span className="flex items-center gap-1.5"><MapPin size={15} /> {event.venue}, {event.location}</span>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <img src={event.image} alt={event.title} className="aspect-video w-full object-cover" />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[event.image, event.image, event.image].map((img, i) => (
              <div key={i} className="aspect-video overflow-hidden rounded-lg border border-border">
                <img src={img} alt="" className="h-full w-full object-cover opacity-80" />
              </div>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold">About This Event</h2>
            <p className="mt-3 leading-relaxed text-muted">{event.description}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold">Event Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow icon={Calendar} label="Date" value={formatDate(event.date)} />
              <InfoRow icon={Users} label="Available Tickets" value={`${event.capacity}`} />
              <InfoRow icon={Clock} label="Time" value={event.time} />
              <InfoRow icon={Tag} label="Event Type" value="Conference" />
              <InfoRow icon={MapPin} label="Location" value={event.venue} />
              <InfoRow icon={Building2} label="Organized By" value={event.organizer} />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold">Event Schedule</h2>
            <div className="mt-4 space-y-3">
              {event.schedule.map((s, i) => (
                <div key={i} className="flex flex-col gap-1 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center sm:gap-4">
                  <span className="shrink-0 text-sm font-semibold text-primary-2">{s.time}</span>
                  <span className="text-sm text-muted">{s.title}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky booking card */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="text-sm text-muted">Ticket Price</div>
            <div className="mt-1 font-display text-3xl font-bold text-primary-2">${event.price}</div>
            <button
              onClick={() => navigate(`/booking/${event.id}`)}
              className="cursor-pointer mt-5 w-full rounded-lg bg-gradient-to-r from-primary to-primary-2 py-3 text-sm font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Now
            </button>
            <div className="mt-5 space-y-3 border-t border-border pt-5 text-sm text-muted">
              <div className="flex justify-between"><span>Rating</span><span className="text-text">{event.rating} ★ ({event.reviews})</span></div>
              <div className="flex justify-between"><span>Venue</span><span className="text-text">{event.venue}</span></div>
              <div className="flex justify-between"><span>Organizer</span><span className="text-text">{event.organizer}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary-2">
        <Icon size={15} />
      </span>
      <div>
        <div className="text-xs text-muted">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  )
}
