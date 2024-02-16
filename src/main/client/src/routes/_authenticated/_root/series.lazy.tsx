import Card, { CardContent } from "@/components/Card";
import CardGroup from "@/components/CardGroup";
import { getSessionToken } from "@/lib/getSessionToken";
import { MediaItem } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

const Series: React.FC = () => {
    const tvSeries = useQuery({
        queryKey: ["SERIRS"],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/media?type=series`, {
                headers: {
                    "Authorization": `Bearer ${getSessionToken()}`
                }
            });
            if (!response.ok) throw response;
            return response.json() as Promise<MediaItem[]>;
        }
    });
    return (
        <CardGroup title="Tv Series" className="md:pt-6">
            {tvSeries.isLoading ? (<></>) :
                tvSeries.isError ? (<></>) :
                    tvSeries.data?.map(e => (
                        <Card key={e.uuid} id={e.uuid} bookmarked={true} background={{ url: e.thumbnail, alt: "", color: e.fallbackColor }}>
                            <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title={e.name} year={e.releaseYear.toString()} type={e.mediaType} rating={e.rating} />
                        </Card>
                    ))}
        </CardGroup>
    );
}

export const Route = createLazyFileRoute("/_authenticated/_root/series")({
    component: Series
});