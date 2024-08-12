import axios from 'axios';
import { toast } from 'react-toastify';

export const login = async (email, password) => {
    try {
        const response = await axios.post('https://sagmetic.site/2023/laravel/kempsey/public/api/login', {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { token, user } = response.data;
        console.warn(response);
        console.log(token);
        console.log(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        // toast.warning(error.response.data.error || 'Login failed');
        throw new Error(error.response.data.message || 'Login failed');
    }
};
