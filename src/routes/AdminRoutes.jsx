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
import HomePageCarousel from '../components/Admin/Storefront/HomePageCarousel';
import HomeContent from '../components/Admin/Storefront/HomeContent';
import AboutUsContent from '../components/Admin/Storefront/AboutUsContent';
import SiteContent from '../components/Admin/Storefront/SiteContent';


import AddService from '../components/Admin/Servicing/AddService';
import ServicesList from '../components/Admin/Servicing/ServicesList';
import ServiceUpdate from '../components/Admin/Servicing/ServiceUpdate';
import ServiceTypeAdd from '../components/Admin/Servicing/Types/ServiceTypeAdd';
import ServiceTypesList from '../components/Admin/Servicing/Types/ServiceTypeList';
import ServiceTypeUpdate from '../components/Admin/Servicing/Types/ServiceTypeUpdate';
import AddServiceOptions from '../components/Admin/Servicing/Options/AddServiceOptions';
import ServiceOptionUpdate from '../components/Admin/Servicing/Options/ServiceOptionUpdate';

// store 
import AddStore from '../components/Admin/Stores/AddStore';
import StoreList from '../components/Admin/Stores/StoreList';

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

            {/* store front routes  */}

            <Route 
                path="/storefront/carousel" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <HomePageCarousel />
                        </PrivateRoute>
                } 
            />

            <Route 
                path="/storefront/home-content" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <HomeContent />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/storefront/about-us-content" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <AboutUsContent />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/storefront/site-content" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <SiteContent />
                        </PrivateRoute>
                } 
            />
            {/* store front routes end here */}


            {/* servicing route start from here AddService */}

            <Route 
                path="/services/add" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <AddService />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/services" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <ServicesList />
                        </PrivateRoute>
                } 
            />
             <Route 
                path="/services/edit/:id" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <ServiceUpdate />
                        </PrivateRoute>
                } 
            />

            {/* service types */}
            <Route 
                path="/service-types/add" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <ServiceTypeAdd />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/service-types" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <ServiceTypesList />
                        </PrivateRoute>
                } 
            />
             <Route 
                path="/service-types/edit/:id" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <ServiceTypeUpdate />
                        </PrivateRoute>
                } 
            />

            <Route 
                path="/service-options/add" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <AddServiceOptions />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/service-options/edit/:id" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <ServiceOptionUpdate />
                        </PrivateRoute>
                } 
            />
            {/* servicing route end here AddService */}
            {/* store start from here  AddStore*/}
            <Route 
                path="/stores/add" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <AddStore />
                        </PrivateRoute>
                } 
            />
            <Route 
                path="/stores" 
                element={
                        <PrivateRoute roles={['admin']}>
                            <StoreList />
                        </PrivateRoute>
                } 
            />

            {/* store end here */}
        </Routes>
    );
};

export default AdminRoutes;
