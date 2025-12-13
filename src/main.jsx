import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './contexts/UserContext.jsx'
import { NavHistoryProvider } from './contexts/NavHistoryContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <NavHistoryProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </NavHistoryProvider>
    </BrowserRouter>
  </StrictMode>,
)