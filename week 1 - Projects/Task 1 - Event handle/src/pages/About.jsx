import { Link } from "react-router-dom"
import { Search, CalendarCheck, Ticket } from "lucide-react"

const stats = [
  { value: "10K+", label: "Attendees" },
  { value: "500+", label: "Events" },
  { value: "50+", label: "Organizers" },
]

const steps = [
  { icon: Search, title: "Discover", text: "Find events that match your interest." },
  { icon: CalendarCheck, title: "Select", text: "Choose your favorite event." },
  { icon: Ticket, title: "My Bookings", text: "Open UI/UX Clean interface." },
]

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">About Eventify</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Making it easier to discover experiences that matter. Eventify helps people discover and
          book exciting events in one simple platform.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-surface p-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-display text-2xl font-bold text-primary-2 sm:text-3xl">{s.value}</div>
            <div className="mt-1 text-xs text-muted sm:text-sm">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-center font-display text-2xl font-bold">How It Works</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-border bg-surface p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-bold text-primary-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-display font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary to-primary-2 px-6 py-10 text-center">
        <h2 className="font-display text-xl font-bold sm:text-2xl">Have questions? We'd love to hear from you.</h2>
        <Link
          to="/contact"
          className="mt-5 inline-block rounded-lg bg-bg px-6 py-3 text-sm font-semibold text-text transition-transform hover:scale-[1.03]"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
