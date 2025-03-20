import React, { useState } from "react"
import { Link } from "react-router-dom"
import ThemeToggleButton from "./ThemeToggleButton"
import { FaSearch, FaBars, FaTimes } from "react-icons/fa"

const Header = ({ user, logout, searchTerm, handleSearch, setShowLoginForm }) => {
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearchClick = () => {
    if (!isSearchActive) {
      setIsSearchActive(true)
    } else if (searchTerm.trim() === "") {
      setIsSearchActive(false)
    }
  }

  return (
    <header className="header">
      <div className="header-container">
        <h1>Blog Management</h1>
        {/* Navigation & Actions */}
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <div className="header-actions">
            {/* Search Bar */}
            <div className="search-container">
              <input type="text" placeholder="Search posts..." value={searchTerm} onChange={handleSearch} className={`search-bar ${isSearchActive ? "active" : ""}`}/>
              <button className="search-icon" onClick={handleSearchClick} aria-label="Search">
                <FaSearch />
              </button>
            </div>

            {/* Authentication & Actions */}
            <div className="auth-buttons">
              {user ? (
                <>
                  <button onClick={logout} className="btn-1">Logout</button>
                  <Link to="/create"><button className="btn-2">Create Post</button></Link>
                </>
              ) : (
                <button onClick={() => setShowLoginForm(true)} className="btn-3">Login</button>
              )}
            </div>

            {/* Theme Toggle Button (Keep this if needed) */}
            <ThemeToggleButton />
          </div>
        </nav>
        {/* Hamburger Menu for Mobile */}
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">{menuOpen ? <FaTimes /> : <FaBars />}</button>
      </div>
    </header>
  )
}

export default Header