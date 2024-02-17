import Card, { CardContent } from "@/components/Card";
import CardGroup from "@/components/CardGroup";
import { useAuth } from "@/hooks/useAuth";
import { getSessionToken } from "@/lib/getSessionToken";
import { MediaItem } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const Movies: React.FC = () => {
    const auth = useAuth();
    const movies = useQuery({
        queryKey: ["MOVIES"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media?type=movie`, {
                headers: {
                    "Authorization": `Bearer ${getSessionToken()}`
                }
            });
            if (!response.ok) throw response;
            return response.json() as Promise<MediaItem[]>;
        }
    });
    return (
        <CardGroup title="Movies">
            {movies.isLoading ? (<></>) :
                movies.isError ? (<></>) :
                    movies.data?.map(e => (
                        <Card query={["MOVIES"]} key={e.uuid} id={e.uuid} bookmarked={e.bookmarks.findIndex(e => e.owner.jwt_id === auth.user.data?.jwt_id) !== -1} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                            <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                        </Card>
                    ))}
        </CardGroup>
    );
}

export const Route = createFileRoute("/_authenticated/_root/movies")({
    component: Movies,
    onEnter() {
        window.dispatchEvent(new CustomEvent("event-set-search-placeholder", { detail: { value: "Search Movies" } }));
    }
});