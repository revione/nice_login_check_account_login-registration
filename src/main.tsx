import React from 'react'
import ReactDOM from 'react-dom/client'

import './css/reset.css'
import './css/init.css'
import './css/light.css'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
