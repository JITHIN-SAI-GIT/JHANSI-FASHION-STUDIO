import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading, isOwner } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-gold">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !isOwner) {
        return <Navigate to="/" replace />;
    }

    return children;
};
