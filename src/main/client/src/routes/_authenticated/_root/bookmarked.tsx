import { createFileRoute } from "@tanstack/react-router";
import emitSearchPlaceholder from "@event/emitSearchPlaceholder";
import useMediaQuery from "@hook/useMediaQuery";
import Card, { CardContent } from "@ui/Card";
import type { MediaItem } from "@lib/types";
import { useAuth } from "@hook/useAuth";
import CardGroup from "@ui/CardGroup";

const QUERY_BOOKMARKED_MOVIES = "BOOKMARKED_MOVIES";
const QUERY_BOOKMARKED_SERIES = "BOOKMARKED_SERIES";

const Bookmarked: React.FC = () => {
    const auth = useAuth();

    const bookmarkedMovies = useMediaQuery<MediaItem[]>({
        queryKey: [QUERY_BOOKMARKED_MOVIES, auth.user.data?.jwt_id],
        enabled: !(auth.user.isLoading || auth.user.isError),
        searchParams: "?bookmarked=true&type=movie"
    });

    const bookmarkedTvSeries = useMediaQuery<MediaItem[]>({
        queryKey: [QUERY_BOOKMARKED_SERIES, auth.user.data?.jwt_id],
        enabled: !(auth.user.isLoading || auth.user.isError),
        searchParams: "?bookmarked=true&type=series"
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
        emitSearchPlaceholder("Search bookmarked Movies and TV series");
    }
});