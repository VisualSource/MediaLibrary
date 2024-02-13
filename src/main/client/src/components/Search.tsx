import { SearchIcon } from 'lucide-react';

const Search: React.FC = () => {
    return (
        <search className='flex gap-5'>
            <SearchIcon className="h-10 w-10" />
            <input className="bg-neutral-950 placeholder:text-2xl w-2/4 font-semibold text-2xl tracking-tight" type="search" placeholder="Search for movies or TV series" />
        </search>
    );
}

export default Search;