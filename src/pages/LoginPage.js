import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailicon from '../images/ic_outline-email.svg';
import lockicon from '../images/mingcute_lock-line.svg';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='body_inner'>
            <div className='page'>
                <div className='login_wrapper p-140'>
                    <div className='container container_small'>
                        <div className='inner_wrapper light'>
                            <div className='login_header'>
                                <h2 className='size40'>Login To Your Account</h2>
                                <p>Welcome back! Select method to login:</p>
                            </div>
                            <div className="form_wrapper">
                                <form onSubmit={handleSubmit}>
                                    <div className="form_group field_with_icon">
                                        <input
                                            className="form_control"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        <span className='field_icon'><img src={emailicon}/></span>
                                    </div>
                                    <div className="form_group password_group field_with_icon">
                                        <input
                                            className="form_control"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                       <span className='field_icon'><img src={lockicon}/></span>
                                        <span className="password_toggle" onClick={togglePasswordVisibility}>
                                            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                        </span>
                                    </div>
                                    <div className="check_box_row flex_row d-flex">
                                        <div className="check_col">
                                            <label className="form_check">
                                                <input
                                                    type="checkbox"
                                                    name="rememberMe"
                                                    checked={formData.rememberMe}
                                                    onChange={handleChange}
                                                />
                                                <span className="check_custom">✔</span>
                                                Remember Me
                                            </label>
                                        </div>
                                        <div className="check_col remember_col">
                                            <Link className='link_page' to="/reset-password">Forgot Password?</Link>
                                        </div>
                                    </div>
                                    <div className="submit_wrapper">
                                        <button className="cta_sq_green" type="submit">
                                            Log In
                                        </button>
                                    </div>
                                </form>
                                <div className="page_link_text">
                                    <p>Don’t have an account? <Link className='link_page' to="/sign-up">Create an account</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
