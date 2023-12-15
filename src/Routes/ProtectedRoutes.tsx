import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from '../components/SnackbarProvier';
import { clear } from 'console';

interface ProtectedRouteProps {
    children: ReactNode;
}
const RESTAURANT_PAGE  = ['/admin']

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = sessionStorage.getItem('token') !== null;
    const role = sessionStorage.getItem('role');
    const isLoginPage = location.pathname === '/login' || location.pathname === '/register';
    const snackbar = useSnackbar();

    const handleError = () =>{
        snackbar('You are not authorized to access this page','error');
        sessionStorage.clear();
        window.location.href = '/login'
    }
    useEffect(() => {
        if (!isAuthenticated && !isLoginPage) {
            handleError();
        }
        if(role){
            if(role === 'customer' && location.pathname === '/admin'){
                handleError();
            }else if (role === 'restaurant' && location.pathname != '/admin'){
                handleError();
            }
        }
    }, [isAuthenticated, isLoginPage]);

    return <>{children}</>;
};

export default ProtectedRoute;
