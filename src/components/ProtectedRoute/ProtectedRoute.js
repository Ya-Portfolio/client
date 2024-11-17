import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user } = useAuth();
    const location = useLocation()

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }
    return <Outlet />;
};

export default ProtectedRoute;
