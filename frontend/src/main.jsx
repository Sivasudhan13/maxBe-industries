import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import App from './App.jsx'
import './index.css'

// ── Configure axios base URL ──────────────────────────────────────────────────
// In development: Vite proxy forwards /api → localhost:5000
// In production:  call the Render backend directly
if (import.meta.env.PROD) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://maxbe-industries.onrender.com'
}
// In dev, baseURL stays empty so Vite's proxy handles /api/*

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              borderRadius: '12px',
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
