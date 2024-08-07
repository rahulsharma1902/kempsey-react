import axios from 'axios';

export const getParentCategories = async () => {
    try {
        const response = await axios.get('api_endpoint_here');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch parent categories.');
    }
};

export const addCategory = async (formData) => {
    try {
        const response = await axios.post('https://sagmetic.site/2023/laravel/kempsey/public/categories/add', formData);
        return response.data;
    } catch (error) {
        console.log(error);
        console.error('Error details:', error.response ? error.response.data : error.message);

        throw new Error(error.response?.data?.message || 'Failed to add category.');
    }
};
