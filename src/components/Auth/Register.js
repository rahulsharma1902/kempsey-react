import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        rememberMe: false,
    });
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!formData.first_name.trim()) {
            errors.first_name = 'First Name is required';
        }
        if (!formData.last_name.trim()) {
            errors.last_name = 'Last Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            await register(formData);
            // toast.success('Registration successful!');
            setValidationErrors({});
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="form_wrapper">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form_group">
                    <input
                        className={`form_control ${validationErrors.first_name ? 'is-invalid' : ''}`}
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    {validationErrors.first_name && <p className="error-text">{validationErrors.first_name}</p>}
                </div>
                <div className="form_group">
                    <input
                        className={`form_control ${validationErrors.last_name ? 'is-invalid' : ''}`}
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    {validationErrors.last_name && <p className="error-text">{validationErrors.last_name}</p>}
                </div>
                <div className="form_group">
                    <input
                        className={`form_control ${validationErrors.email ? 'is-invalid' : ''}`}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {validationErrors.email && <p className="error-text">{validationErrors.email}</p>}
                </div>
                <div className="form_group">
                    <input
                        className={`form_control ${validationErrors.password ? 'is-invalid' : ''}`}
                        type={formData.showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {validationErrors.password && <p className="error-text">{validationErrors.password}</p>}
                </div>
                <div className="form_group">
                    <input
                        className={`form_control ${validationErrors.confirmPassword ? 'is-invalid' : ''}`}
                        type={formData.showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {validationErrors.confirmPassword && <p className="error-text">{validationErrors.confirmPassword}</p>}
                </div>
                <div className="check_box_row">
                    <div className="check_col">
                        <label className="form_check">
                            <input
                                type="checkbox"
                                name="showPassword"
                                checked={formData.showPassword}
                                onChange={handleChange}
                            />
                            <span className="check_custom">✔</span> Show Password
                        </label>
                    </div>
                    <div className="check_col">
                        <label className="form_check">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <span className="check_custom">✔</span> Remember Me
                        </label>
                    </div>
                </div>
                <div className="submit_wrapper">
                    <button className="cta_sq_green" type="submit">Sign Up</button>
                </div>
            </form>
            <div className="page_link_text">
                <p>Already have an account? <Link className='link_page' to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
