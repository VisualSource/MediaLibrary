import { createFileRoute } from "@tanstack/react-router";
import emitSearchParams from "@event/emitSearchParams";
import useMediaQuery from "@hook/useMediaQuery";
import useBookmarks from "@hook/useBookmarks";
import Card, { CardContent } from "@ui/Card";
import { MediaItem } from "@lib/types";
import CardGroup from "@ui/CardGroup";
import CardSkeletion from "@/components/ui/CardSkeletion";

const QUERY_SERIES = "SERIES";

const Series: React.FC = () => {
    const bookmarks = useBookmarks();
    const tvSeries = useMediaQuery<MediaItem[]>({
        queryKey: [QUERY_SERIES],
        searchParams: "?type=series"
    });

    return (
        <CardGroup title="Tv Series" className="md:pt-6">
            {tvSeries.isLoading || bookmarks.isLoading ? (
                <>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <CardSkeletion key={i} />
                    ))}
                </>
            ) : tvSeries.isError || bookmarks.isError ? (
                <div className="w-full h-[10.9rem] md:h-[12.5rem] lg:h-56 flex flex-col justify-center items-center p-2">
                    <h1 className="text-xl mb-2 font-bold">Oops!</h1>
                    <p className="text-sm mb-2">Was unable to load watched.</p>
                    {import.meta.env.DEV ? (
                        <p className="text-neutral-400 text-xs">
                            <i>{tvSeries.error?.message || bookmarks.error?.message}</i>
                        </p>
                    ) : null}
                </div>
            ) : tvSeries.data?.map(e => (
                <Card type={e.mediaType} key={e.uuid} id={e.uuid} bookmarked={bookmarks.data?.findIndex(b => b.media.uuid === e.uuid) !== -1} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                </Card>
            ))}
        </CardGroup>
    );
}

export const Route = createFileRoute("/_authenticated/_root/series")({
    component: Series,
    onEnter() {
        emitSearchParams("Search TV series", "series");
    },
});