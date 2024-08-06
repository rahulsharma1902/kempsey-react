import React, { useState } from "react";
import { Link } from 'react-router-dom';
const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <div className='body_inner'>
            <div className='page'>
                <div className='login_wrapper p-140'>
                    <div className='container container_small'>
                        <div className='inner_wrapper light'>
                            <div className='login_header'>
                                <h2 className='size40'>Create Your Account</h2>
                            </div>
                            <div className="form_wrapper">
                                <form onSubmit={handleSubmit}>
                                    <div className="form_group">
                                        <input
                                            className="form_control"
                                            type="text"
                                            name="firstName"
                                            placeholder=" First Name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form_group">
                                        <input
                                            className="form_control"
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form_group">
                                        <input
                                            className="form_control"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form_group">
                                        <input
                                            className="form_control"
                                            type={formData.showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form_group">
                                        <input
                                            className="form_control"
                                            type={formData.showPassword ? "text" : "password"}
                                            name="confirmPassword"
                                             placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
