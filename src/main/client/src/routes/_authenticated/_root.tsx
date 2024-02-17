import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { Outlet, createFileRoute } from "@tanstack/react-router";

const Root: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row h-full overflow-x-hidden">
            <Navbar />
            <div className="h-full w-full flex flex-col overflow-x-hidden">
                <Search />
                <main className="flex flex-col w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export const Route = createFileRoute("/_authenticated/_root")({
    component: Root
});