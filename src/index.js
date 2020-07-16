import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { App } from './app';
import { version } from '../package.json';

if (process.env.mode === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: `language-power@${version}`
  });
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
