import { useState, useEffect } from 'react';
import { checkAuth } from '../../features/auth/auth-api';

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth().then(res => {
            if (res && res.success) setUser(res.data);
            setLoading(false);
        });
    }, []);

    return { user, loading, isAuthenticated: !!user };
}
