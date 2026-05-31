import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';

if (process.env.NODE_ENV === 'development') {
  import('react-scan').then(({ scan }) => {
    scan();
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={{}}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
