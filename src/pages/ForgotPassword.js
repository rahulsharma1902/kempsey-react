import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailicon from '../images/ic_outline-email.svg';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ email });
    };

    return (
        <div className='body_inner'>
            <div className='page'>
                <div className='login_wrapper p-140'>
                    <div className='container container_small'>
                        <div className='inner_wrapper light'>
                            <div className='login_header'>
                                <h2 className='size40'>Forgot Password?</h2>
                                <p>Enter your Email and we'll send you a link to reset your password</p>
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
                                            value={email}
                                            onChange={handleChange}
                                        />
                                        <span className='field_icon'><img src={emailicon}/></span>
                                    </div>
                                    <div className="submit_wrapper">
                                        <button className="cta_sq_green" type="submit">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                                <div className="page_link_text">
                                    <p><Link className='link_page' to="/login"><i className="fa-solid fa-chevron-left"></i> Back to Login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
