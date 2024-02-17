import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import PageError from '@/components/PageError';
import NotFound from '@/components/NotFound';

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <ReactQueryDevtools position="bottom" />
            <TanStackRouterDevtools />
        </>
    ),
    notFoundComponent: NotFound,
    errorComponent: PageError
});