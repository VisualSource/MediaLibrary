import { Link, createLazyFileRoute } from "@tanstack/react-router";

const SignUp: React.FC = () => {
    return (
        <div>
            <form method="post" action={`${import.meta.env.VITE_API_BASE_URL}/signup`}>
                <input type="text" placeholder="username" />
                <input type="email" placeholder="email@example.com" />

                <input type="password" placeholder="password" />

                <button type="submit">Submit</button>
            </form>

            <span>Have an account <Link className="text-blue-500" to="/login">Login</Link></span>
        </div>
    );
}

export const Route = createLazyFileRoute("/signup")({
    component: SignUp
});