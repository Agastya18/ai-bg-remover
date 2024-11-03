// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import AppContextProvider from './context/AppContext.tsx'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
   <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
   <AppContextProvider>
   <App />
   </AppContextProvider>
     
    </ClerkProvider>
  </BrowserRouter>,
)
