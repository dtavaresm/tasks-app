import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '1.2rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
    },
  },
  palette: {
    primary: {
      main: '#290679',
      dark: '#151515',
    },
    secondary: {
      main: '#630679',
    },
    error: {
      main: '#FF0000',
    }
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
