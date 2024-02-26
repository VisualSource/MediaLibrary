import { createFileRoute } from "@tanstack/react-router";
import CardSkeletion from "@/components/ui/CardSkeletion";
import emitSearchParams from "@event/emitSearchParams";
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
        searchParams: "?type=movie",
    });

    return (
        <CardGroup title="Movies">
            {movies.isLoading || bookmarks.isLoading ? (
                <>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <CardSkeletion key={i} />
                    ))}
                </>
            ) : movies.isError || bookmarks.isError ? (
                <div className="w-full h-[10.9rem] md:h-[12.5rem] lg:h-56 flex flex-col justify-center items-center p-2">
                    <h1 className="text-xl mb-2 font-bold">Oops!</h1>
                    <p className="text-sm mb-2">Was unable to load watched.</p>
                    {import.meta.env.DEV ? (
                        <p className="text-neutral-400 text-xs">
                            <i>{movies.error?.message || bookmarks.error?.message}</i>
                        </p>
                    ) : null}
                </div>

            ) : movies.data?.map(e => (
                <Card type={e.mediaType} key={e.uuid} id={e.uuid} bookmarked={bookmarks.data?.findIndex(b => b.media.uuid === e.uuid) !== -1} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                </Card>
            ))}
        </CardGroup>
    );
}

export const Route = createFileRoute("/_authenticated/_root/movies")({
    component: Movies,
    onEnter() {
        emitSearchParams("Search Movies", "movie");
    }
});