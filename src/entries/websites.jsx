import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts'
import '../styles.css'
import Websites from '../pages/Websites.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Websites />
  </StrictMode>,
)
