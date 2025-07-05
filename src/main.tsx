import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Countdown from './Countdown.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Countdown targetDate={"2027-06-05T00:00:00"} />
  </StrictMode>,
)
