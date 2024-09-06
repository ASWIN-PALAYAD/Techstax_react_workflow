import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ReactFlowProvider } from '@xyflow/react'
import { DnDProvider } from './context/DnDContex.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <ReactFlowProvider>
    <DnDProvider>
    <App />
    </DnDProvider>
    </ReactFlowProvider>
    </AuthContextProvider>
  </StrictMode>,
)
