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


import FilterList from '../components/Admin/Products/productFiltering/FiltersList';
import FilterAdd from '../components/Admin/Products/productFiltering/FiltersAdd';
import FiltersUpdate from '../components/Admin/Products/productFiltering/FiltersUpdate';


import ProductsList from '../components/Admin/Products/ProductsList';
import ProductsAdd from '../components/Admin/Products/ProductsAdd';
import ProductUpdate from '../components/Admin/Products/productUpdate';

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


            {/* filter routes are come here  */}

            <Route 
                path="/products/filters" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <FilterList />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/products/filters/add" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <FilterAdd />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/products/filters/edit/:id" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <FiltersUpdate />
                        </PrivateRoute>
                } 
            />
            {/* filter's routes are end here */}



            {/* products route start from here ProductsList ProductAdd*/}
            
            <Route 
                path="/products" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <ProductsList />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/products/add" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <ProductsAdd />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/products/edit/:id" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <ProductUpdate />
                        </PrivateRoute>
                } 
            />

            {/* products routes are end here */}


        </Routes>
    );
};

export default AdminRoutes;
