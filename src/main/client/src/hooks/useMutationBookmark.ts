import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_BOOKMARKS, type Bookmark } from "@hook/useBookmarks";
import useAuth from "@hook/useAuth";

type BookmarkState = {
    state: boolean;
    id: number;
}

type MutationRequest = {
    state: boolean;
    id: string;
}

const useMutationBookmark = () => {
    const auth = useAuth();
    const queryClient = useQueryClient();

    const uuid = auth.user.data?.jwtId;

    const mutation = useMutation({
        mutationFn: async ({ id }: MutationRequest) => {
            if (!auth.isAuthenticated()) throw new Error("Unable to update");

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookmark`, {
                method: "PUT",
                body: JSON.stringify({
                    item: id,
                }),
                headers: {
                    "Authorization": `Bearer ${auth.session}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw response;

            return response.json() as Promise<BookmarkState>;
        },
        async onMutate({ state, id }: MutationRequest) {
            await queryClient.cancelQueries({ queryKey: [QUERY_BOOKMARKS, uuid] });

            const previousBookmarks = queryClient.getQueryData([QUERY_BOOKMARKS, uuid]);

            queryClient.setQueryData([QUERY_BOOKMARKS, uuid], (old: Bookmark[] | undefined) => {
                if (!old) return { id: -1, media: { uuid: id }, owner: { jwtId: uuid } } as Bookmark

                if (state) return [...old.filter(e => e.media.uuid !== id)]
                return [...old, { id: -1, media: { uuid: id }, owner: { jwtId: uuid } } as Bookmark];
            })

            return { previousBookmarks }
        },
        onError: (err, _item, context) => {
            console.error(err);
            queryClient.setQueryData([QUERY_BOOKMARKS, uuid], context?.previousBookmarks);
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: [QUERY_BOOKMARKS, uuid] });
        }
    });

    return mutation;
}

export default useMutationBookmark;