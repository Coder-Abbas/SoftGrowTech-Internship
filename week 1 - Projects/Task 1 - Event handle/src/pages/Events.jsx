import { useMemo, useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Search } from "lucide-react"
import { events, categories } from "../data/events"
import EventCard from "../components/EventCard"

const PAGE_SIZE = 6

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "all")
  const [sort, setSort] = useState("date")
  const [page, setPage] = useState(1)

  useEffect(() => {
    setQuery(searchParams.get("search") || "")
    setCategory(searchParams.get("category") || "all")
  }, [searchParams])

  const filtered = useMemo(() => {
    let list = events.filter((e) => {
      const matchesCategory = category === "all" || e.category === category
      const matchesQuery =
        !query ||
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.location.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price)
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price)
    if (sort === "date") list = [...list].sort((a, b) => new Date(a.date) - new Date(b.date))
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [query, category, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function updateCategory(id) {
    setCategory(id)
    setPage(1)
    const next = new URLSearchParams(searchParams)
    if (id === "all") next.delete("category")
    else next.set("category", id)
    setSearchParams(next)
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    setPage(1)
    const next = new URLSearchParams(searchParams)
    if (query) next.set("search", query)
    else next.delete("search")
    setSearchParams(next)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Explore Events</h1>
        <p className="mt-2 text-muted">Discover amazing experiences happening around you.</p>
      </div>

      {/* Search + sort */}
      <form onSubmit={handleSearchSubmit} className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-4 py-3">
          <Search size={16} className="text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </div>
        <select
          value={category}
          onChange={(e) => updateCategory(e.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.id === "all" ? "All Categories" : c.label}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none"
        >
          <option value="date">Sort By: Date</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </form>

      {/* Category pills */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => updateCategory(c.id)}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === c.id
                ? "bg-gradient-to-r from-primary to-primary-2 text-white"
                : "border border-border text-muted hover:border-primary-2/50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {paged.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface py-16 text-center text-muted">
          No events found. Try a different search or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`cursor-pointer h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                page === i + 1
                  ? "bg-gradient-to-r from-primary to-primary-2 text-white"
                  : "border border-border text-muted hover:border-primary-2/50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
