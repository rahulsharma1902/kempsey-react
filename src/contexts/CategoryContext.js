// CategoryContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { activeParentCategories } from '../api/apiCategories';

const CategoryContext = createContext();

export const useCategories = () => {
    return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
    const [ParentCategories, setParentCategories] = useState([]);
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

    return (
        <CategoryContext.Provider value={{ ParentCategories, loading }}>
            {children}
        </CategoryContext.Provider>
    );
};
