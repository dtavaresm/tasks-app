import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Menu from './components/Menu';

const StyledGridedBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '0.2fr 1fr',
  }
}));

const StyledFlexedBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

const StyleTitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: '700',
  textAlign: 'center',
  color: theme.palette.primary.dark,
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(1)
}));

function App() {
  return (
    <Container>
      <StyleTitleTypography variant="h1">
        Task Manager
      </StyleTitleTypography>
      <StyledGridedBox>
        <Menu />
        <StyledFlexedBox>
          <Outlet />
        </StyledFlexedBox>
      </StyledGridedBox>
    </Container>
  )
}

export default App
