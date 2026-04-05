import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'aos/dist/aos.css'
import './styles/global.css'
import './styles/page-hero.css'

import AOS from 'aos'

AOS.init({
  duration: 600,
  offset: 80,
  once: true,
  easing: 'ease-out-cubic',
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
