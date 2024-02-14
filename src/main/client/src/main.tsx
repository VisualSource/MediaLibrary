import { RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';

import { routeTree } from './routeTree.gen';
import AuthProvider from './components/AuthProvider';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider value={{ user: null, isAuthed: false }}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
