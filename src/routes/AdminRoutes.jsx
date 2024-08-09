import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';
import CategoriesAdd from '../components/Admin/Products/productCategories/CategoriesAdd';
import CategoriesList from '../components/Admin/Products/productCategories/CategoriesList';
import PrivateRoute from '../components/Auth/PrivateRoute';
import CategoriesUpdate from '../components/Admin/Products/productCategories/CategoriesUpdate';

import BrandsList from '../components/Admin/Products/productBrands/BrandsList';
import BrandsAdd from '../components/Admin/Products/productBrands/BrandsAdd';
import BrandsUpdate from '../components/Admin/Products/productBrands/BrandUpdate';

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
            <Route 
                path="/products/categories/edit/:id" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <CategoriesUpdate />
                        </PrivateRoute>
                } 
            />
            {/* brands routes  */}

            <Route 
                path="/products/brands" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <BrandsList />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/products/brands/add" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <BrandsAdd />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/products/brands/edit/:id" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <BrandsUpdate />
                        </PrivateRoute>
                } 
            />

            {/* brands routes end here */}
        </Routes>
    );
};

export default AdminRoutes;
