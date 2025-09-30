import { Box, Container, Typography } from '@mui/material';
import {Outlet} from 'react-router-dom';
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
        <Outlet />
      </Box>
    </Container>
  )
}

export default App
