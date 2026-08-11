const BOOKINGS_KEY = "eventify_bookings"

export function getBookings() {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function getBookingById(id) {
  return getBookings().find((b) => b.bookingId === id)
}

function generateBookingId() {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `EVT-2026-${num}`
}

export function createBooking(booking) {
  const bookings = getBookings()
  const newBooking = {
    ...booking,
    bookingId: generateBookingId(),
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  }
  bookings.unshift(newBooking)
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
  return newBooking
}

export function cancelBooking(bookingId) {
  const bookings = getBookings().map((b) =>
    b.bookingId === bookingId ? { ...b, status: "Cancelled" } : b
  )
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
}
