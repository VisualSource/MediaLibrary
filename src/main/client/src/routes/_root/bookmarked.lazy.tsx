import { createLazyFileRoute } from "@tanstack/react-router";

const Bookmarked: React.FC = () => {
    return (
        <div>
            <h3 className="font-bold">Bookmarked</h3>
        </div>
    );
}

export const Route = createLazyFileRoute("/_root/bookmarked")({
    component: Bookmarked
});