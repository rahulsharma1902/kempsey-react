import React, { createContext, useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL = process.env.REACT_APP_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await axios.post(`${API_URL}logout`, {}, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.dismiss(); // Dismiss all previous toasters
            // toast.success('Logout successful!');
        } catch (error) {
            console.error('Logout failed:', error);
            toast.dismiss(); // Dismiss all previous toasters
            toast.error('Logout failed');
        }
    };
    const register = async (data) => {
        try {
            const response = await axios.post('https://sagmetic.site/2023/laravel/kempsey/public/api/register', data, {
                headers: { 'Content-Type': 'application/json' }
            });
            const userData = response.data;
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
