import { createLazyFileRoute } from "@tanstack/react-router";

const Account: React.FC = () => {
    return (
        <div>
            <h3 className="font-bold">Welcome</h3>
        </div>
    );
}

export const Route = createLazyFileRoute("/account")({
    component: Account
});