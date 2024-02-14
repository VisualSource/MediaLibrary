import Card, { CardContent } from "@/components/Card";
import CardGroup from "@/components/CardGroup";
import { createLazyFileRoute } from "@tanstack/react-router";

const Bookmarked: React.FC = () => {
    return (
        <>
            <CardGroup title="Bookmarked Movies">
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
            </CardGroup>
            <CardGroup title="Bookmarked Tv Serirs" className="md:pt-6">
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
                <Card id="" bookmarked={false} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }}>
                    <CardContent className="pt-2" ratingClassName="inline-flex" titleClassName="text-base md:text-lg" title="Beyond Earth" year="2019" type="movie" rating="PG" />
                </Card>
            </CardGroup>
        </>
    );
}

export const Route = createLazyFileRoute("/_authenticated/_root/bookmarked")({
    component: Bookmarked
});