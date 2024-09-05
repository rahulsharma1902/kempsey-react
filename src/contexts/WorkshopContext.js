import React, { createContext, useState, useEffect, useContext } from 'react';
import { Services, addService, removeService } from '../api/apiService'; // Import necessary service functions
import { Stores } from '../api/apiStore';

// Create a context for service content
const ServiceContentContext = createContext();

// Custom hook for using the service content context
export const useServiceContent = () => {
    return useContext(ServiceContentContext);
};

// Provider component to manage service data
export const ServiceContentProvider = ({ children }) => {
    const [serviceContent, setServiceContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [storeContent, setStoreContent] = useState(null);
    const [error, setError] = useState(null); // State to handle errors

    // Function to fetch service data
    const fetchServiceContent = async () => {
        try {
            setLoading(true);
            const response = await Services();
            setServiceContent(response); // Set fetched data
        } catch (error) {
            console.error('Failed to fetch service content:', error.message);
            setServiceContent([]);
            setError(error.message); 
        } finally {
            setLoading(false);
        }
    };
    const fetchStoreContent = async () => {
        try {
            setLoading(true);
            const response = await Stores();
            setStoreContent(response); 
        } catch (error) {
            console.error('Failed to fetch store content:', error.message);
            setStoreContent([]); 
            setError(error.message); 
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchServiceContent();
        fetchStoreContent();
    }, []);

    return (
        <ServiceContentContext.Provider value={{ serviceContent,storeContent, loading, error}}>
            {children}
        </ServiceContentContext.Provider>
    );
};
