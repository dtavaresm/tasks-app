import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import App from './App.jsx'
import HomePage from './pages/HomePage.tsx';
import TasksPage from './pages/TasksPage.tsx';
import { Box, Button, createTheme, ThemeProvider, Typography } from '@mui/material'

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '1.2rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
  },
  palette: {
    primary: {
      main: '#0879AA',
      dark: '#272727',
      light: '#e6f5feff',
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Box>
        <Typography variant="h6">
          404 Page not found.
        </Typography>
        <Button component={Link} to="/" variant="outlined" sx={{ mt: 2 }}>
          Go Home
        </Button>
      </Box>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "tasks", element: <TasksPage /> },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
