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


export const homecontent = () => fetchData('home-content');
export const aboutuscontent = () => fetchData('about-us-content');
export const sitecontent = () => fetchData('site-content');

export const getProductById = (id) => fetchData(`get-product/${id}`);
export const products = () => fetchData(`products`);

export const Faqs = () => fetchData('faqs');
export const getfaqId = (id) => fetchData(`get-faq/${id}`);

export const Faqcategories = () => fetchData('faq-categories');  
export const getfaqcategoryId = (id) => fetchData(`get-faq-category/${id}`);


export const removeFaq = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/faq/remove/${id}`, {},
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

export const removeFaqCategory = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/faq-category/remove/${id}`, {},
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



export const addHomeContent = (formData) => postData('home-content/add', formData, true);
export const addAboutUsContent = (formData) => postData('about-us-content/add', formData, true);
export const addStoreContent = (formData) => postData('store-content/add', formData, true);
export const updateProduct = (formData) => postData('product/update', formData, true);
export const addfaqcategory = (formData) => postData('faq-category/add', formData, true);
export const addfaq = (formData) => postData('faq/add', formData, true);

export const removeProduct = (id) => postData(`product/remove/${id}`, {});
