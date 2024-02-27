import { MediaItem } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const QUERY_WATCHED = "WATCHED";

const useWatched = () => {
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
    return mediaWatched;
}

export default useWatched;