import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = process.env.REACT_APP_API_URL;
export const login = async (email, password) => {
    // Retrieve tempId from local storage directly
    const tempId = localStorage.getItem('user_temp_id') || '';

    try {
        const response = await axios.post(`${API_URL}login`, {
            email,
            password,
            tempId
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { token, user } = response.data;

        // Debugging output (Remove in production)
        console.warn(response);
        console.log(token);
        console.log(user);

        // Save token and user to local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.removeItem('user_temp_id');
        return user;
    } catch (error) {
        // Display toast notification for errors
        toast.warning(error.response?.data?.message || 'Login failed');
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};
