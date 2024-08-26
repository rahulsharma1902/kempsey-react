// HomeContentContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { homecontent } from '../api/apiStorefront';

const HomeContentContext = createContext();

export const useHomeContent = () => {
    return useContext(HomeContentContext);
};

export const HomeContentProvider = ({ children }) => {
    const [homeContent, setHomeContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeContent = async () => {
            try {
                const response = await homecontent();
                // if (Array.isArray(response.data)) {
                    setHomeContent(response.data);
                // } else {
                //     console.error('Unexpected response format:', response.data);
                //     setHomeContent([]);
                // }
            } catch (error) {
                console.error('Failed to fetch home content:', error.message);
                setHomeContent([]); // Set an empty array if the fetch fails
            } finally {
                setLoading(true);
            }
        };

        fetchHomeContent();
    }, []);

    return (
        <HomeContentContext.Provider value={{ homeContent, loading }}>
            {children}
        </HomeContentContext.Provider>
    );
};
