import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/Auth/PrivateRoute';
import LoginPage from '../pages/LoginPage';
const FrontRoutes = () => {
    return (
        <Routes>
            <Route 
                path="/login" 
                element={
                    <LoginPage />
                } 
            />
           
        </Routes>
    );
};

export default FrontRoutes;
