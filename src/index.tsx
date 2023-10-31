import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import router from './rootRoute';

import './index.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

document.querySelector('body')?.setAttribute('data-theme', 'light');
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
