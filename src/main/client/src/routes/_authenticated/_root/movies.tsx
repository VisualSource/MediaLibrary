import { createFileRoute } from "@tanstack/react-router";
import emitSearchPlaceholder from "@event/emitSearchPlaceholder";
import useMediaQuery from "@/hooks/useMediaQuery";
import useBookmarks from "@/hooks/useBookmarks";
import Card, { CardContent } from "@ui/Card";
import { MediaItem } from "@lib/types";
import CardGroup from "@ui/CardGroup";

const QUERY_MOVIES = "MOVIES";

const Movies: React.FC = () => {
    const bookmarks = useBookmarks();
    const movies = useMediaQuery<MediaItem[]>({
        queryKey: [QUERY_MOVIES],
        searchParams: "?type=movie"
    });

    return (
        <CardGroup title="Movies">
            {movies.isLoading || bookmarks.isLoading ? (<></>) :
                movies.isError || bookmarks.isError ? (<></>) :
                    movies.data?.map(e => (
                        <Card key={e.uuid} id={e.uuid} bookmarked={bookmarks.data?.findIndex(b => b.media.uuid === e.uuid) !== -1} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                            <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                        </Card>
                    ))}
        </CardGroup>
    );
}

export const Route = createFileRoute("/_authenticated/_root/movies")({
    component: Movies,
    onEnter() {
        emitSearchPlaceholder("Search Movies");
    }
});