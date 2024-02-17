import { cn } from "@/lib/utils";

const CardGroup: React.FC<React.PropsWithChildren<{ className?: string, title: string }>> = ({ className, children, title }) => {
    return (
        <section className={cn("min-h-96 px-6 lg:pl-2 lg:pr-8", className)}>
            <h1 className="tracking-tight text-2xl lg:text-3xl pt-4 pb-8 lg:py-6">{title}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-rows-none gap-4 md:gap-6">
                {children}
            </div>
        </section>
    );
}

export default CardGroup;