import useAuth from "@/hooks/useAuth";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import React from "react";

const RouteComponent: React.FC = () => {
    const auth = useAuth();
    return (
        <div className="h-full w-full flex flex-col overflow-x-hidden">
            <div className='flex flex-col gap-2 pl-6 py-6 md:py-4 lg:pt-12 lg:px-2 border-b mr-6'>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p>Manage app and user account settings</p>
            </div>
            <main className="flex flex-col md:flex-row w-full h-full pt-6">
                <aside className="flex flex-col lg:w-1/6">
                    <Link activeProps={{ className: "bg-gray-600/50 hover:bg-gray-600" }} inactiveProps={{ className: "hover:bg-transparent hover:underline" }} className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-white h-9 px-4 py-2 justify-start" to="/account">Profile</Link>
                    {auth.hasRole("ROLE_ADMIN") ? (
                        <>
                            <Link activeProps={{ className: "bg-gray-600/50 hover:bg-gray-600" }} inactiveProps={{ className: "hover:bg-transparent hover:underline" }} className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-white h-9 px-4 py-2 justify-start" to="/upload">Upload Media</Link>
                        </>
                    ) : null}
                </aside>
                <div className="flex flex-col h-full w-full px-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export const Route = createFileRoute("/_authenticated/_root/_user")({
    component: RouteComponent
});


// edit user
// upload content
// app settings
