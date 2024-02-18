import { createFileRoute, redirect } from "@tanstack/react-router";


export const Route = createFileRoute("/_authenticated")({
    async beforeLoad({ context, location }) {
        await new Promise<void>((ok) => {
            const interval = setInterval(() => {
                if (!context.auth.isLoading) {
                    clearInterval(interval);
                    ok();
                }
            }, 1000);
        });

        if (!context.auth.isAuthenticated()) throw redirect({
            to: "/login",
            search: {
                redirect: location.href
            }
        });
    }
});