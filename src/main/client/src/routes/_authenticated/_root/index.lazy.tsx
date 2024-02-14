import Card, { CardContent } from "@/components/Card";
import CardGroup from "@/components/CardGroup";
import CardWide from "@/components/CardWide";
import { createLazyFileRoute } from "@tanstack/react-router";

const Index: React.FC = () => {
    return (
        <>
            <section className="min-h-16 md:min-h-48 lg:min-h-72 pl-6 lg:px-2 lg:pt-4">
                <h1 className="tracking-tight text-2xl lg:text-3xl pb-3 lg:pb-6">Trending</h1>
                <div className="flex gap-6 md:gap-9 overflow-x-scroll py-2">
                    <CardWide
                        bookmarked={false}
                        data={{ title: "Beyond Earth", year: "2019", type: "movie", rating: "PG" }}
                        background={{ alt: "", color: "", url: "https://images.unsplash.com/photo-1544037943-afd8fa64efbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
                    />

                    <CardWide
                        bookmarked={false}
                        data={{ title: "Beyond Earth", year: "2019", type: "movie", rating: "PG" }}
                        background={{ alt: "", color: "", url: "https://images.unsplash.com/photo-1544037943-afd8fa64efbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
                    />
                    <CardWide
                        bookmarked={false}
                        data={{ title: "Beyond Earth", year: "2019", type: "movie", rating: "PG" }}
                        background={{ alt: "", color: "", url: "https://images.unsplash.com/photo-1544037943-afd8fa64efbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
                    />
                </div>
            </section>
            <CardGroup title="Recommeded for you">
                <Card bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
            </CardGroup>
        </>
    );
}

export const Route = createLazyFileRoute("/_authenticated/_root/")({
    component: Index
});