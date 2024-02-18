import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import useAuth from "@/hooks/useAuth";
import Button from "@ui/Button";

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const { ctx } = useAuth();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-none h-full">
            <div className="bg-slate-900 hidden md:block relative">
                <h2 className="absolute top-4 left-4">Media Library</h2>
                <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1679041006302-cf5e318da08c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="background" />
            </div>

            <div className="flex flex-col justify-center items-center relative h-full space-y-6">
                <h1 className="text-2xl font-semibold tracking-tight">Click to logout</h1>

                <div className="flex flex-col space-y-6 w-1/4">
                    <Button className="bg-neutral-50 text-neutral-950 hover:bg-neutral-50/90 h-10 px-4 py-2" onClick={async () => {
                        await ctx.logout();
                        navigate({ to: "/login" });
                    }
                    }>Logout</Button>
                </div>
            </div>
        </div>
    );
}

export const Route = createLazyFileRoute("/logout")({
    component: Logout
});