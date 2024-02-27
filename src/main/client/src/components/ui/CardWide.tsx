import { Bookmark, BookmarkCheck, Film, Tv } from "lucide-react";
import useMutationBookmark from "@hook/useMutationBookmark";
import { Link } from "@tanstack/react-router";

type CardProps = {
    bookmarked: boolean
    background: {
        url: string;
        alt: string;
        color: string; // placeholder color
    }
    data: {
        id: string;
        year: number;
        type: string;
        rating: string;
        title: string;
    }
}

const CardWide: React.FC<CardProps> = ({ bookmarked, background, data }) => {
    const mutation = useMutationBookmark();
    return (
        <Link to="/content/$uuid" params={{ uuid: data.id }} className="relative w-[18rem] h-[10.9rem] md:w-[26rem] md:h-[12.5rem] lg:h-56 lg:w-[28.5rem] shrink-0 block">
            <div className='relative h-full w-full shadow rounded-lg' style={{ backgroundColor: background.color }}>
                <button onClick={() => mutation.mutateAsync({ state: bookmarked, id: data.id })} className={"absolute right-3 top-3 h-10 w-10 md:right-4 md:w-8 md:h-8 bg-neutral-700/65 hover:bg-neutral-800/95 transition rounded-full flex items-center justify-center text-zinc-50"}> {bookmarked ? <BookmarkCheck className="h-6 w-6 md:h-4 md:w-4" /> : <Bookmark className="h-6 w-6 md:h-4 md:w-4" />} </button>
                <img className={"rounded-lg h-full w-full"} src={background.url} alt={background.url} />
            </div>
            <div className="flex flex-col absolute bottom-4 left-4 md:left-6">
                <div className='flex gap-2 text-neutral-300 tracking-tight text-sm md:text-xs items-center'>
                    <span>{data.year}</span>
                    <span className="inline-flex gap-1 items-center before:list-item before:list-disc ml-4">{data.type === "movie" ? (<> <Film className="h-4 w-4" /> Movie </>) : (<><Tv className="h-4 w-4" /> TV Series </>)}</span>
                    <span className='before:list-item before:list-disc hidden md:inline-flex ml-4'>{data.rating}</span>
                </div>
                <h4 className="line-clamp-1 font-semibold text-xl sm:text-2xl text-neutral-50 before:w-5">{data.title}</h4>
            </div>
            <div className="absolute bottom-7 right-5 md:hidden text-center px-1.5 h-6 w-10 bg-neutral-400/25 flex items-center justify-center rounded-full">{data.rating}</div>
        </Link>
    );
}

export default CardWide;