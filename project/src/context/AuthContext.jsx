import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        if (userInfo) {
            setUser(userInfo);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await authService.login({ email, password });
            setUser(data);
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Logged in successfully');
            return data;
        } catch (error) {
            toast.error(error.response?.data?.error || 'Login failed');
            throw error;
        }
    };

    const signup = async (username, email, password) => {
        try {
            const { data } = await authService.signup({ username, email, password });
            setUser(data);
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Signed up successfully');
            return data;
        } catch (error) {
            toast.error(error.response?.data?.error || 'Signup failed');
            throw error;
        }
    };

    const googleLogin = async (idToken) => {
        try {
            const { data } = await authService.googleLogin(idToken);
            setUser(data);
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Logged in with Google');
            return data;
        } catch (error) {
            toast.error('Google login failed');
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('userInfo');
        toast.success('Logged out');
    };

    const isOwner = user?.role === 'OWNER';

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, googleLogin, logout, isOwner }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
