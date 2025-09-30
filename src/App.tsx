import { Box, Container, Typography } from '@mui/material';
import {Outlet} from 'react-router-dom';
import Menu from './components/Menu';

function App() {
  return (
    <Container>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: "1fr",
          sm: "0.2fr 1fr"
        },
        gap: 2
      }}>
        <Menu />
        <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h1" sx={{ fontWeight: '700', color: 'primary.dark', mb: 3, mt: 1 }}>
            Task Manager
          </Typography>
          <Outlet />
        </Box>
      </Box>
    </Container>
  )
}

export default App
