import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout();
                setLoggedOut(true);
                toast.success('Logout successful!');
            } catch (err) {
                console.error('Failed to logout:', err);
            }
        };

        performLogout();
    }, [logout]);

    return loggedOut ? <Navigate to="/login" /> : <div>Logging out...</div>;
};

export default Logout;
