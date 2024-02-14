import Button from "@/components/Button";
import { createLazyFileRoute } from "@tanstack/react-router";

const Logout: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-none h-full">
            <div className="bg-slate-900 hidden md:block relative">
                <h2 className="absolute top-4 left-4">Media Library</h2>
                <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1679041006302-cf5e318da08c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="background" />
            </div>

            <div className="flex flex-col justify-center items-center relative h-full space-y-6">
                <h1 className="text-2xl font-semibold tracking-tight">Click to logout</h1>

                <form className="flex flex-col space-y-6 w-1/4" method="post" action={`${import.meta.env.VITE_API_BASE_URL}/logout`}>
                    <Button className="bg-neutral-50 text-neutral-950 hover:bg-neutral-50/90 h-10 px-4 py-2" type="submit">Logout</Button>
                </form>
            </div>
        </div>
    );
}

export const Route = createLazyFileRoute("/logout")({
    component: Logout
});