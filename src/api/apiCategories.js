import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://sagmetic.site/2023/laravel/kempsey/public/api';

export const getParentCategories = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/parent-categories`,{
            headers: {
                'Authorization': `Bearer ${token}`,                
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch parent categories.';
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const addCategory = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/categories/add`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
                
            }
        });

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to add category.';
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};
