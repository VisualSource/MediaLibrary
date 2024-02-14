export const bookmark = async (id: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookmark`, {
        method: "PATCH",
        body: JSON.stringify({
            id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json() as { state: boolean };

    return data.state;
}
