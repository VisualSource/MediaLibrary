import { createLazyFileRoute } from "@tanstack/react-router";

const Movies: React.FC = () => {
    return (
        <div>
            <h3 className="font-bold">Welcome</h3>
        </div>
    );
}

export const Route = createLazyFileRoute("/_authenticated/_root/movies")({
    component: Movies
});