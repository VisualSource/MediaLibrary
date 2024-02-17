import { Bookmark } from "lucide-react";

const WideCardSkeletion: React.FC = () => {
    return (
        <div className="relative w-[18rem] h-[10.9rem] md:w-[26rem] md:h-[12.5rem] lg:h-56 lg:w-[28.5rem] shrink-0">
            <div className='relative h-full w-full shadow animate-pulse bg-neutral-800/50 rounded-lg'>
                <div className={"absolute right-3 top-3 h-10 w-10 md:right-4 md:w-8 md:h-8 bg-neutral-700/65 hover:bg-neutral-800/95 transition rounded-full flex items-center justify-center text-zinc-50"}>
                    <Bookmark className="h-6 w-6 md:h-4 md:w-4" />
                </div>
            </div>
            <div className="flex flex-col absolute bottom-4 left-4 md:left-6 w-full">
                <div className='flex gap-2 text-neutral-300 tracking-tight text-sm md:text-xs items-center pb-1 h-4 md:h-3'>
                    <span className="h-full w-1/12 inline-block animate-pulse bg-neutral-300/75 rounded-sm"></span>
                    <span className="inline-flex animate-pulse w-1/12  bg-neutral-300/75 gap-1 items-center before:list-item before:list-disc ml-2 rounded-sm h-full"></span>
                    <span className='h-full before:list-item w-1/12 animate-pulse bg-neutral-300/75 before:list-disc hidden md:inline-flex items-center ml-2 rounded-sm'></span>
                </div>
                <h4 className="animate-pulse bg-neutral-300/75 rounded-sm sm:h-6 h-5 w-2/6 before:w-5 "></h4>
            </div>
            <div className="absolute bottom-7 right-5 md:hidden text-center px-1.5 h-6 w-10 bg-neutral-400/25 flex items-center justify-center rounded-full"></div>
        </div>
    );
}

export default WideCardSkeletion;