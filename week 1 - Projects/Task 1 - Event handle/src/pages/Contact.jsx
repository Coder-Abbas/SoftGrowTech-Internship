import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = "Full name is required"
    if (!form.email.trim()) e.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email"
    if (!form.message.trim()) e.message = "Message can't be empty"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSent(true)
    setForm({ name: "", email: "", message: "" })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Get In Touch</h1>
        <p className="mt-2 text-muted">Have questions? We'd love to hear from you.</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <ContactRow icon={Mail} label="Email" value="hello@eventify.com" />
          <ContactRow icon={Phone} label="Phone" value="+92 300 1234567" />
          <ContactRow icon={MapPin} label="Location" value="Islamabad, Pakistan" />
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-primary-2"
              />
            </Field>
            <Field label="Email Address" error={errors.email}>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your email"
                className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-primary-2"
              />
            </Field>
          </div>
          <Field label="Message" error={errors.message}>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="How can we help?"
              rows={5}
              className="w-full resize-none rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none focus:border-primary-2"
            />
          </Field>
          <button
            type="submit"
            className="cursor-pointer mt-2 w-full rounded-lg bg-gradient-to-r from-primary to-primary-2 py-3 text-sm font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Send Message
          </button>
          {sent && (
            <p className="mt-3 text-center text-sm text-green-400">
              Message sent! We'll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

function ContactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-2">
        <Icon size={18} />
      </span>
      <div>
        <div className="text-xs text-muted">{label}</div>
        <div className="text-sm font-medium">{value}</div>
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
