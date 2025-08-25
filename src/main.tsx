import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AccessTokenProvider } from './contexts/AccessTokenContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './css/tailwind.css'
import './css/styles.css'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessTokenProvider>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <App />
        </HashRouter>
      </QueryClientProvider>
    </AccessTokenProvider>
  </StrictMode>,
)