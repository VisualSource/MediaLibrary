import { useQuery } from "@tanstack/react-query"
import { getSessionToken } from "@auth/getSessionToken";

type MediaQuery = {
    queryKey: unknown[],
    searchParams: string;
    enabled?: boolean
}

const useMediaQuery = <TReturn>({ queryKey, searchParams, enabled = true }: MediaQuery) => {
    return useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media${searchParams}`, {
                headers: {
                    "Authorization": `Bearer ${getSessionToken()}`
                }
            });
            if (!response.ok) throw response;

            return response.json() as Promise<TReturn>;
        },
        enabled
    });
}

export default useMediaQuery;