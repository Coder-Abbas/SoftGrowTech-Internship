import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Calendar, Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "../utils/ThemeContext"

const links = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { light, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-2">
            <Calendar size={16} strokeWidth={2.5} />
          </span>
          Eventify
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-primary-2" : "text-muted hover:text-text"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          
          <Link
            to="/my-bookings"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-text sm:block"
          >
            My Bookings
          </Link>
          <button
            onClick={() => navigate("/events")}
            className="cursor-pointer hidden rounded-lg bg-gradient-to-r from-primary to-primary-2 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] active:scale-[0.98] sm:block"
          >
            Book Now
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-surface px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? "text-primary-2" : "text-muted"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/my-bookings" onClick={() => setOpen(false)} className="text-sm font-medium text-muted">
              My Bookings
            </NavLink>
            <button
              onClick={() => {
                setOpen(false)
                navigate("/events")
              }}
              className="cursor-pointer rounded-lg bg-gradient-to-r from-primary to-primary-2 px-5 py-2.5 text-sm font-semibold"
            >
              Book Now
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
