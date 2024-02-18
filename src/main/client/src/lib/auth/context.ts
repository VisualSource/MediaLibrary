import { queryClient } from "@lib/queryClient";
import { createContext } from 'react';

export type Tokens = {
    accessToken: string;
    refreshToken: string;
};

export type LoginRequest = {
    email: string;
    password: string;
}
export type SignupRequest = {
    email: string;
    password: string;
    username: string;
}

export const QUERY_USER = "USER";
export const SESSION_TOKEN = "session-token";
export const REFRESH_TOKEN = "refresh-token";

export class AuthError extends Error {
    constructor(message: string, public cause: unknown) {
        super(message);
    }
}

export class AuthContext {
    private session: Tokens | null = null;
    public isLoading: boolean = false;

    constructor() {
        this.isLoading = true;
        this.session = this.loadFromStorage();

        if (!this.accessTokenValid() && this.session?.refreshToken) {
            this.refresh().catch((error) => {
                console.error(error);
            });
        } else {
            this.isLoading = false;
        }
    }

    private loadFromStorage(): Tokens | null {
        const accessToken = sessionStorage.getItem(SESSION_TOKEN);
        const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);

        if (!accessToken || !refreshToken) return null;

        return { accessToken, refreshToken };
    }

    private accessTokenValid(): boolean {
        if (!this.session) return false;

        try {
            const data = this.session.accessToken.split(".")[1];
            const { exp } = JSON.parse(atob(data)) as { sub: string; iat: number; exp: number };
            if (exp < (new Date().getTime() + 1) / 1000) {
                return false;
            }
            return true;
        } catch (_error) {
            return false;
        }
    }

    private clearSession() {
        this.session = null;
        sessionStorage.removeItem(SESSION_TOKEN);
        sessionStorage.removeItem(REFRESH_TOKEN);
        queryClient.invalidateQueries({ queryKey: [QUERY_USER] });
    }

    private setSession(tokens: Tokens) {
        sessionStorage.setItem(SESSION_TOKEN, tokens.accessToken);
        sessionStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
        this.session = tokens;
        queryClient.invalidateQueries({ queryKey: [QUERY_USER] });
    }

    private async refresh() {
        try {
            this.isLoading = true;
            if (!this.session) throw new Error("Unable to refresh");
            const tokens = await this.request<Tokens>("/auth/refreshToken", {
                token: this.session.refreshToken
            });

            this.setSession(tokens);
        } catch (error) {
            this.clearSession();
            throw new AuthError("Failed to refresh", error);
        } finally {
            this.isLoading = false;
        }
    }

    public isAuthenticated() {
        return this.session !== null;
    }

    public async login(state: LoginRequest) {
        try {
            this.isLoading = true;
            const tokens = await this.request<Tokens>("/auth/login", state);

            this.setSession(tokens);
        } catch (error) {
            throw new AuthError("Failed to login", error);
        } finally {
            this.isLoading = false;
        }
    }
    public async logout() {
        try {
            this.isLoading = true;
            this.clearSession();

            await this.request("/auth/logout", undefined);
            // to logout request;
        } catch (error) {
            throw new AuthError("Failed to logout", error);
        } finally {
            this.isLoading = false;
        }
    }
    public async signup(state: SignupRequest) {
        try {
            this.isLoading = true;
            const tokens = await this.request<Tokens>("/auth/signup", state);
            this.setSession(tokens);
        } catch (error) {
            throw new AuthError("Failed to signup", error);
        } finally {
            this.isLoading = false;
        }
    }
    async getSession() {
        if (!this.accessTokenValid()) {
            await this.refresh();
        }

        return this.session;
    }
    private async request<T>(path: string, body: Record<string, unknown> | undefined): Promise<T> {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
            body: body !== undefined ? JSON.stringify(body) : undefined,
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });
        if (!response.ok) throw response;

        return response.json() as Promise<T>;
    }
}

export const authContext = createContext<AuthContext | null>(null);

export const auth = new AuthContext();
