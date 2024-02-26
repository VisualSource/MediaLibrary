import { createFileRoute } from "@tanstack/react-router";
import { MediaItem } from "@/lib/types";

import "video.js/dist/video-js.min.css";
import MediaPlayer from "@/components/MediaPlayer";

const MoviePlayer: React.FC = () => {
    const data = Route.useLoaderData();

    return (
        <div className="flex flex-col pr-4 space-y-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{data.name}</h1>
            <hr className="h-[1px] w-full shrink-0 bg-neutral-700" />

            <div className="max-w-5xl mx-auto min-w-[64rem]">
                <MediaPlayer src={data.contentPath} type={data.contentType} thumbnail={data.thumbnail} />
            </div>

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Description</h3>
            <div>
                <p>Rating: {data.rating}</p>
                <p>Release Year: {data.releaseYear}</p>
                <details>
                    <summary>Content Details</summary>
                    <p>Content Type: {data.contentType}</p>
                    <p>Thumbnail: {data.thumbnail ?? "No Thumbnail"}</p>
                    <p>Size: {data.size.toLocaleString(undefined, { unit: "byte" })}</p>
                    <a>Edit</a>
                </details>

            </div>

            <hr className="h-[1px] w-full shrink-0 bg-neutral-700" />
            <div>
                Suggest content
            </div>
        </div>
    );
}

export const Route = createFileRoute('/_authenticated/_root/movie/$uuid')({
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
    }
});