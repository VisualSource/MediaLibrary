import { SearchIcon } from 'lucide-react';
import { useNavigate, useRouter } from "@tanstack/react-router"
import { useDebounce } from "use-debounce";
import { useEffect, useState } from 'react';
import Input from './Input';

const Search: React.FC = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState<string>("");
    const [value] = useDebounce(query, 500);

    useEffect(() => {
        const callback = () => setQuery("");
        window.addEventListener("event-leave-search", callback);
        return () => window.removeEventListener("event-leave-search", callback);
    }, []);

    useEffect(() => {
        if (value.length > 1)
            navigate({
                to: "/search",
                search: { q: value, type: null }
            });
    }, [value, navigate]);

    return (
        <search className='flex gap-2 items-center pl-6 py-6 md:py-4 lg:pt-12 lg:px-2'>
            <SearchIcon className="h-7 w-7" />
            <Input value={query} onChange={(e) => setQuery((e.target as HTMLInputElement).value)} className="placeholder:text-lg placeholder:align-middle lg:placeholder:text-2xl w-3/4 lg:w-2/4 text-lg lg:text-2xl tracking-tight" type="search" placeholder={"Search for movies or TV series"} />
        </search>
    );
}

export default Search;