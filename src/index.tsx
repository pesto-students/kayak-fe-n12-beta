import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';

// Sentry.init({
//   dsn: 'https://119be965f4964264b177c6a12023f154@o1104768.ingest.sentry.io/6132114',
//   integrations: [new Integrations.BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 0.0
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
