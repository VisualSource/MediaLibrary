import { Link, createLazyFileRoute } from "@tanstack/react-router";

const Login: React.FC = () => {
    return (
        <div>
            <h1>Login</h1>
            <form method="post" action={`${import.meta.env.VITE_API_BASE_URL}/login`}>
                <input type="email" placeholder="email@example.com" />
                <input type="password" placeholder="password" />

                <button type="submit">Login</button>
            </form>

            <span>Don't have an account <Link className="text-blue-500" to="/signup">Sign up</Link></span>
        </div>
    );
}

export const Route = createLazyFileRoute("/login")({
    component: Login
});