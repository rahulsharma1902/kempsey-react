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
        return response.data;
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Failed to fetch data.';
        // toast.error(errorMessage);
        throw new Error(errorMessage);
    }
};


export const Coupons = () => fetchData('coupons');

export const getFilterById = (id) => fetchData(`get-filter/${id}`);
export const getFilterByCategory = (slug) => fetchData(`get-filter-by-categroy/${slug}`);




const postData = async (endpoint, formData, isMultipart = false) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
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


export const applyCoupon = (formData) => postData('coupon/apply', formData, true);


export const addCoupon = (formData) => postData('coupon/add', formData, true);

export const updateFilter = (formData) => postData('filter/update', formData, true);

export const removeCoupon = (id) => postData(`coupon/remove/${id}`, {});
