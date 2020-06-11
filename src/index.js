import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { App } from './app';
import { version } from '../package.json';

if (process.env.mode === 'production') {
  Sentry.init({
    dsn:
      'https://371f46753ba249a386fd78bc0d11f3c3@o383682.ingest.sentry.io/5264916',
    release: `language-power@${version}`
  });
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
