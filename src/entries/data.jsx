import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts'
import '../styles.css'
import Data from '../pages/Data.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Data />
  </StrictMode>,
)
