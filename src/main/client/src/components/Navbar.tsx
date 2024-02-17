import { Bookmark, Tv, Film, LayoutGrid, Clapperboard } from 'lucide-react';
import { Link } from "@tanstack/react-router";
import Avatar from "./Avatar";
import { useAuth } from '@/hooks/useAuth';

const Navbar: React.FC = () => {
    const auth = useAuth();
    return (
        <div className="md:px-6 md:pt-6 lg:p-8 lg:pr-6">
            <nav className="bg-slate-900 text-neutral-500 flex justify-between lg:justify-normal items-center gap-16 px-4 w-full h-16 lg:w-20 lg:flex-col lg:px-0 lg:py-7 lg:h-full md:rounded-2xl">
                <Link to="/">
                    <Clapperboard className="h-7 w-7 lg:h-8 lg:w-8 text-red-500" />
                </Link>

                <div className="flex lg:flex-col gap-6 md:gap-8 items-center">
                    <Link to="/" className="hover:text-blue-200 transition duration-200" activeProps={{
                        className: "text-neutral-50 scale-125"
                    }}>
                        <LayoutGrid className='h-5 w-5 lg:h-6 lg:w-6' />
                    </Link>
                    <Link to="/movies" className="hover:text-blue-200 transition duration-200" activeProps={{
                        className: "text-neutral-50 scale-125"
                    }}>
                        <Film className='h-5 w-5 lg:h-6 lg:w-6' />
                    </Link>
                    <Link to="/series" className="hover:text-blue-200 transition duration-200" activeProps={{
                        className: "text-neutral-50 scale-125"
                    }}>
                        <Tv className='h-5 w-5 lg:h-6 lg:w-6' />
                    </Link>
                    <Link to="/bookmarked" className="hover:text-blue-200 transition duration-200" activeProps={{
                        className: "text-neutral-50 scale-125"
                    }}>
                        <Bookmark className='h-5 w-5 lg:h-6 lg:w-6' />
                    </Link>
                </div>

                <Link to="/account" className="lg:mt-auto">
                    <Avatar className="h-8 w-8 lg:h-10 lg:w-10" url={auth.user.data?.avatar} />
                </Link>
            </nav>
        </div>
    );
}

export default Navbar;