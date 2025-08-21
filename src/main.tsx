import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AccessTokenProvider } from './contexts/AccessTokenContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessTokenProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AccessTokenProvider>
  </StrictMode>,
)