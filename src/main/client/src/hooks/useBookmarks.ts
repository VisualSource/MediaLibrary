import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@hook/useAuth";

export type Bookmark = {
    id: number;
    owner: {
        jet_id: string;
    }
    media: {
        uuid: string;
    }
}

export const QUERY_BOOKMARKS = "BOOKMARKS";

const useBookmarks = () => {
    const auth = useAuth();
    const { data, isError, error, isLoading } = useQuery({
        queryKey: [QUERY_BOOKMARKS, auth.user.data?.jwt_id],
        enabled: !(auth.user.isLoading || auth.user.isError || !auth.isAuthenticated()),
        queryFn: async () => {

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookmarks`, {
                headers: {
                    "Authorization": `Bearer ${auth.session}`
                }
            });

            if (!response.ok) throw response;

            const bookmarks = await response.json() as Bookmark[];

            return bookmarks;
        }
    });

    return {
        data,
        isError,
        error,
        isLoading
    }
}

export default useBookmarks;