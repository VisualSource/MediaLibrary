import { createFileRoute } from "@tanstack/react-router";

import WideCardSkeletion from "@/components/ui/WideCardSkeletion";
import EditMetadataDialog from "@/components/EditMetadataDialog";
import DeleteMediaDialog from "@/components/DeleteMediaDialog";
import MediaPlayer from "@/components/MediaPlayer";
import CardWide from "@/components/ui/CardWide";
import useBookmarks from "@/hooks/useBookmarks";
import { formatBytes } from "@/lib/formatBytes";
import NotFound from "@/components/NotFound";
import type { MediaItem } from "@/lib/types";
import useWatched from "@/hooks/useWatched";
import useAuth from "@/hooks/useAuth";

import "video.js/dist/video-js.min.css";


const MoviePlayer: React.FC = () => {
    const auth = useAuth();
    const data = Route.useLoaderData();
    const bookmarks = useBookmarks();
    const mediaWatched = useWatched();

    return (
        <div className="flex flex-col pr-4 space-y-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{data.name}</h1>
            <hr className="h-[1px] w-full shrink-0 bg-neutral-700" />

            <div className="max-w-5xl mx-auto min-w-[64rem]">
                <MediaPlayer src={data.contentPath} type={data.contentType} thumbnail={data.thumbnail} />
            </div>

            <div className="container">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Description</h3>
                <div>
                    <div className="flex gap-2 text-sm">
                        <span>Rating: {data.rating}</span>
                        <span>Release Year: {data.releaseYear}</span>
                    </div>
                    <details className="p-2">
                        <summary>Content Details</summary>
                        <p>Content Type: <span className="text-neutral-200 text-sm">{data.contentType}</span></p>
                        <p>Thumbnail: <a target="_blank" className="text-neutral-200 text-sm">{data.thumbnail.length ? data.thumbnail : "No Thumbnail"}</a></p>
                        <p>Size: <span className="text-neutral-200 text-sm">{formatBytes(data.size)}</span></p>
                        {auth.hasRole("ROLE_ADMIN") ? (
                            <div className="flex justify-end gap-4">
                                <EditMetadataDialog data={data} />
                                <DeleteMediaDialog uuid={data.uuid} />
                            </div>
                        ) : null}
                    </details>
                </div>
                <hr className="h-[1px] w-full shrink-0 bg-neutral-700" />
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
            </div>


        </div>
    );
}

export const Route = createFileRoute('/_authenticated/_root/_content/content/$uuid')({
    component: MoviePlayer,
    parseParams: (rawParams) => {
        if ("uuid" in rawParams) {
            return {
                uuid: rawParams["uuid"]
            }
        }
        throw new Error("Failed to get uuid");
    },
    loader: async ({ params, context }) => {
        const session = await context.auth.getSession();
        if (!session) throw new Error("Failed to get session");

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/file/${params.uuid}/metadata`, {
            headers: {
                "Authorization": `Bearer ${session.accessToken}`
            }
        });

        if (!response.ok) throw new Error("File not found");

        return response.json() as Promise<MediaItem>;
    },
    notFoundComponent: () => <NotFound />
});