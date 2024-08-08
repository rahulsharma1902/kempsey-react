import React, { useState } from "react";
import { Link } from 'react-router-dom';
import RegisterForm from './../components/Auth/Register';
import Layout  from '../components/Layout';

const RegisterPage = () => {
    return (
        <Layout>
            <div className='body_inner'>
                <div className='page'>
                    <div className='login_wrapper p-140'>
                        <div className='container container_small'>
                            <div className='inner_wrapper light'>
                                <div className='login_header'>
                                    <h2 className='size40'>Create Your Account</h2>
                                </div>
                            <RegisterForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RegisterPage;
