import { Link } from "react-router-dom"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 py-16 text-center">
      <div className="font-display text-7xl font-extrabold text-primary-2 sm:text-8xl">404</div>
      <h1 className="mt-4 font-display text-xl font-bold sm:text-2xl">Page Not Found</h1>
      <p className="mt-2 text-muted">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="mt-7 flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-2 px-6 py-3 text-sm font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]"
      >
        <Home size={16} /> Back to Home
      </Link>
    </div>
  )
}
