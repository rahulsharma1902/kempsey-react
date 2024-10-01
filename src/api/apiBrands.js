import axios from 'axios';
import { toast } from 'react-toastify';

// const API_URL = 'https://sagmetic.site/2023/laravel/kempsey/public/api';
const API_URL = process.env.REACT_APP_API_URL;
export const fetchData = async (endpoint) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,                
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Failed to fetch data.';
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const Brands = () => fetchData('brands');

export const getBrandById = (id) => fetchData(`get-brand/${id}`);



export const addBrand = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}brand/add`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
                
            }
        });

        return response.data;
    } catch (error) {
        
        const errorMessage = error.response?.data?.message || 'Failed to add brands.';
        // toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const removeBrand = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/brand/remove/${id}`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Failed to remove brand.';
        // toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};
