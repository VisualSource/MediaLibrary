import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

type User = {
    username: string;
    avatar: string;
    email: string;
    roles: string[];
    id: number;
    jwt_id: string;
}

const USER_QUERY_KEY = "USER";
const SESSION_TOKEN = "session-token";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const rawValueRef = useRef<string | null>(null);
    const [session, setSession] = useState(() => {
        try {
            rawValueRef.current = sessionStorage.getItem(SESSION_TOKEN);
            return rawValueRef.current;
        } catch (error) {
            console.error(error);
            return null;
        }
    });

    const data = useQuery({
        queryKey: [USER_QUERY_KEY],
        queryFn: async () => {

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
                headers: {
                    "Authorization": `Bearer ${session}`
                }
            });

            if (!response.ok) {
                if (response.status !== 401) {
                    throw response;
                }

                const content = await response.json() as { errors: { title: string; detail: string; }[]; status: number; };

                if (content.errors.at(0)?.title === "Session Expired") {
                    sessionStorage.removeItem(SESSION_TOKEN);
                    setSession(null);
                    rawValueRef.current = null;
                    queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
                    throw new Error("Invalid session");
                }

                throw response;
            }

            return response.json() as Promise<User>;
        },
        enabled: !!session
    });

    return {
        user: data,
        setToken(token: string | null) {

            if (token === null) {
                sessionStorage.removeItem(SESSION_TOKEN);
            } else {
                sessionStorage.setItem(SESSION_TOKEN, token);
            }

            queryClient.cancelQueries({ queryKey: [USER_QUERY_KEY] })

            setSession(token);

        },
        getToken(): string | null {
            return sessionStorage.getItem(SESSION_TOKEN);
        }
    };
}
