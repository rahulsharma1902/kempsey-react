import React, { createContext, useState, useEffect, useContext } from 'react';
import { contactuscontent, faqcontent ,customerservicecontent} from '../api/apiStorefront';

const StorefrontContext = createContext();

// Hook to access the Storefront context
export const useStorefrontContent = () => useContext(StorefrontContext);

export const StoreFrontProvider = ({ children }) => {
    const [content, setContent] = useState({
        contactUs: null,
        faq: null,
        CSdata: null,
        loading: true,
    });

    useEffect(() => {
     
        const fetchContent = async () => {
            try {
                const [contactResponse, faqResponse,CSresponse] = await Promise.all([contactuscontent(), faqcontent(),customerservicecontent()]);
                setContent({
                    contactUs: contactResponse.data,
                    faq: faqResponse.data,
                    CSdata: CSresponse.data,
                    loading: false,
                });
            } catch (error) {
                console.error('Failed to fetch content:', error.message);
                setContent({
                    contactUs: [],
                    faq: [],
                    CSdata:[],
                    loading: false,
                });
            }
        };

        fetchContent();
    }, []); 

    return (
        <StorefrontContext.Provider value={content}>
            {children}
        </StorefrontContext.Provider>
    );
};
