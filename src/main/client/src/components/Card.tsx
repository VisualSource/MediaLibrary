import { Bookmark, BookmarkCheck, Tv, Film } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { bookmark } from '../lib/bookmark';

type CardProps = {
    bookmarked: boolean
    id: string,
    query: string[],
    background: {
        url: string;
        alt: string;
        color: string; // placeholder color
    }
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ id, bookmarked, background, children, query }) => {
    const [isBookmarked, setBookmarked] = useState(bookmarked);
    return (
        <div className="relative min-h-min h-full">
            <div className='relative shadow w-full h-[8rem] md:h-36 lg:h-[11.5rem]'>
                <button onClick={async () => {
                    const oldState = isBookmarked;
                    setBookmarked((e) => !e);
                    const result = await bookmark(id, oldState, query);
                    setBookmarked(result);
                }} className="absolute top-3 right-3 md:right-4 h-10 w-10 md:h-8 md:w-8 bg-neutral-700/65 hover:bg-neutral-800/95 transition rounded-full flex items-center justify-center text-zinc-50"> {isBookmarked ? <BookmarkCheck className="h-8 w-8 md:h-4 md:w-4" /> : <Bookmark className="h-5 w-5 md:h-4 md:w-4" />} </button>
                <img className="rounded-lg h-full w-full" src={background.url} alt={background.url} />
            </div>
            {children}
        </div>
    );
}

export const CardContent: React.FC<{ year: string; type: string; title: string; rating: string; className?: string, titleClassName?: string; ratingClassName?: string }> = ({ ratingClassName, titleClassName, year, type, title, rating, className }) => {
    return (
        <div className={cn("flex flex-col relative", className)}>
            <div className='flex gap-2 text-neutral-300 tracking-tight text-sm items-center'>
                <span>{year}</span>
                <span className="inline-flex gap-1 items-center before:list-item before:list-disc ml-4">{type === "movie" ? (<> <Film className="h-4 w-4" /> Movie </>) : (<><Tv className="h-4 w-4" /> TV Series </>)}</span>
                <span className={cn('before:list-item before:list-disc hidden md:inline-flex ml-4', ratingClassName)}>{rating}</span>
            </div>
            <h4 className={cn("line-clamp-1 font-semibold text-2xl md:text-3xl text-neutral-50 before:w-5", titleClassName)}>{title}</h4>
        </div>
    );
}

export default Card;