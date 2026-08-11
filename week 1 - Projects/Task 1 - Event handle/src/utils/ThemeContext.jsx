import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [light, setLight] = useState(() => {
    const saved = localStorage.getItem("eventify_theme")
    return saved === "light"
  })

  useEffect(() => {
    localStorage.setItem("eventify_theme", light ? "light" : "dark")
  }, [light])

  function toggleTheme() {
    setLight((prev) => !prev)
  }

  return (
    <ThemeContext.Provider value={{ light, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}