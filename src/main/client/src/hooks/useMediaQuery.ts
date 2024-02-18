import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth";


type MediaQuery = {
    queryKey: unknown[],
    searchParams: string;
    enabled?: boolean
}

const useMediaQuery = <TReturn>({ queryKey, searchParams, enabled = true }: MediaQuery) => {
    const { ctx } = useAuth();
    return useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const tokens = await ctx.getSession();
            if (!tokens) throw new Error("Unable to make request");
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media${searchParams}`, {
                headers: {
                    "Authorization": `Bearer ${tokens.accessToken}`
                }
            });
            if (!response.ok) throw response;

            return response.json() as Promise<TReturn>;
        },
        enabled: !ctx.isLoading || ctx.isAuthenticated() && enabled
    });
}

export default useMediaQuery;