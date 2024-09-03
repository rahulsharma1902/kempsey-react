
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


export const Stores = () => fetchData('stores');



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
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Failed to perform action.';
        // toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};



export const addStore = (formData) => postData('store/add', formData, true);


export const removeService = (id) => postData(`service/remove/${id}`, {});
