import { Bookmark } from "lucide-react";

const CardSkeletion: React.FC = () => {
    return (
        <div className="relative min-h-min h-full">
            <div className='relative shadow w-full h-[8rem] md:h-36 lg:h-[11.5rem] animate-pulse bg-neutral-800/50 rounded-lg'>
                <div className="absolute top-3 right-3 md:right-4 h-10 w-10 md:h-8 md:w-8 bg-neutral-700/65 hover:bg-neutral-800/95 transition rounded-full flex items-center justify-center">
                    <Bookmark className="h-5 w-5 md:h-4 md:w-4" />
                </div>
            </div>
            <div className="flex flex-col relative pt-2">
                <div className='flex gap-2 tracking-tight h-4 items-center pb-1'>
                    <span className="inline-flex h-full w-1/12 bg-neutral-300/75 animate-pulse"></span>
                    <span className="inline-flex h-full w-1/12 gap-1 items-center before:list-item before:list-disc ml-2 bg-neutral-300/75 animate-pulse"></span>
                    <span className='before:list-item h-full w-1/12 before:list-disc ml-2 inline-flex items-center bg-neutral-300/75 animate-pulse'></span>
                </div>
                <h4 className="h-4 md:h-5 bg-neutral-300/75 before:w-5 animate-pulse w-6/12"></h4>
            </div>
        </div>
    );
}

export default CardSkeletion;