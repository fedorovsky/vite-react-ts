import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ReactReduxContext } from 'react-redux';
import { store } from '@/core/store/store.ts';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} context={ReactReduxContext}>
      <App />
    </Provider>
  </React.StrictMode>,
);
