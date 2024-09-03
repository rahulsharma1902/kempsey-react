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


export const Services = () => fetchData('services');
export const getServiceById = (id) => fetchData(`get-service/${id}`);
export const getServiceTypeById = (id) => fetchData(`get-service-type/${id}`);
export const getServiceTypes = (id) => fetchData(`get-service-type`);
export const getServiceOptionById = (id) => fetchData(`get-service-option/${id}`);
export const getServiceTypeByServiceId = (id) => fetchData(`get-service-type-by-service/${id}`);




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



export const addService = (formData) => postData('service/add', formData, true);
export const addServiceType = (formData) => postData('service-type/add', formData, true);
export const addServiceOption = (formData) => postData('service-option/add', formData, true);
export const fetchServiceTypes = (formData) => postData('service-type/add', formData, true);


export const removeService = (id) => postData(`service/remove/${id}`, {});
export const removeServiceType = (id) => postData(`service-type/remove/${id}`, {});
export const removeServiceOption = (id) => postData(`service-option/remove/${id}`, {});
