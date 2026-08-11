import { useState, useCallback } from 'react'

// Character sets
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

// Character set options with labels
const CHARACTER_SETS = [
  { id: 'uppercase', label: 'Uppercase Letters', chars: UPPERCASE, default: true },
  { id: 'lowercase', label: 'Lowercase Letters', chars: LOWERCASE, default: true },
  { id: 'numbers', label: 'Numbers', chars: NUMBERS, default: true },
  { id: 'symbols', label: 'Symbols', chars: SYMBOLS, default: false },
]

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [enabledSets, setEnabledSets] = useState(() =>
    CHARACTER_SETS.filter((s) => s.default).map((s) => s.id)
  )
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState(null)

  // Toggle a character set on/off
  const toggleSet = useCallback((id) => {
    setEnabledSets((prev) => {
      // If this is the last enabled set, don't allow disabling (ensure at least one)
      if (prev.includes(id) && prev.length === 1) {
        return prev
      }
      return prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    })
  }, [])

  // Generate a random password
  const generatePassword = useCallback(() => {
    const activeSets = CHARACTER_SETS.filter((set) => enabledSets.includes(set.id))
    const allChars = activeSets.map((set) => set.chars).join('')

    // Ensure at least one character from each enabled set
    let newPassword = activeSets
      .map((set) => set.chars[Math.floor(Math.random() * set.chars.length)])
      .join('')

    // Fill the rest with random characters from all sets
    for (let i = newPassword.length; i < length; i++) {
      newPassword += allChars[Math.floor(Math.random() * allChars.length)]
    }

    // Shuffle to randomize the guaranteed characters' positions
    newPassword = newPassword
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('')

    setPassword(newPassword)
    setCopied(false)
  }, [length, enabledSets])

  // Copy password to clipboard
  const copyToClipboard = useCallback(async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      showToast('Password copied to clipboard!', 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast('Failed to copy password', 'error')
    }
  }, [password])

  // Show a toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const strength = useCallback(() => {
    const activeSetsCount = enabledSets.length
    if (length >= 20 && activeSetsCount >= 4) return { label: 'Very Strong', color: 'text-emerald-400', bar: 'bg-emerald-400', width: '100%' }
    if (length >= 16 && activeSetsCount >= 3) return { label: 'Strong', color: 'text-lime-400', bar: 'bg-lime-400', width: '75%' }
    if (length >= 10 && activeSetsCount >= 2) return { label: 'Medium', color: 'text-amber-400', bar: 'bg-amber-400', width: '50%' }
    return { label: 'Weak', color: 'text-red-400', bar: 'bg-red-400', width: '25%' }
  }, [length, enabledSets])

  const strengthInfo = strength()

  return (
    <div className="min-h-screen bg-gradient-to-br overflow-y-hidden from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-2 sm:p-6">
      {/* Decorative background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[550px] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <main className="relative w-full max-w-lg">
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-indigo-500/10 p-3  sm:p-8">
          {/* Header */}
          <header className="mb-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h1 className="text-[18px] sm:text-3xl font-bold text-white tracking-tight">Password Generator</h1>
            </div>
            <p className="text-slate-400 text-sm">Create strong, secure passwords instantly</p>
          </header>

          {/* Password Display */}
          <div className="mb-6">
            <div className="relative group">
              <div className="bg-slate-800/80 border-2 border-slate-700 rounded-xl px-4 py-3 flex items-center gap-3 min-h-[60px] focus-within:border-indigo-500 transition-colors">
                <div className="flex-1 min-w-0">
                  {password ? (
                    <span className="text-white font-mono text-lg sm:text-xl break-all tracking-wider select-all">
                      {password}
                    </span>
                  ) : (
                    <span className="text-slate-500 font-mono text-lg">Click generate to create a password</span>
                  )}
                </div>
                <button
                  onClick={copyToClipboard}
                  disabled={!password}
                  className={`shrink-0 cursor-pointer p-2 rounded-lg transition-all ${copied
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600 hover:text-white border border-transparent'
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  title="Copy password"
                >
                  {copied ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Length Control */}
          <div className="mb-1">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="length" className="text-sm font-medium text-slate-300">
                Password Length
              </label>
              <span className="px-3 py-1 bg-indigo-500/15 text-indigo-300 text-sm font-semibold rounded-full border border-indigo-500/30 tabular-nums">
                {length} chars
              </span>
            </div>

            <div className="relative pt-1 pb-6">
              {/* Slider Track with fill */}
              <div className="relative h-2 bg-slate-800/80 rounded-full overflow-visible">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  style={{
                    width: `${((length - 8) / (64 - 8)) * 100}%`,
                  }}
                />

                {/* Range Input (overlay) */}
                <input
                  id="length"
                  type="range"
                  min="8"
                  max="64"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="length-slider absolute top-1/2 -translate-y-1/2 inset-x-0 w-full h-6 bg-transparent appearance-none cursor-pointer z-10"
                />
              </div>

              {/* Min/Max Labels */}
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span className="font-mono">8</span>
                <span className="font-mono">64</span>
              </div>
            </div>
          </div>

          {/* Character Options */}
          <div className="mb-3">
            <h2 className="text-sm font-medium text-slate-300 mb-3">Include:</h2>
            <div className="grid grid-cols-2 gap-3">
              {CHARACTER_SETS.map((set) => {
                const isEnabled = enabledSets.includes(set.id)
                return (
                  <button
                    key={set.id}
                    onClick={() => toggleSet(set.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-left transition-all ${isEnabled
                        ? 'bg-indigo-500/10 border-indigo-500/40 text-white shadow-lg shadow-indigo-500/10'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                  >
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${isEnabled
                          ? 'bg-indigo-500 border-indigo-500'
                          : 'border-slate-600'
                        }`}
                    >
                      {isEnabled && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm font-medium">{set.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Strength Indicator */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">Strength</span>
              <span className={`text-sm font-semibold ${strengthInfo.color}`}>
                {strengthInfo.label}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${strengthInfo.bar} rounded-full transition-all duration-500 ease-out`}
                style={{ width: strengthInfo.width }}
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/30 cursor-pointer hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Generate Password
          </button>
        </div>

        <footer className="py-5 text-center">
          <p className="text-sm text-gray-100">
            Made with{" "}
            <span className="text-red-500 inline-block animate-pulse">❤️</span>{" "}
            by <span className="font-semibold text-gray-50">Muhammad Abbas</span>
          </p>
        </footer>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 shadow-xl">
              <span className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
              <span className="text-sm text-slate-300">{toast.message}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App