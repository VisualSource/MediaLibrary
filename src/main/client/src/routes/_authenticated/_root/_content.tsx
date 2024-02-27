import NotFound from '@/components/NotFound';
import Search from '@/components/Search';
import { Outlet, createFileRoute } from '@tanstack/react-router'
import React from 'react';

const RouteComponent: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className="h-full w-full flex flex-col overflow-x-hidden">
            <Search />
            <main className="flex flex-col w-full h-full">
                {children}
            </main>
        </div>
    );
}

export const Route = createFileRoute('/_authenticated/_root/_content')({
    component: () => (
        <RouteComponent>
            <Outlet />
        </RouteComponent>
    ),
    notFoundComponent: () => (
        <RouteComponent>
            <NotFound />
        </RouteComponent>
    )
})