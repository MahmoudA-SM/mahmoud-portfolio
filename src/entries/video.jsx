import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../fonts'
import '../styles.css'
import Video from '../pages/Video.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Video />
  </StrictMode>,
)
