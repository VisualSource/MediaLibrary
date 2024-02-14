import isAuthenticated from "@/lib/isAuthenticated";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
    beforeLoad({ location }) {
        // do auth check
        if (!isAuthenticated()) throw redirect({
            to: "/login",
            search: {
                redirect: location.href
            }
        });
    }
});