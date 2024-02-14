import { useContext } from 'react';
import { AuthContext } from '../lib/AuthContext';

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    return ctx;
}
