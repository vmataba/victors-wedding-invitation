import { Routes, Route, Navigate, useSearchParams, useNavigate, BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import InvitationCard from './components/InvitationCard';
import VerificationSystem from './components/VerificationSystem';
import { useEffect } from 'react';

// Create Material Design theme with custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8b9ff5',
      dark: '#4c5fd4',
    },
    secondary: {
      main: '#764ba2',
      light: '#9168b8',
      dark: '#5a3a7d',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const AppWrapper = (props: any) => {
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path') ?? null;
  const navigate = useNavigate();
  useEffect(() => {
    if (path) {
      navigate(path);
    }
  });
  return <>{props.children}</>
}

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename='/victors-wedding-invitation'>
         <AppWrapper>
          <Routes>
            <Route path="/" element={<Navigate to="/verify" replace />} />
            <Route path="/verify" element={<VerificationSystem />} />
            <Route path="/:guestIdentifier" element={<InvitationCard />} />
            <Route path="*" element={<Navigate to="/verify" replace />} />
          </Routes>
          </AppWrapper>
        </BrowserRouter>
      </ThemeProvider>
    
  );
}

export default App;
