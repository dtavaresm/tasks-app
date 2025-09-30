import { Box, Container, Typography } from '@mui/material';
import TasksPage from './components/TasksPage';
import Menu from './components/Menu';

function App() {
  return (
    <Container>
      <Typography variant="h1" sx={{ fontWeight: '900', textAlign: 'center', color: 'primary.dark', my: 1 }}>
        New App
      </Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: "1fr",
          sm: "0.2fr 1fr"
        },
        gap: 2
      }}>
        <Menu />
        <TasksPage />
      </Box>
    </Container>
  )
}

export default App
