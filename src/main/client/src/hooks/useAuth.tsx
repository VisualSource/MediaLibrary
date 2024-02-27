import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { authContext, QUERY_USER } from '@auth/context';

import { useNavigate } from '@tanstack/react-router';

export type User = {
    username: string;
    avatar: string;
    email: string;
    roles: string[];
    id: number;
    jwtId: string;
}

const useAuth = () => {
    const navigate = useNavigate();
    const ctx = useContext(authContext);
    if (!ctx) throw new Error("useAuth requires a AuthProvider wrapper.")


    const data = useQuery({
        queryKey: [QUERY_USER],
        queryFn: async () => {
            const tokens = await ctx.getSession();
            if (!tokens) throw new Error("Unable to request userdata");

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
                headers: {
                    "Authorization": `Bearer ${tokens.accessToken}`
                }
            });

            if (response.ok) return response.json() as Promise<User>;
            if (response.status !== 401) throw response;

            navigate({ to: "/" });

            throw response;

        },
        enabled: ctx.isAuthenticated()
    });

    return {
        user: data.data,
        get isLoading() {
            return data.isLoading || ctx.isLoading
        },
        hasRole(role: string) {
            return data.data?.roles.includes(role) ?? false;
        },
        ctx
    };
}

export default useAuth;