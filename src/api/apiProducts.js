import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://sagmetic.site/2023/laravel/kempsey/public/api';

const fetchData = async (endpoint) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Failed to fetch data.';
        // toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};


export const Filters = () => fetchData('filters');

export const getProductById = (id) => fetchData(`get-product/${id}`);
export const products = () => fetchData(`products`);




const postData = async (endpoint, formData, isMultipart = false) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        };
        if (isMultipart) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        const response = await axios.post(`${API_URL}/${endpoint}`, formData, {
            headers
        });
        return response.data;
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Failed to perform action.';
        // toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};



export const addProduct = (formData) => postData('product/add', formData, true);
export const updateProduct = (formData) => postData('product/add', formData, true);

export const updateFilter = (formData) => postData('filter/update', formData, true);

export const removeFilter = (id) => postData(`filter/remove/${id}`, {});
