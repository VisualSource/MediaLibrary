import { Tag, Bookmark, Tv, Film, LayoutGrid } from 'lucide-react';
import { Link } from "@tanstack/react-router";
import Avatar from "./Avatar";

const Navbar: React.FC = () => {
    return (
        <div className="md:p-4">
            <nav className="bg-neutral-800 text-neutral-500 flex justify-between lg:justify-normal items-center gap-20 px-4 w-full h-16 lg:w-24 lg:flex-col lg:px-0 lg:py-8 lg:h-full md:rounded-3xl">
                <Link to="/">
                    <Tag />
                </Link>

                <div className="flex lg:flex-col gap-8">
                    <Link to="/" activeProps={{
                        className: "text-neutral-50"
                    }}>
                        <LayoutGrid />
                    </Link>
                    <Link to="/movies" activeProps={{
                        className: "text-neutral-50"
                    }}>
                        <Film />
                    </Link>
                    <Link to="/series" activeProps={{
                        className: "text-neutral-50"
                    }}>
                        <Tv />
                    </Link>
                    <Link to="/bookmarked" activeProps={{
                        className: "text-neutral-50"
                    }}>
                        <Bookmark />
                    </Link>
                </div>

                <Link to="/account" className="lg:mt-auto">
                    <Avatar url="https://images.unsplash.com/photo-1655834648155-f7a98ff3c49d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D" />
                </Link>
            </nav>
        </div>
    );
}

export default Navbar;