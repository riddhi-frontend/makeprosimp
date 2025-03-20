import React, { useEffect } from 'react'

const Alert = ({ message, onClose, type }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose() // Hide the alert after 3 seconds
        }, 3000)

        return () => clearTimeout(timer) // Cleanup the timer when component unmounts
    }, [message, onClose])

    if (!message) return null // Don't render anything if there is no message

    const alertClass = type === 'success' ? 'alert-success' : 'alert-error'

    return (
        <div className={`alert ${alertClass}`}>
            {message}
        </div>
    )
}

export default Alert
