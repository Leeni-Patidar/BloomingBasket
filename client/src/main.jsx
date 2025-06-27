import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import Bootstrap JavaScript for interactive components
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Font Awesome for icons
import '@fortawesome/fontawesome-free/css/all.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
