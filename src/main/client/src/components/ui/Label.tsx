import { cn } from "@/lib/utils";

const Label: React.FC<React.PropsWithChildren<React.LabelHTMLAttributes<never>>> = ({ className, children, ...props }) => {
    return (
        <label className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props}>{children}</label>
    );
}

export default Label;