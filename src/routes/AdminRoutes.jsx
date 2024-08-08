import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';
import CategoriesAdd from '../components/Admin/Products/productCategories/CategoriesAdd';
import CategoriesList from '../components/Admin/Products/productCategories/CategoriesList';
import PrivateRoute from '../components/Auth/PrivateRoute';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route 
                path="/" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <AdminDashboard />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/products/categories" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <CategoriesList />
                        </PrivateRoute>
                } 
            />
             <Route 
                path="/products/categories/add" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <CategoriesAdd />
                        </PrivateRoute>
                } 
            />
        </Routes>
    );
};

export default AdminRoutes;
