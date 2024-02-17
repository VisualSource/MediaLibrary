import { forwardRef } from 'react';
import { cn } from "@/lib/utils";

const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<never>>(({ className, children, ...props }, ref) => {
    return (
        <button ref={ref} className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", className)} {...props}>
            {children}
        </button>
    );
});

export default Button;