import { useContext } from 'react';
import { AuthContext } from '../lib/AuthContext';

const SESSION_TOKEN = "session-token";

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    return {
        data: ctx,
        setToken(token: string) {
            sessionStorage.setItem(SESSION_TOKEN, token);
        },
        getToken(): string | null {
            return sessionStorage.getItem(SESSION_TOKEN);
        }
    };
}
