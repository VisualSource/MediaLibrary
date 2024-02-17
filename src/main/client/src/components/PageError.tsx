import type { ErrorComponentProps } from "@tanstack/react-router";

const PageError: React.FC<ErrorComponentProps> = ({ error, info }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-6xl mb-8 font-bold">Oops!</h1>
            <p className="text-xl mb-2">Sorry, an unexpected error has occurred.</p>
            <p className="text-neutral-400">
                <i>{typeof error === "string" ? error : "Unknown error"}</i>
            </p>
            {import.meta.env.DEV ? (<p className="text-neutral-400">
                <i>{info.componentStack}</i>
            </p>) : null}
        </div>
    );
}

export default PageError;