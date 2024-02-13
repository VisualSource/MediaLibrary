import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root")({
    component: () => {
        return (
            <div className="flex flex-col lg:flex-row h-full bg-neutral-950 text-neutral-50">
                <Navbar />
                <div className="h-full w-full flex flex-col gap-10 lg:pt-8">
                    <Search />
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        );
    }
});