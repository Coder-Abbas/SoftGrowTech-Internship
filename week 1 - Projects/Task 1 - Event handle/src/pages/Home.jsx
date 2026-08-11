import { useState, useMemo, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Star,
  Search,
  MapPin,
  CalendarDays,
  Tag,
  Ticket,
  Sparkles,
  ShieldCheck,
  Zap,
  Music,
  Laptop,
  BriefcaseBusiness,
  Trophy,
  Palette,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Quote,
  Users,
} from "lucide-react"

import { events, categories } from "../data/events"
import EventCard from "../components/EventCard"
import heroImg from "../assets/1.jpg"

const categoryIcons = {
  music: Music,
  technology: Laptop,
  business: BriefcaseBusiness,
  sports: Trophy,
  art: Palette,
  education: GraduationCap,
}

// Get unique locations from events
const locations = [...new Set(events.map((e) => e.location))]

const testimonials = [
  {
    quote: "What an amazing experience! Booking my ticket was incredibly easy and the whole process felt effortless.",
    name: "Emily Johnson",
    role: "Event Attendee",
  },
  {
    quote: "I found the perfect tech conference through Eventify. Highly recommended for anyone who wants quality events.",
    name: "Michael Smith",
    role: "Developer",
  },
  {
    quote: "The platform is smooth, reliable, and the events are always top quality. It's my go-to for finding things to do.",
    name: "Sarah Khan",
    role: "Entrepreneur",
  },
  {
    quote: "Support was fantastic when I needed to change my ticket. Quick, friendly, and genuinely helpful every time.",
    name: "David Chen",
    role: "Product Manager",
  },
  {
    quote: "I've discovered so many local events I never knew existed. It's completely changed how I spend my weekends.",
    name: "Priya Patel",
    role: "Designer",
  },
]

const features = [
  { icon: Ticket, title: "Easy Booking", text: "Book your favorite events in just a few clicks." },
  { icon: Sparkles, title: "Wide Selection", text: "Discover concerts, workshops, conferences and more." },
  { icon: Zap, title: "Instant Confirmation", text: "Receive your booking confirmation immediately." },
  { icon: ShieldCheck, title: "Trusted Events", text: "Find exciting events from trusted organizers." },
]

// 3 testimonials visible per page, auto-paginating
const PAGE_SIZE = 3

function TestimonialCarousel() {
  const pageCount = Math.ceil(testimonials.length / PAGE_SIZE)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setPage((p) => (p + 1) % pageCount), 5000)
    return () => clearInterval(t)
  }, [paused, pageCount])

  const visible = testimonials.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
  while (visible.length < PAGE_SIZE) {
    visible.push(testimonials[visible.length % testimonials.length])
  }

  function goTo(p) {
    setPage(((p % pageCount) + pageCount) % pageCount)
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {visible.map((t, i) => (
          <div
            key={`${page}-${i}`}
            className="rounded-xl border border-border bg-surface-2/60 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <Quote size={22} className="mb-3 text-primary-2/50" />
            <div className="mb-3 flex gap-0.5 text-primary-2">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={13} className="fill-primary-2" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-2 text-xs font-semibold text-white">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            aria-label="Previous"
            className="rounded-full border border-border p-1.5 text-muted transition-colors hover:border-primary-2/60 hover:text-primary-2"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === page ? "w-6 bg-primary-2" : "w-2 bg-border hover:bg-primary-2/50"
              }`}
            />
          ))}
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            aria-label="Next"
            className="rounded-full border border-border p-1.5 text-muted transition-colors hover:border-primary-2/60 hover:text-primary-2"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [query, setQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set("search", query)
    if (selectedLocation) params.set("location", selectedLocation)
    if (selectedDate) params.set("date", selectedDate)
    if (selectedCategory) params.set("category", selectedCategory)
    const qs = params.toString()
    navigate(qs ? `/events?${qs}` : "/events")
  }

  const dateOptions = []
  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const val = d.toISOString().split("T")[0]
    const label = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    dateOptions.push({ value: val, label })
  }

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesQuery =
        !query ||
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase()) ||
        event.category.toLowerCase().includes(query.toLowerCase())
      const matchesLocation = !selectedLocation || event.location === selectedLocation
      const matchesDate = !selectedDate || event.date === selectedDate
      const matchesCategory = !selectedCategory || event.category === selectedCategory
      return matchesQuery && matchesLocation && matchesDate && matchesCategory
    })
  }, [query, selectedLocation, selectedDate, selectedCategory])

  const hasFilters = query || selectedLocation || selectedDate || selectedCategory

  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-2/10 blur-[100px]" />

        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-14 lg:grid-cols-2 lg:items-center lg:px-8 lg:pb-28 lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-2/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-2">
              <Sparkles size={13} /> Discover Events
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              Discover Events That Inspire You
            </h1>
            <p className="mt-4 max-w-md text-muted">
              Find concerts, workshops, conferences, and experiences happening near you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/events"
                className="rounded-lg bg-gradient-to-r from-primary to-primary-2 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Explore Events
              </Link>
              <Link
                to="/about"
                className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-primary-2/60"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <img
                src={heroImg}
                alt="Crowd enjoying a live concert"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -left-4 bottom-6 flex items-center gap-2 rounded-xl border border-border bg-surface/95 px-4 py-3 shadow-xl backdrop-blur">
              <Star size={16} className="fill-primary-2 text-primary-2" />
              <div className="text-xs">
                <div className="font-semibold">4.9 Rating</div>
                <div className="text-muted">Trusted by attendees</div>
              </div>
            </div>
            <div className="absolute -right-3 top-6 flex items-center gap-2 rounded-xl border border-border bg-surface/95 px-4 py-3 shadow-xl backdrop-blur">
              <Users size={16} className="text-primary-2" />
              <div className="text-xs">
                <div className="font-display text-base font-bold text-primary-2">10K+</div>
                <div className="text-muted">Attendees</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating search pill, overlapping the hero/content boundary */}
        <div className="relative z-10 mx-auto -mt-10 max-w-4xl px-5 lg:px-8">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-2 rounded-xl border border-border bg-surface/95 p-2 shadow-2xl shadow-black/20 backdrop-blur sm:flex-row sm:items-center sm:gap-0"
          >
            <div className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2.5 transition-colors focus-within:bg-bg">
              <Search size={17} className="shrink-0 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events..."
                className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted/60"
              />
            </div>

            <div className="hidden items-center gap-2 rounded-lg border-t border-border px-3 py-2.5 transition-colors focus-within:bg-bg sm:flex sm:border-l sm:border-t-0">
              <MapPin size={15} className="shrink-0 text-muted" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="cursor-pointer appearance-none bg-transparent pr-4 text-sm text-muted outline-none"
              >
                <option value="">Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="hidden items-center gap-2 rounded-lg border-t border-border px-3 py-2.5 transition-colors focus-within:bg-bg sm:flex sm:border-l sm:border-t-0">
              <CalendarDays size={15} className="shrink-0 text-muted" />
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="cursor-pointer appearance-none bg-transparent pr-4 text-sm text-muted outline-none"
              >
                <option value="">Date</option>
                {dateOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="hidden items-center gap-2 rounded-lg border-t border-border px-3 py-2.5 transition-colors focus-within:bg-bg sm:flex sm:border-l sm:border-t-0">
              <Tag size={15} className="shrink-0 text-muted" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="cursor-pointer appearance-none bg-transparent pr-4 text-sm text-muted outline-none"
              >
                <option value="">Category</option>
                {categories.filter((c) => c.id !== "all").map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-gradient-to-r from-primary to-primary-2 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="bg-bg pb-16 pt-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                {hasFilters ? "Search Results" : "Upcoming Events"}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {hasFilters
                  ? `${filteredEvents.length} event${filteredEvents.length !== 1 ? "s" : ""} found`
                  : "Don't miss what's happening next"}
              </p>
            </div>
            {!hasFilters && (
              <Link
                to="/events"
                className="hidden shrink-0 rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary-2/60 sm:block"
              >
                View All Events
              </Link>
            )}
          </div>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredEvents.slice(0, 8).map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search size={48} className="mb-4 text-muted/40" />
              <p className="text-lg font-semibold text-muted">No events found</p>
              <p className="mt-1 text-sm text-muted/60">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-bg py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="mb-8 text-center font-display text-2xl font-bold sm:text-3xl">Explore By Category</h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {categories.filter((c) => c.id !== "all").map((c) => {
              const IconComponent = categoryIcons[c.id]
              return (
                <Link
                  key={c.id}
                  to={`/events?category=${c.id}`}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5 text-center transition-all hover:-translate-y-1 hover:border-primary-2/50 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary-2">
                    <IconComponent size={22} />
                  </span>
                  <span className="text-xs font-medium text-muted">{c.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-bg py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="mb-10 text-center font-display text-2xl font-bold sm:text-3xl">Why Choose Eventify?</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-surface p-6 text-center transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary-2">
                  <f.icon size={22} />
                </div>
                <h3 className="mt-4 font-display font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — auto-paginating */}
      <section className="bg-bg py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="mb-10 text-center font-display text-2xl font-bold sm:text-3xl">What People Say</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg pb-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-r from-primary to-primary-2 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">Ready to Experience Something Amazing?</h2>
              <p className="mt-1 text-white/85">Find your next unforgettable event today.</p>
            </div>
            <Link
              to="/events"
              className="shrink-0 rounded-lg bg-bg px-6 py-3 text-sm font-semibold text-text transition-transform hover:scale-[1.03]"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}