import { cn } from '@/lib/utils';
import { User2 } from 'lucide-react';
import { useState } from 'react';

const Avatar: React.FC<{ className?: string, url: string | undefined, alt?: string }> = ({ className, url, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={cn("h-10 w-10 border-2 border-zinc-50 rounded-full inline-flex items-center justify-center", className)}>
            {loaded ? null : <User2 />}
            <img className={cn("h-full w-full rounded-full", { "hidden": !loaded })} onLoad={() => setLoaded(true)} src={url} alt={alt} />
        </div>
    );
}//Dominant color placeholder

export default Avatar;