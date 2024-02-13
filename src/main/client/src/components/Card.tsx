import { Bookmark, BookmarkCheck, Tv, Film } from 'lucide-react';
import { cn } from '../lib/utils';
type CardProps = {
    style?: {
        container?: string;
        info?: string;
        img?: string;
    },
    bookmarked: boolean
    background: {
        url: string;
        alt: string;
        color: string; // placeholder color
    },
    data: {
        id: string;
        title: string;
        year: string,
        type: "movie" | "series" | "audio",
        rating: string,
    }
}

const Card: React.FC<CardProps> = ({ bookmarked, background, data, style }) => {
    return (
        <div className={cn("relative")}>
            <div className={cn('h-44 w-80 relative', style?.container)}>
                <button className="absolute top-4 right-4 h-10 w-10 bg-neutral-700/75 hover:bg-neutral-800/95 transition-opacity rounded-full flex items-center justify-center text-zinc-50"> {bookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />} </button>
                <img className={cn("rounded-2xl h-full w-full", style?.img)} src={background.url} alt={background.url} />
            </div>
            <div className={cn("flex flex-col", style?.info)}>
                <div className='flex gap-2 text-zinc-100 tracking-tight text-sm'>
                    <span>{data.year}</span>
                    *
                    <span className="flex gap-1 items-center">{data.type === "movie" ? (<> <Film className="h-4 w-4" /> Movie </>) : (<><Tv className="h-4 w-4" /> TV Series </>)}</span>
                    *
                    <span>{data.rating}</span>
                </div>
                <h4 className="line-clamp-1 font-semibold text-3xl text-neutral-50">{data.title}</h4>
            </div>
        </div>
    );
}

export default Card;