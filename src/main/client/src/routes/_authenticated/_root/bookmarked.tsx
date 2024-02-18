import { createFileRoute } from "@tanstack/react-router";
import CardSkeletion from "@/components/ui/CardSkeletion";
import emitSearchParams from "@event/emitSearchParams";
import useMediaQuery from "@hook/useMediaQuery";
import Card, { CardContent } from "@ui/Card";
import type { MediaItem } from "@lib/types";
import CardGroup from "@ui/CardGroup";
import useAuth from "@hook/useAuth";

const QUERY_BOOKMARKED_MOVIES = "BOOKMARKED_MOVIES";
const QUERY_BOOKMARKED_SERIES = "BOOKMARKED_SERIES";

const Bookmarked: React.FC = () => {
    const auth = useAuth();

    const bookmarkedMovies = useMediaQuery<MediaItem[]>({
        queryKey: [QUERY_BOOKMARKED_MOVIES, auth.user?.jwtId],
        searchParams: "?bookmarked=true&type=movie"
    });

    const bookmarkedTvSeries = useMediaQuery<MediaItem[]>({
        queryKey: [QUERY_BOOKMARKED_SERIES, auth.user?.jwtId],
        searchParams: "?bookmarked=true&type=series"
    });

    return (
        <>
            <CardGroup title="Bookmarked Movies">
                {bookmarkedMovies.isLoading ? (
                    <>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <CardSkeletion key={i} />
                        ))}
                    </>
                ) : bookmarkedMovies.isError ? (
                    <div className="w-full h-[10.9rem] md:h-[12.5rem] lg:h-56 flex flex-col justify-center items-center p-2">
                        <h1 className="text-xl mb-2 font-bold">Oops!</h1>
                        <p className="text-sm mb-2">Was unable to load watched.</p>
                        {import.meta.env.DEV ? (
                            <p className="text-neutral-400 text-xs">
                                <i>{bookmarkedMovies.error?.message}</i>
                            </p>
                        ) : null}
                    </div>
                ) : bookmarkedMovies.data?.map(e => (
                    <Card key={e.uuid} id={e.uuid} bookmarked={true} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                        <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                    </Card>
                ))}
            </CardGroup>
            <CardGroup title="Bookmarked Tv Series" className="md:pt-6">
                {bookmarkedTvSeries.isLoading ? (
                    <>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <CardSkeletion key={i} />
                        ))}
                    </>
                ) : bookmarkedTvSeries.isError ? (
                    <div className="w-full h-[10.9rem] md:h-[12.5rem] lg:h-56 flex flex-col justify-center items-center p-2">
                        <h1 className="text-xl mb-2 font-bold">Oops!</h1>
                        <p className="text-sm mb-2">Was unable to load watched.</p>
                        {import.meta.env.DEV ? (
                            <p className="text-neutral-400 text-xs">
                                <i>{bookmarkedTvSeries.error?.message}</i>
                            </p>
                        ) : null}
                    </div>
                ) : bookmarkedTvSeries.data?.map(e => (
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
        emitSearchParams("Search bookmarked Movies and TV series", undefined, true);
    }
});