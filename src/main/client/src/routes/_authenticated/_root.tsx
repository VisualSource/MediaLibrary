import { Outlet, createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import NotFound from "@/components/NotFound";
import Search from "@/components/Search";
import PageError from "@/components/PageError";

const Root: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex flex-col lg:flex-row h-full overflow-x-hidden">
            <Navbar />
            <div className="h-full w-full flex flex-col overflow-x-hidden">
                <Search />
                <main className="flex flex-col w-full h-full">
                    {children}
                </main>
            </div>
        </div>
    );
}

export const Route = createFileRoute("/_authenticated/_root")({
    component: () => (
        <Root>
            <Outlet />
        </Root>
    ),
    errorComponent: (e) => {
        return (
            <Root>
                <PageError {...e} />
            </Root>
        );
    },
    notFoundComponent: () => {
        return (
            <Root>
                <NotFound />
            </Root>
        );
    }
});