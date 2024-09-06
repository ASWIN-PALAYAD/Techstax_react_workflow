import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ReactFlowProvider } from '@xyflow/react'
import { DnDProvider } from './context/DnDContex.jsx'
import { CookiesProvider, useCookies } from 'react-cookie'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactFlowProvider>
    <DnDProvider>
    <App />
    </DnDProvider>
    </ReactFlowProvider>
  </StrictMode>,
)
