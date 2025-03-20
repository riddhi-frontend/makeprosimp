import React, { useState, useEffect } from "react"
import { IoSunnySharp, IoMoon } from "react-icons/io5"

const ThemeToggleButton = () => {
  // Load theme from localStorage or default to "light"
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  )

  useEffect(() => {
    // Apply the theme correctly using data attribute
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light")
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  return (
    <button onClick={toggleTheme} className="btn-3">
      {isDarkMode ? <IoSunnySharp size={22} /> : <IoMoon size={20} />}
    </button>
  )
}

export default ThemeToggleButton