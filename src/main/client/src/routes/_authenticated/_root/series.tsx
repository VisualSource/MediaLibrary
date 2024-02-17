import { createFileRoute } from "@tanstack/react-router";
import emitSearchPlaceholder from "@event/emitSearchPlaceholder";
import useMediaQuery from "@hook/useMediaQuery";
import useBookmarks from "@hook/useBookmarks";
import Card, { CardContent } from "@ui/Card";
import { MediaItem } from "@lib/types";
import CardGroup from "@ui/CardGroup";

const QUERY_SERIES = "SERIES";

const Series: React.FC = () => {
    const bookmarks = useBookmarks();
    const tvSeries = useMediaQuery<MediaItem[]>({
        queryKey: [QUERY_SERIES],
        searchParams: "?type=series"
    });

    return (
        <CardGroup title="Tv Series" className="md:pt-6">
            {tvSeries.isLoading ? (<></>) :
                tvSeries.isError ? (<></>) :
                    tvSeries.data?.map(e => (
                        <Card key={e.uuid} id={e.uuid} bookmarked={bookmarks.data?.findIndex(b => b.media.uuid === e.uuid) !== -1} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                            <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                        </Card>
                    ))}
        </CardGroup>
    );
}

export const Route = createFileRoute("/_authenticated/_root/series")({
    component: Series,
    onEnter() {
        emitSearchPlaceholder("Search TV series");
    }
});