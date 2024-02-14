import { createFileRoute } from "@tanstack/react-router";
import CardGroup from "@/components/CardGroup";

const Search: React.FC = () => {
    const data = Route.useLoaderData();

    return (
        <CardGroup title={data.title}></CardGroup>
    );
}

const ErrorComponent = () => {
    return (
        <CardGroup title="No Results"></CardGroup>
    );
}

export const Route = createFileRoute("/_authenticated/_root/search")({
    component: Search,
    errorComponent: ErrorComponent,
    validateSearch: (e: unknown): { q: string } => {
        if (typeof e === "object" && e !== null && "q" in e && typeof e.q === "string" && e.q.length > 1) {
            return { q: e.q }
        }
        throw new Error("Failed to validate query");
    },
    loaderDeps: ({ search: { q } }) => ({ q }),
    loader: async ({ deps }) => {
        console.log(deps);
        return {
            title: "No Results where found"
        }
    },
    onLeave() {
        window.dispatchEvent(new CustomEvent("event-leave-search"));
    }
});