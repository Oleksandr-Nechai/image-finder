import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { thema } from './constants/thema';
import { GlobalStyle } from './constants/globalStyle/globalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={thema}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
