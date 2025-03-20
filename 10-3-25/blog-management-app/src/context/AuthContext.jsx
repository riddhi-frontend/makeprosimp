import React, { createContext, useState } from 'react'
import Alert from '../Components/Alert'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })

    const [alert, setAlert] = useState({ message: '', type: '' }) // State for managing alert

    // Login function that checks for correct credentials (mock login)
    const login = (username, password) => {
        const hardcodedUsername = 'admin'
        const hardcodedPassword = '123456'

        if (username === hardcodedUsername && password === hardcodedPassword) {
            const loggedInUser = { username, role: 'admin', id: 1 }
            localStorage.setItem('user', JSON.stringify(loggedInUser)) // Save user to localStorage
            setUser(loggedInUser) // Set user in context
            setAlert({ message: 'Login successful!', type: 'success' }) // Display success alert
        } else {
            setAlert({ message: 'Invalid credentials', type: 'error' }) // Display error alert
        }
    }

    // Logout function that clears the user from context and localStorage
    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        setAlert({ message: 'Logout successful!', type: 'success' }) // Display success alert
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
            {/* Render Alert Component */}
            <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />
        </AuthContext.Provider>
    )
}
