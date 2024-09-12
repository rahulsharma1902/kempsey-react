import React, { useState, useEffect, createContext, useContext } from 'react';
import { getProductByCategory } from '../api/apiProducts';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductContentProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const updateProducts = (newProducts) => {
        setProducts(newProducts);
        setFilteredProducts(newProducts); // Ensure that filteredProducts is also updated
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductByCategory();
                setProducts(response.data || []);
                setFilteredProducts(response.data || []);
            } catch (error) {
                console.error('Failed to fetch products:', error.message);
            }
        };
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, filteredProducts, updateProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
