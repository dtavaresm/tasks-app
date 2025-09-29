import { Container, Typography } from '@mui/material';
import TasksPage from './components/TasksPage';

function App() {
  return (
    <Container>
      <Typography variant="h1" sx={{ fontWeight: '900', textAlign: 'center', color: 'primary.dark', my: 4 }}>
        New App
      </Typography>
      <TasksPage />
    </Container>
  )
}

export default App
