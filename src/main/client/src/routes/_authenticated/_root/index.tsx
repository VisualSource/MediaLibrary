import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import WideCardSkeletion from "@/components/ui/WideCardSkeletion";
import CardSkeletion from "@/components/ui/CardSkeletion";
import emitSearchParams from "@event/emitSearchParams";
import Card, { CardContent } from "@ui/Card";
import useBookmarks from "@hook/useBookmarks";
import { type MediaItem } from '@lib/types';
import CardGroup from "@ui/CardGroup";
import CardWide from "@ui/CardWide";
import useAuth from "@/hooks/useAuth";


const QUERY_RECOMMEDED = "RECOMMEDED";
const QUERY_WATCHED = "WATCHED";

const Index: React.FC = () => {
    const bookmarks = useBookmarks();
    const { ctx } = useAuth();
    const mediaWatched = useQuery({
        queryKey: [QUERY_WATCHED],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media/watched`);
            if (!response.ok) throw response;
            return response.json() as Promise<MediaItem[]>;
        },
        enabled: !ctx.isLoading && ctx.isAuthenticated()
    });

    const mediaRecommeded = useQuery({
        queryKey: [QUERY_RECOMMEDED],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media/recommeded`);
            if (!response.ok) throw response;
            return response.json() as Promise<MediaItem[]>;
        },
        enabled: !ctx.isLoading && ctx.isAuthenticated()
    });

    return (
        <>
            <section className="pl-6 lg:px-2 lg:pt-4">
                <h1 className="tracking-tight text-2xl lg:text-3xl pb-3 lg:pb-6">Trending</h1>
                <div className="flex gap-6 md:gap-9 overflow-x-scroll py-2">
                    {mediaWatched.isLoading || bookmarks.isLoading ? (
                        <>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <WideCardSkeletion key={i} />
                            ))}
                        </>
                    ) :
                        mediaWatched.isError || bookmarks.isError ? (
                            <div className="w-full h-[10.9rem] md:h-[12.5rem] lg:h-56 flex flex-col justify-center items-center p-2">
                                <h1 className="text-xl mb-2 font-bold">Oops!</h1>
                                <p className="text-sm mb-2">Was unable to load watched.</p>
                                {import.meta.env.DEV ? (
                                    <p className="text-neutral-400 text-xs">
                                        <i>{mediaWatched.error?.message || bookmarks.error?.message}</i>
                                    </p>
                                ) : null}
                            </div>
                        ) :
                            mediaWatched.data?.map(e => (
                                <CardWide key={e.uuid}
                                    bookmarked={bookmarks.data?.findIndex(b => b.media.uuid === e.uuid) !== -1}
                                    data={{ id: e.uuid, title: e.name, year: e.releaseYear, type: e.mediaType, rating: e.rating }}
                                    background={{ alt: "", color: e.fallbackColor, url: e.thumbnail }}
                                />
                            ))}
                </div>
            </section>
            <CardGroup title="Recommeded for you" className="flex-grow">
                {mediaRecommeded.isLoading || bookmarks.isLoading ? (
                    <>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <CardSkeletion key={i} />
                        ))}
                    </>
                ) :
                    mediaRecommeded.isError || bookmarks.isError ? (
                        <div className="w-full col-span-full flex flex-col justify-center items-center p-2">
                            <h1 className="text-xl mb-2 font-bold">Oops!</h1>
                            <p className="text-sm mb-2">Was unable to load recommeded.</p>
                            {import.meta.env.DEV ? (
                                <p className="text-neutral-400 text-xs">
                                    <i>{mediaRecommeded.error?.message || bookmarks.error?.message}</i>
                                </p>
                            ) : null}
                        </div>
                    ) :
                        mediaRecommeded.data?.map(e => (
                            <Card key={e.uuid} id={e.uuid} bookmarked={bookmarks.data?.findIndex(b => b.media.uuid === e.uuid) !== -1} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                                <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                            </Card>
                        ))}
            </CardGroup>
        </>
    );
}

export const Route = createFileRoute("/_authenticated/_root/")({
    component: Index,
    onEnter() {
        emitSearchParams("Search Movies and Tv series");
    }
});