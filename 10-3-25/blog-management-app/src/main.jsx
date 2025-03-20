import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import './css/Darktheme.css'
import './css/media.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
// json-server --watch db.json --port 5000