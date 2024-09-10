// CategoryContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { activeParentCategories,categories } from '../api/apiCategories';

const CategoryContext = createContext();

export const useCategories = () => {
    return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
    const [ParentCategories, setParentCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await activeParentCategories();
                if (Array.isArray(response.data)) {
                    setParentCategories(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch Parent Categories:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);
    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await categories();
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch Parent Categories:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ ParentCategories, categories,loading }}>
            {children}
        </CategoryContext.Provider>
    );
};
