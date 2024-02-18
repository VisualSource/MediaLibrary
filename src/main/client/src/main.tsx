import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';

import AuthProvider from "@component/AuthProvider";
import { queryClient } from '@/lib/queryClient';
import { routeTree } from './routeTree.gen';
import { auth } from "@auth/context";

const router = createRouter({
  routeTree,
  context: {
    auth
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider value={auth}>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
