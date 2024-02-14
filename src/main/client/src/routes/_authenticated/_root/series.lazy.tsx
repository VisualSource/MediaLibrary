import { createLazyFileRoute } from "@tanstack/react-router";

const Series: React.FC = () => {
    return (
        <div>
            <h3 className="font-bold">Welcome</h3>
        </div>
    );
}

export const Route = createLazyFileRoute("/_authenticated/_root/series")({
    component: Series
});