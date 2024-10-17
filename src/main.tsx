import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ReactReduxContext } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '@/core/store/store.ts';
import * as Sentry from '@sentry/react';
import App from './App.tsx';

Sentry.init({
  dsn: 'https://fed5bfefe8e2fe6fac6db5ae2ad9a0ad@o525885.ingest.us.sentry.io/4508137099034624',
  integrations: [
    Sentry.browserTracingIntegration(),
    // Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  // replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  // replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

Sentry.setUser({
  email: 'test@test.com',
  id: 7373,
  ip_address: '{{auto}}', // Позволяет Sentry автоматически определять IP-адрес
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} context={ReactReduxContext}>
      <ThemeProvider theme={{}}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
