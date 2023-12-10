import React, { ReactNode, useEffect, useState, SyntheticEvent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const isAuthenticated = true; // Replace with your authentication logic
    const isLoginPage = location.pathname === '/login' || location.pathname === '/register';

    useEffect(() => {
        if (!isAuthenticated && !isLoginPage) {
            setOpenSnackbar(true);
        }
    }, [isAuthenticated, isLoginPage]);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleAlertClose = (event: React.SyntheticEvent<Element, Event>, reason?: string) => {
        setOpenSnackbar(false);
    };

    if (!isAuthenticated && !isLoginPage) {
        return (
            <>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                        You do not have permission to view this page
                    </Alert>
                </Snackbar>
            </>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
