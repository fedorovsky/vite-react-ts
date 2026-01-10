import ReactDOM from 'react-dom/client';
import { Provider, ReactReduxContext } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '@/core/store/store.ts';
import App from './App.tsx';

if (process.env.NODE_ENV === 'development') {
  import('react-scan').then(({ scan }) => {
    scan();
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store} context={ReactReduxContext}>
    <ThemeProvider theme={{}}>
      <App />
    </ThemeProvider>
  </Provider>,
);
