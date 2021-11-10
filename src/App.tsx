import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';
import GlobalStyles from './styles/GlobalStyle';
import theme from './styles/theme';
import Routes from './routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <AuthProvider>
            <GlobalStyles />
            <Routes />
            <ToastContainer autoClose={3000} className="toast-container" />
          </AuthProvider>
        </LoadingProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
