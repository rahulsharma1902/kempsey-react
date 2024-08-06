import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';
import CategoriesAdd from '../components/Admin/Products/productCategories/CategoriesAdd';
import CategoriesList from '../components/Admin/Products/productCategories/CategoriesList';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route 
                path="/" 
                element={
                        <AdminDashboard />
                } 
            />
            <Route 
                path="/products/categories" 
                element={
                        <CategoriesList />
                } 
            />
             <Route 
                path="/products/categories/add" 
                element={
                        <CategoriesAdd />
                } 
            />
        </Routes>
    );
};

export default AdminRoutes;
