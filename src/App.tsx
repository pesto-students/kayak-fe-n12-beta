import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Suspense } from 'react';
import { BrowserRouter, Outlet, Routes } from 'react-router-dom';
import AppRoutes from './common/AppRoutes';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoadingSpinner from './components/LoadingSpinner';
import SnackbarProvider from './components/Snackbar/SnackbarProvider';
import Sticky from './components/Sticky/Sticky';
import VerifyProfileMessage from './components/VerifyProfileMessage';
import UserContextProvider from './context/UserContextProvider';
import theme from './styles/styles';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <CssBaseline />
            <Sticky fixedOn={0}>
              <Header />
            </Sticky>
            <VerifyProfileMessage />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>{AppRoutes}</Routes>
            </Suspense>
            <Outlet />
            <Footer />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
