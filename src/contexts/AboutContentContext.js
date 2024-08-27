import React, { createContext, useState, useEffect, useContext } from 'react';
import { aboutuscontent } from '../api/apiStorefront';

const AboutContentContext = createContext();

export const useAboutContent = () => {
    return useContext(AboutContentContext);
};

export const AboutContentProvider = ({ children }) => {
    const [aboutContent, setAboutContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                const response = await aboutuscontent();
                setAboutContent(response.data);
                // console.log(response.data); // Log the fetched data directly
            } catch (error) {
                console.error('Failed to fetch about content:', error.message);
                setAboutContent([]); // Setting an empty array in case of error
            } finally {
                setLoading(false);
            }
        };

        fetchAboutContent();
    }, []); // No need to include aboutContent in the dependency array

    return (
        <AboutContentContext.Provider value={{ aboutContent, loading }}>
            {children}
        </AboutContentContext.Provider>
    );
};
