import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser, logoutUser, checkAuth } from './auth-api';

interface AuthContextType {
    user: any;
    isLoading: boolean;
    login: (creds: any) => Promise<any>;
    register: (data: any) => Promise<any>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth().then(res => {
            if (res && res.success) setUser(res.data);
            setIsLoading(false);
        });
    }, []);

    const login = async (creds: any) => {
        const data = await loginUser(creds);
        if (data.success) setUser(data.user);
        return data;
    };

    const register = async (userData: any) => {
        const data = await registerUser(userData);
        if (data.success) setUser(data.user);
        return data;
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuthContext must be used within AuthProvider');
    return context;
};
