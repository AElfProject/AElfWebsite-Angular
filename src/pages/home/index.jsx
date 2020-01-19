/**
 * @file entry point
 * @author atom-yang
 */
import { hydrate, render } from 'react-dom';
import React from 'react';
import App from './App';

const rootElement = document.getElementById('app');
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
