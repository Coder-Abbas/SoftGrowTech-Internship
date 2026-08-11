import { Link } from "react-router-dom"
import { Calendar } from "lucide-react"

// lucide-react dropped brand icons; keep these as small inline SVGs.
const socialIcons = [
  {
    label: "Facebook",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z",
  },
  {
    label: "Twitter",
    path: "M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2c-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.9 3.6A11.4 11.4 0 0 1 3.7 4.8a4 4 0 0 0 1.2 5.3c-.6 0-1.3-.2-1.8-.5v.1a4 4 0 0 0 3.2 3.9c-.6.1-1.2.2-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.6a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6.1 11.3-11.3v-.5c.8-.6 1.4-1.3 1.9-2.1Z",
  },
  {
    label: "Instagram",
    path: "M12 2c2.7 0 3.1 0 4.1.1 1 0 1.7.2 2.3.5.6.2 1.1.6 1.6 1.1.5.5.8 1 1.1 1.6.3.6.4 1.3.5 2.3.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1-.2 1.7-.5 2.3-.2.6-.6 1.1-1.1 1.6-.5.5-1 .8-1.6 1.1-.6.3-1.3.4-2.3.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1 0-1.7-.2-2.3-.5a4.2 4.2 0 0 1-1.6-1.1 4.2 4.2 0 0 1-1.1-1.6c-.3-.6-.4-1.3-.5-2.3C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1 .2-1.7.5-2.3.2-.6.6-1.1 1.1-1.6.5-.5 1-.8 1.6-1.1.6-.3 1.3-.4 2.3-.5C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.8 0-1.3.2-1.6.3-.4.1-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.6-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .8.2 1.3.3 1.6.1.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.6.3 1 .1 1.4.1 4 .1s3 0 4-.1c.8 0 1.3-.2 1.6-.3.4-.1.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.6.1-1 .1-1.4.1-4s0-3-.1-4c0-.8-.2-1.3-.3-1.6a2.5 2.5 0 0 0-.6-1 2.5 2.5 0 0 0-1-.6c-.3-.1-.8-.3-1.6-.3-1-.1-1.4-.1-4-.1Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm5-2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z",
  },
  {
    label: "LinkedIn",
    path: "M6.9 8.4H3.3V20h3.6V8.4ZM5.1 3.5a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM20.7 20h-3.6v-6.1c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.3-.1.2-.1.6-.1.9V20H9.7s0-10.6 0-11.6h3.6v1.6a3.6 3.6 0 0 1 3.2-1.8c2.4 0 4.2 1.6 4.2 4.9V20Z",
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-2">
              <Calendar size={16} strokeWidth={2.5} />
            </span>
            Eventify
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Discover experiences. Create memories.
          </p>
          <div className="mt-5 flex gap-3">
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary-2 hover:text-primary-2"
              >
                <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><Link to="/" className="hover:text-text">Home</Link></li>
            <li><Link to="/events" className="hover:text-text">Events</Link></li>
            <li><Link to="/about" className="hover:text-text">About</Link></li>
            <li><Link to="/contact" className="hover:text-text">Contact</Link></li>
            <li><Link to="/my-bookings" className="hover:text-text">My Bookings</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold">Categories</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><Link to="/events?category=music" className="hover:text-text">Music</Link></li>
            <li><Link to="/events?category=technology" className="hover:text-text">Technology</Link></li>
            <li><Link to="/events?category=business" className="hover:text-text">Business</Link></li>
            <li><Link to="/events?category=sports" className="hover:text-text">Sports</Link></li>
            <li><Link to="/events?category=art" className="hover:text-text">Art</Link></li>
            <li><Link to="/events?category=education" className="hover:text-text">Education</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold">Contact Us</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>hello@eventify.com</li>
            <li>+92 300 1234567</li>
            <li>Islamabad, Pakistan</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted">
        © 2026 Eventify. All Rights Reserved.
      </div>
    </footer>
  )
}
