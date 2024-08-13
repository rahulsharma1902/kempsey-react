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
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch data.';
        toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const activeParentCategories = () => fetchData('active-parent-categories');
export const parentCategories = () => fetchData('parent-categories');
export const childCategories = () => fetchData('child-categories');
export const categories = () => fetchData('categories');
export const getCategoryById = (id) => fetchData(`get-category/${id}`);



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
        // toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};

export const removeCategory = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/category/remove/${id}`, {},
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
        const errorMessage = error.response?.data?.message || 'Failed to remove category.';
        // toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};
