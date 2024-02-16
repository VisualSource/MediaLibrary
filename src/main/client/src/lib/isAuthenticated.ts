import { getSessionToken } from "./getSessionToken";

export default function isAuthenticated() {
    try {
        getSessionToken();
        return true;
    } catch (error) {
        return false;
    }
}