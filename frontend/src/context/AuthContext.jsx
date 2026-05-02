import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Restore user on refresh
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await API.get('/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(res.data.user);
            } catch (err) {
                console.log("Auth failed:", err.message);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // ✅ LOGIN
    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });

        if (res.data.token) {
            localStorage.setItem("token", res.data.token);
        }

        setUser(res.data.user);
        return res.data;
    };

    // ✅ REGISTER
    const register = async (name, email, password) => {
        const res = await API.post('/auth/register', { name, email, password });
        return res.data;
    };

    // ✅ LOGOUT (fixed)
    const logout = async () => {
        const token = localStorage.getItem("token");

        localStorage.removeItem("token");
        setUser(null);

        try {
            await API.post('/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
            console.log("Logout API failed (ignored):", err.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);