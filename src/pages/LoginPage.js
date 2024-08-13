import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout  from '../components/Layout';
import LoginForm from '../components/Auth/Login';
const LoginPage = () => {

    return (
        <Layout>
            <div className='body_inner'>
                <div className='page'>
                    <div className='login_wrapper p-130'>
                        <div className='container'>
                            <div className='inner_wrapper light'>
                                <div className='login_header'>
                                    <h2 className='size40'>Login To Your Account</h2>
                                    <p>Welcome back! Select method to login:</p>
                                </div>
                                <LoginForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LoginPage;
