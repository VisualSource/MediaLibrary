import Card, { CardContent } from "@/components/Card";
import CardGroup from "@/components/CardGroup";
import { useAuth } from "@/hooks/useAuth";
import { getSessionToken } from "@/lib/getSessionToken";
import { MediaItem } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const Bookmarked: React.FC = () => {
    const auth = useAuth();
    const bookmarkedMovies = useQuery({
        queryKey: ["BOOKMARKED_MOVIES", auth.user.data?.id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media?bookmarked=true&type=movie`, {
                headers: {
                    "Authorization": `Bearer ${getSessionToken()}`
                }
            });
            if (!response.ok) throw response;
            return response.json() as Promise<MediaItem[]>;
        },
        enabled: !(auth.user.isLoading || auth.user.isError)
    });

    const bookmarkedTvSeries = useQuery({
        queryKey: ["BOOKMARKED_SERIRS", auth.user.data?.id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media?bookmarked=true&type=series`, {
                headers: {
                    "Authorization": `Bearer ${getSessionToken()}`
                }
            });
            if (!response.ok) throw response;
            return response.json() as Promise<MediaItem[]>;
        },
        enabled: !(auth.user.isLoading || auth.user.isError)
    });


    return (
        <>
            <CardGroup title="Bookmarked Movies">
                {bookmarkedMovies.isLoading ? (<></>) :
                    bookmarkedMovies.isError ? (<></>) :
                        bookmarkedMovies.data?.map(e => (
                            <Card key={e.uuid} id={e.uuid} bookmarked={true} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                                <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                            </Card>
                        ))}
            </CardGroup>
            <CardGroup title="Bookmarked Tv Series" className="md:pt-6">
                {bookmarkedTvSeries.isLoading ? (<></>) :
                    bookmarkedTvSeries.isError ? (<></>) :
                        bookmarkedTvSeries.data?.map(e => (
                            <Card key={e.uuid} id={e.uuid} bookmarked={true} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                                <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                            </Card>
                        ))}
            </CardGroup>
        </>
    );
}

export const Route = createFileRoute("/_authenticated/_root/bookmarked")({
    component: Bookmarked,
    onEnter() {
        window.dispatchEvent(new CustomEvent("event-set-search-placeholder", { detail: { value: "Search bookmarked Movies and TV series" } }));
    }
});