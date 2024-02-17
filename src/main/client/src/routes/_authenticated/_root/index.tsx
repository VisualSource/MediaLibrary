import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import emitSearchPlaceholder from "@event/emitSearchPlaceholder";
import Card, { CardContent } from "@ui/Card";
import useBookmarks from "@hook/useBookmarks";
import { type MediaItem } from '@lib/types';
import CardGroup from "@ui/CardGroup";
import CardWide from "@ui/CardWide";

const QUERY_RECOMMEDED = "RECOMMEDED";
const QUERY_WATCHED = "WATCHED";

const Index: React.FC = () => {
    const bookmarks = useBookmarks();

    const mediaWatched = useQuery({
        queryKey: [QUERY_WATCHED],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media/watched`);
            if (!response.ok) throw response;
            return response.json() as Promise<MediaItem[]>;
        }
    });

    const mediaRecommeded = useQuery({
        queryKey: [QUERY_RECOMMEDED],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media/recommeded`);
            if (!response.ok) throw response;
            return response.json() as Promise<MediaItem[]>;
        }
    });


    return (
        <>
            <section className="min-h-16 md:min-h-48 lg:min-h-72 pl-6 lg:px-2 lg:pt-4">
                <h1 className="tracking-tight text-2xl lg:text-3xl pb-3 lg:pb-6">Trending</h1>
                <div className="flex gap-6 md:gap-9 overflow-x-scroll py-2">
                    {mediaRecommeded.isLoading || bookmarks.isLoading ? (<></>) :
                        mediaRecommeded.isError || bookmarks.isError ? (<></>) :
                            mediaWatched.data?.map(e => (
                                <CardWide key={e.uuid}
                                    bookmarked={bookmarks.data?.findIndex(b => b.media.uuid === e.uuid) !== -1}
                                    data={{ id: e.uuid, title: e.name, year: e.releaseYear, type: e.mediaType, rating: e.rating }}
                                    background={{ alt: "", color: e.fallbackColor, url: e.thumbnail }}
                                />
                            ))}
                </div>
            </section>
            <CardGroup title="Recommeded for you">
                {mediaWatched.isLoading || bookmarks.isLoading ? (<></>) :
                    mediaWatched.isError || bookmarks.isError ? (<></>) :
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
        emitSearchPlaceholder("Search Movies and Tv series");
    }
});