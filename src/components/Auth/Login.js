import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailicon from '../../images/ic_outline-email.svg';
import lockicon from '../../images/mingcute_lock-line.svg';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../api/auth';

const Login = () => {
    const { login: loginUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const userData = await login(formData.email, formData.password);
            loginUser(userData);
            toast.success('Login successful!');
            setFormErrors({});
            
            // Redirect based on user type
            if (userData.user_type === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="form_wrapper">
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            <form onSubmit={handleSubmit}>
                <div className="form_group field_with_icon">
                    <input
                        className={`form_control ${formErrors.email ? 'is-invalid' : ''}`}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <span className='field_icon'><img src={emailicon} alt="Email icon" /></span>
                    {formErrors.email && <p className="error-text">{formErrors.email}</p>}
                </div>
                <div className="form_group password_group field_with_icon">
                    <input
                        className={`form_control ${formErrors.password ? 'is-invalid' : ''}`}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <span className='field_icon'><img src={lockicon} alt="Lock icon" /></span>
                    <span className="password_toggle" onClick={togglePasswordVisibility}>
                        <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                    </span>
                    {formErrors.password && <p className="error-text">{formErrors.password}</p>}
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
    );
};

export default Login;
