import { createLazyFileRoute } from "@tanstack/react-router";

const Logout: React.FC = () => {
    return (
        <div>
            <form method="post" action={`${import.meta.env.VITE_API_BASE_URL}/logout`}>
                <button type="submit">Signout</button>
            </form>
        </div>
    );
}

export const Route = createLazyFileRoute("/logout")({
    component: Logout
});