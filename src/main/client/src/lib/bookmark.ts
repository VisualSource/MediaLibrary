import { getSessionToken } from "./getSessionToken";
import { queryClient } from "./QueryClient";

export const bookmark = async (id: string, state: boolean, query: string[]) => {
    try {
        const token = getSessionToken();

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookmark`, {
            method: "PATCH",
            body: JSON.stringify({
                item: id,
            }),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json() as { state: boolean };

        queryClient.invalidateQueries({ queryKey: query });

        return data.state;
    } catch (error) {
        console.error(error);
        return state;
    }
}
