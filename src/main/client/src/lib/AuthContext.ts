import { createContext } from 'react';

export type TAuthContext = {
    isAuthed: boolean,
    user: null | { avatar: string; name: string; id: string; roles: string[] }
}

export const AuthContext = createContext<TAuthContext>({ user: null, isAuthed: false });