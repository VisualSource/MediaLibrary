import Button from "@/components/Button";
import Input from "@/components/Input";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

/*
 Setup X-XSRF-TOKEN
    get token form cookie XSRF-TOKEN

*/

const SignUp: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-none h-full">
            <div className="bg-slate-900 hidden md:block relative">
                <h2 className="absolute top-4 left-4">Media Library</h2>
                <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1679041006302-cf5e318da08c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="background" />
            </div>

            <div className="flex flex-col justify-center items-center relative h-full space-y-6">
                <Link className="absolute top-4 right-4 h-9 rounded-md px-3 hover:bg-neutral-700/50 hover:text-neutral-50 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" to="/login">Login</Link>
                <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>

                <form className="flex flex-col space-y-6 w-1/4" method="post" action={`${import.meta.env.VITE_API_BASE_URL}/signup`}>
                    <Input className="border border-neutral-500" type="text" placeholder="username" />
                    <Input className="border border-neutral-500" type="email" placeholder="email@example.com" />
                    <Input className="border border-neutral-500" type="password" placeholder="password" />
                    <Button className="bg-neutral-50 text-neutral-950 hover:bg-neutral-50/90 h-10 px-4 py-2" type="submit">Create Account</Button>
                </form>
            </div>
        </div>
    );
}

export const Route = createLazyFileRoute("/signup")({
    component: SignUp
});