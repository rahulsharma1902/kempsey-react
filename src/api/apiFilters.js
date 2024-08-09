import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://sagmetic.site/2023/laravel/kempsey/public/api';

export const fetchData = async (endpoint) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,                
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Failed to fetch data.';
        // toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const Filters = () => fetchData('filters');

export const getFilterById = (id) => fetchData(`get-filter/${id}`);



export const addFilter = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/filter/add`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
                
            }
        });        
        return response.data;
    } catch (error) {
        
        const errorMessage = error.response?.data?.message || 'Failed to add Filter.';
        // toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};
export const updateFilter = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/filter/add`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
                
            }
        });        
        return response.data;
    } catch (error) {
        
        const errorMessage = error.response?.data?.message || 'Failed to add Filter.';
        // toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};
export const removefilter = async (id) => {
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
