import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LoaderProvider } from './utils/context/LoaderContext.jsx'
import { UserProvider } from './utils/context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderProvider>
      <UserProvider>
      <App />
      </UserProvider>
    </LoaderProvider>
  </StrictMode>,
)
