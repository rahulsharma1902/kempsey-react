import React from 'react';
import Layout from '../components/Layout.jsx';
import ProductsectionShop from '../components/ProductsectionShop.jsx';
import InnerpageBanner from '../components/InnerpageBanner.jsx';

const ShopCamping = () => {
    return (
        <Layout>
        <div className='body_inner '>
            <div className='page'>
                <div className='banner_section'>
                    <InnerpageBanner />
                </div>
                <ProductsectionShop />
            </div>
        </div>
        </Layout>
    );
};

export default ShopCamping;
