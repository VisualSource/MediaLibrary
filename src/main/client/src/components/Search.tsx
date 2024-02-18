import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from 'react';
import { useDebounce } from "use-debounce";
import { SearchIcon } from 'lucide-react';

import { EVENT_SEARCH_PARAMS_KEY } from "@event/emitSearchParams";
import Input from '@ui/Input';

const Search: React.FC = () => {
    const navigate = useNavigate();
    const [placeholder, setPlaceHolder] = useState("Search for movies or TV series");
    const [searchParams, setSearchParams] = useState<{ bookmarked: boolean, type: string | undefined }>({
        bookmarked: false,
        type: undefined
    });
    const [query, setQuery] = useState<string>("");
    const [value] = useDebounce(query, 500);

    useEffect(() => {
        const callback = (e: Event) => {
            const data = (e as CustomEvent<{ bookmarked: boolean, placeholder: string, type: string | undefined }>).detail;
            setPlaceHolder(data.placeholder);
            setSearchParams({ bookmarked: data.bookmarked, type: data.type });
        }
        window.addEventListener(EVENT_SEARCH_PARAMS_KEY, callback);
        return () => window.removeEventListener(EVENT_SEARCH_PARAMS_KEY, callback);
    }, []);

    useEffect(() => {
        const callback = () => setQuery("");
        window.addEventListener("event-leave-search", callback);
        return () => window.removeEventListener("event-leave-search", callback);
    }, []);

    useEffect(() => {
        if (value.length > 1)
            navigate({
                to: "/search",
                search: { q: value, type: searchParams.type, bookmarked: searchParams.bookmarked }
            });
    }, [value, searchParams, navigate]);

    return (
        <search className='flex gap-2 items-center pl-6 py-6 md:py-4 lg:pt-12 lg:px-2'>
            <SearchIcon className="h-7 w-7" />
            <Input value={query} onChange={(e) => setQuery((e.target as HTMLInputElement).value)} className="placeholder:text-lg placeholder:align-middle lg:placeholder:text-2xl w-3/4 lg:w-2/4 text-lg lg:text-2xl tracking-tight" type="search" placeholder={placeholder} />
        </search>
    );
}

export default Search;