import Avatar from "@/components/ui/Avatar";
import useAuth from "@/hooks/useAuth";
import { Link, createFileRoute } from "@tanstack/react-router";

const Account: React.FC = () => {
    const auth = useAuth();

    return (
        <div className="flex flex-col items-center justify-center p-2 w-full h-full relative">

            <Link className="absolute top-4 right-4 h-9 rounded-md px-3 hover:bg-neutral-700/50 hover:text-neutral-50 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" to="/signup">Logout</Link>
            <div>

            </div>

            <Avatar className="h-36 w-36" url={auth.user?.avatar} />
            <div className="flex flex-col items-center p-2">
                <h1 className="font-bold text-xl">{auth.user?.username}</h1>
                <p className="text-neutral-600 text-sm leading-4 tracking-tight">{auth.user?.email}</p>
            </div>

        </div>
    );
}

export const Route = createFileRoute("/_authenticated/_root/account")({
    component: Account
});