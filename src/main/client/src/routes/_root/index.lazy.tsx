import Card from "@/components/Card";
import { createLazyFileRoute } from "@tanstack/react-router";

const Index: React.FC = () => {
    return (
        <>
            <section data-name="trending" className="py-4">
                <h1 className="text-3xl pb-4 tracking-tight">Trending</h1>
                <div className="flex gap-8">
                    <Card style={{ container: "w-96 h-56", info: "absolute bottom-4 left-4" }} bookmarked={false} data={{ title: "Beyond Earth", type: "movie", rating: "PG", id: "", year: "2019" }} background={{ url: "https://images.unsplash.com/photo-1707597941447-4f65515e628e?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }} />
                    <Card style={{ container: "w-96 h-56", info: "absolute bottom-4 left-4" }} bookmarked={false} data={{ title: "Bottom Gear", type: "movie", rating: "PG", id: "", year: "2021" }} background={{ url: "https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }} />
                    <Card style={{ container: "w-96 h-56", info: "absolute bottom-4 left-4" }} bookmarked={false} data={{ title: "Undiscovered Cities", type: "series", rating: "E", id: "", year: "2019" }} background={{ url: "https://images.unsplash.com/photo-1544037943-afd8fa64efbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }} />
                </div>
            </section>

            <section data-name="recommended" className="py-4">
                <h1 className="text-3xl pb-4 tracking-tight">Recommeded for you</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-none gap-y-8">
                    <Card style={{ info: "pt-2" }} bookmarked={false} data={{ title: "The Great Lands", type: "movie", rating: "PG", id: "", year: "2019" }} background={{ url: "https://images.unsplash.com/photo-1543321654-6a02453dc56a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }} />
                    <Card style={{ info: "pt-2" }} bookmarked={false} data={{ title: "The Diary", type: "series", rating: "PG", id: "", year: "2019" }} background={{ url: "https://images.unsplash.com/photo-1636955992879-c3c4d4cc2f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }} />
                    <Card style={{ info: "pt-2" }} bookmarked={false} data={{ title: "Earth's Untouched", type: "movie", rating: "18+", id: "", year: "2017" }} background={{ url: "https://images.unsplash.com/photo-1611651186486-415f04eb78e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "", color: "" }} />
                    <Card style={{ info: "pt-2" }} bookmarked={false} data={{ title: "No Land Beyond", type: "movie", rating: "E", id: "", year: "2019" }} background={{ url: "", alt: "", color: "" }} />

                    <Card style={{ info: "pt-2" }} bookmarked={false} data={{ title: "During The Hunt", type: "series", rating: "PG", id: "", year: "2016" }} background={{ url: "", alt: "", color: "" }} />
                    <Card style={{ info: "pt-2" }} bookmarked={false} data={{ title: "Autosport The Series", type: "series", rating: "PG", id: "", year: "2016" }} background={{ url: "", alt: "", color: "" }} />
                    <Card style={{ info: "pt-2" }} bookmarked={false} data={{ title: "Same Answer II", type: "movie", rating: "E", id: "", year: "2017" }} background={{ url: "", alt: "", color: "" }} />
                    <Card style={{ info: "pt-2" }} bookmarked={false} data={{ title: "Below Echo", type: "series", rating: "PG", id: "", year: "2016" }} background={{ url: "", alt: "", color: "" }} />
                </div>
            </section>
        </>
    );
}

export const Route = createLazyFileRoute("/_root/")({
    component: Index
});