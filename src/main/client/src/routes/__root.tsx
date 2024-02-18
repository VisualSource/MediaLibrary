import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import type { AuthContext } from '@auth/context';
import PageError from '@/components/PageError';
import NotFound from '@/components/NotFound';

type Context = {
    auth: AuthContext
}

export const Route = createRootRouteWithContext<Context>()({
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