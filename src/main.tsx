import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ReactReduxContext } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '@/core/store/store.ts';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} context={ReactReduxContext}>
      <ThemeProvider theme={{}}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
