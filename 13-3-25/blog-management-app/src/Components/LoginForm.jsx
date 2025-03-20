import React, { useState } from 'react'  // Importing React and the useState hook

// Define the LoginForm component. It receives two props: 'setShowLoginForm' to control the visibility of the form, and 'login' which is a function passed from a parent to handle the login logic.
const LoginForm = ({ setShowLoginForm, login }) => {
    // State hooks to store the username and password entered by the user
    const [username, setUsername] = useState('')  
    const [password, setPassword] = useState('')

    // Handle form submission for login
    const handleSubmit = (e) => {
        e.preventDefault()  // Prevents the default form submission (page reload)
        login(username, password)  // Call the 'login' function passed via props with username and password
        setShowLoginForm(false)  // Hide the login form by setting 'setShowLoginForm' to false
    }

    return (
        <div className="login">
        <div className="login-form">
            <h2>Login</h2>  {/* Title of the login form */}
            <form onSubmit={handleSubmit}>  {/* Form submission triggers the handleSubmit function */}
                {/* Input for username */}
                <input
                    type="text"
                    placeholder="Username"  // Placeholder text for the input
                    value={username}  // Value is controlled by the 'username' state
                    onChange={(e) => setUsername(e.target.value)}  // Update state on input change
                />
                {/* Input for password */}
                <input
                    type="password"  // Password field type hides the input text
                    placeholder="Password"  // Placeholder text for the input
                    value={password}  // Value is controlled by the 'password' state
                    onChange={(e) => setPassword(e.target.value)}  // Update state on input change
                />
                <button type="submit">Login</button>  {/* Submit button to trigger the form submission */}
                <button 
                    type="button"  // This button doesn't submit the form
                    className="close-btn"  // Custom class for styling the close button
                    onClick={() => setShowLoginForm(false)}  // Closes the form when clicked
                >
                    Close
                </button>
            </form>
        </div>
        </div>
    )
}

export default LoginForm