import { cn } from "@/lib/utils";

const Input: React.FC<React.InputHTMLAttributes<never>> = ({ className, ...props }) => {
    return (
        <input className={cn("h-10 rounded-md px-3 py-2 text-sm bg-slate-950 ring-offset-slate-950  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
    );
}

export default Input;