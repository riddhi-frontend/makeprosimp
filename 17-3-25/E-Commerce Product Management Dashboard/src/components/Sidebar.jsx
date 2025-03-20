import React, { useState, useEffect } from 'react'
import { FaPlusSquare, FaPowerOff, FaAffiliatetheme } from 'react-icons/fa'
import { MdOutlineDashboard, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')  // Initialize theme state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeAllSubMenus = () => {
    const allSubMenus = document.querySelectorAll('.sub-menu-show')
    allSubMenus.forEach((menu) => {
      menu.classList.remove('show')
      menu.previousElementSibling.classList.remove('rotate')
    })
  }

  const toggleSubMenu = (button) => {
    if (!button.nextElementSibling.classList.contains('show')) {
      closeAllSubMenus()
    }
    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')

    if (isSidebarOpen) {
      setIsSidebarOpen(false)
    }
  }

  useEffect(() => {
    // Apply the current theme class to the body
    document.body.className = theme
    localStorage.setItem('theme', theme) // Save the theme in localStorage
  }, [theme])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    window.location.href = '/'
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <nav className={`sidebar ${isSidebarOpen ? '' : 'close'}`}>
      <button id='toggle-btn' onClick={toggleSidebar}><MdOutlineKeyboardDoubleArrowLeft /></button>
      <ul>
        <li><NavLink className='icon' activeClassName="active" to="/"><MdOutlineDashboard size={24} className='svg' /><span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Dashboard</span></NavLink></li>
        <li><NavLink className='icon' activeClassName="active" to="/add-product"><FaPlusSquare size={24} className='svg' /><span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Add Product</span></NavLink></li>
        {/* <li><Link className='icon' to="/profile"><MdManageAccounts size={24} className='svg' /><span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Manage Profile</span></Link></li> */}
        <li className='icons' onClick={toggleTheme}><FaAffiliatetheme size={24} className='svg' /><span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Change Theme</span></li>
        <li className='icons' onClick={handleLogout}><FaPowerOff size={24} className='svg' /><span className={`label ${isSidebarOpen ? '' : 'hidden'}`}>Logout</span></li>
      </ul>
    </nav>
  )
}

export default Sidebar
