import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { getSessionToken, SESSION_TOKEN } from '@auth/getSessionToken';

type User = {
    username: string;
    avatar: string;
    email: string;
    roles: string[];
    id: number;
    jwtId: string;
}

const QUERY_USER = "USER";

const useAuth = () => {
    const queryClient = useQueryClient();
    const rawValueRef = useRef<string | null>(null);
    const [session, setSession] = useState(() => {
        try {
            rawValueRef.current = getSessionToken();
            return rawValueRef.current;
        } catch (error) {
            return null;
        }
    });

    const data = useQuery({
        queryKey: [QUERY_USER],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
                headers: {
                    "Authorization": `Bearer ${session}`
                }
            });

            if (response.ok) return response.json() as Promise<User>;
            if (response.status !== 401) throw response;

            const content = await response.json() as { errors: { title: string; detail: string; }[]; status: number; };

            if (content.errors.at(0)?.title === "Session Expired") {
                console.info("Invalidtion session");
                sessionStorage.removeItem(SESSION_TOKEN);
                setSession(null);
                rawValueRef.current = null;
                queryClient.invalidateQueries({ queryKey: [QUERY_USER] });
                throw new Error("Invalid session");
            }

            throw response;

        },
        enabled: session !== null
    });

    return {
        session,
        user: data,
        get canLoad() {
            return !(session === null || data.isLoading || data.isError)
        },
        isAuthenticated: () => session !== null,
        setToken(token: string | null) {

            if (token === null) {
                sessionStorage.removeItem(SESSION_TOKEN);
            } else {
                sessionStorage.setItem(SESSION_TOKEN, token);
            }
            setSession(token);
            rawValueRef.current = token;
            queryClient.invalidateQueries({ queryKey: [QUERY_USER] })
        },
        getToken(): string | null {
            return sessionStorage.getItem(SESSION_TOKEN);
        }
    };
}

export default useAuth;