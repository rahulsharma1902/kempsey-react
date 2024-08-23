import React from 'react';
import Layout from '../components/Layout';
import CheckoutSection from '../components/Checkout/Checkout';

const Checkout = () => {


    return (
        <Layout>
            <div className='body_inner checkoutpage'>
                <div className='page'>
                    <CheckoutSection />
                </div>
            </div>
        </Layout>
    );
};

export default Checkout;
