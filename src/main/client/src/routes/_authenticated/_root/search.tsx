import { createFileRoute } from "@tanstack/react-router";
import CardGroup from "@/components/CardGroup";
import { getSessionToken } from "@/lib/getSessionToken";
import { MediaItem } from "@/lib/types";
import Card, { CardContent } from "@/components/Card";
import { useAuth } from "@/hooks/useAuth";

const Search: React.FC = () => {
    const auth = useAuth();
    const { title, data } = Route.useLoaderData();

    return (
        <CardGroup title={title}>
            {data.map(e => (
                <Card query={[]} key={e.uuid} id={e.uuid} bookmarked={e.bookmarks.findIndex(e => e.owner.jwt_id === auth.user.data?.jwt_id) !== -1} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                </Card>
            ))}
        </CardGroup>
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
    validateSearch: (e: unknown): { q: string, type: string | null; } => {
        if (typeof e === "object" && e !== null && "q" in e && typeof e.q === "string" && e.q.length > 1) {
            return { q: e.q, type: null }
        }
        throw new Error("Failed to validate query");
    },
    loaderDeps: ({ search: { q, type } }) => ({ q, type }),
    loader: async ({ deps }) => {

        const params = new URLSearchParams();
        params.set("q", deps.q);

        if (deps.type !== null) {
            params.set("type", deps.type);
        }

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/search?${params.toString()}`, {
            headers: {
                "Authorization": `Bearer ${getSessionToken()}`
            }
        });

        if (!response.ok) throw response;

        const results = await response.json() as MediaItem[];

        return {
            title: results.length >= 1 ? `Found ${results.length} result${results.length > 1 ? "s" : ""} for '${deps.q}'` : "No Results where found",
            data: results
        }
    },
    onLeave() {
        window.dispatchEvent(new CustomEvent("event-leave-search"));
    }
});