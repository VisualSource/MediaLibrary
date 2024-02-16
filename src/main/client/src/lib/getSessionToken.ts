export function getSessionToken(): string {
    const session = sessionStorage.getItem("session-token");
    if (!session || !session.length) throw new Error("No Session token.");

    const data = session.split(".")[1];

    const { exp } = JSON.parse(atob(data)) as { sub: string; iat: number; exp: number };

    if (exp < (new Date().getTime() + 1) / 1000) {
        throw new Error("Session token has expired");
    }

    return session;
}