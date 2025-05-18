import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { HotelProvider } from './context/HotelContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { CustomThemeProvider } from './context/ThemeContext.jsx';
import { BookingProvider } from './context/BookingContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CustomThemeProvider>
    <AuthProvider>
      <BookingProvider>
      <HotelProvider>
        <UserProvider>
    <App />
    </UserProvider>
    </HotelProvider>
    </BookingProvider>
  </AuthProvider>
  </CustomThemeProvider>
  </StrictMode>,
)
