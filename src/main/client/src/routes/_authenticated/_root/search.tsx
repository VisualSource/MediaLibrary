import { createFileRoute } from "@tanstack/react-router";
import CardSkeletion from "@/components/ui/CardSkeletion";
import { getSessionToken } from "@auth/getSessionToken";
import emitLeaveSearch from "@event/emitLeaveSearch";
import useBookmarks from "@hook/useBookmarks";
import Card, { CardContent } from "@ui/Card";
import { MediaItem } from "@lib/types";
import CardGroup from "@ui/CardGroup";

const Search: React.FC = () => {
    const bookmarks = useBookmarks();
    const { title, data } = Route.useLoaderData();

    return (
        <CardGroup title={title}>
            {bookmarks.isLoading ? (
                <>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <CardSkeletion key={i} />
                    ))}
                </>) : bookmarks.isError ? (
                    <div className="w-full h-[10.9rem] md:h-[12.5rem] lg:h-56 flex flex-col justify-center items-center p-2">
                        <h1 className="text-xl mb-2 font-bold">Oops!</h1>
                        <p className="text-sm mb-2">Was unable to load watched.</p>
                        {import.meta.env.DEV ? (
                            <p className="text-neutral-400 text-xs">
                                <i>{bookmarks.error?.message}</i>
                            </p>
                        ) : null}
                    </div>
                ) : data.map(e => (
                    <Card key={e.uuid} id={e.uuid} bookmarked={bookmarks.data?.findIndex(b => b.media.uuid === e.uuid) !== -1} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                        <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                    </Card>
                ))}
        </CardGroup>
    );
}

const PendingComponent: React.FC = () => {
    return (
        <CardGroup title="Loading">
            {Array.from({ length: 10 }).map((_, i) => (
                <CardSkeletion key={i} />
            ))}
        </CardGroup>
    );
}

const ErrorComponent = () => {
    return (
        <CardGroup title="No Results"></CardGroup>
    );
}

export const Route = createFileRoute("/_authenticated/_root/search")({
    component: Search,
    errorComponent: ErrorComponent,
    pendingComponent: PendingComponent,
    validateSearch: (e: Record<string, string>): { q: string, type?: string, bookmarked: boolean } => {
        let q = "";
        let bookmarked = false;

        if (e?.bookmarked) {
            bookmarked = true;
        }

        if (!e?.q?.length) throw new Error("Failed to validate query");
        q = e.q;

        return {
            q,
            type: e?.type,
            bookmarked,
        };
    },
    loaderDeps: ({ search: { q, type, bookmarked } }) => ({ bookmarked, q, type }),
    loader: async ({ deps }) => {

        const params = new URLSearchParams();
        params.set("q", deps.q);

        if (deps.type) {
            params.set("type", deps.type);
        }

        if (deps.bookmarked) {
            params.set("bookmarked", "true");
        }

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/search?${params.toString()}`, {
            headers: {
                "Authorization": `Bearer ${getSessionToken()}`
            }
        });

        if (!response.ok) throw response;

        const results = await response.json() as MediaItem[];

        return {
            title: results.length >= 1 ? `Found ${results.length} result${results.length > 1 ? "s" : ""} for '${deps.q}'` : "No Results where found",
            data: results
        }
    },
    onLeave() {
        emitLeaveSearch();
    }
});