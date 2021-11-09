import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

import GlobalStyles from './styles/GlobalStyle';
import Routes from './routes';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes />
        <ToastContainer autoClose={3000} className="toast-container" />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
