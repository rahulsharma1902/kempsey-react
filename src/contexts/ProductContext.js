import React, { createContext, useState, useEffect, useContext } from 'react';
import { Services} from '../api/apiService';
import { products } from '../api/apiProducts';

// Create a context for service content
const ProductContext = createContext();

// Custom hook for using the service content context
export const useProductContext = () => {
    return useContext(ProductContext);
};

// Provider component to manage service data
export const ServiceContentProvider = ({ children }) => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch service data
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await products();
            setProducts(response); 
        } catch (error) {
            console.error('Failed to fetch service content:', error.message);
            setProducts([]);
            setError(error.message); 
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products,storeContent,serviceTypes, loading, error}}>
            {children}
        </ProductContext.Provider>
    );
};
