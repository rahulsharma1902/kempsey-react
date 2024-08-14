import React from 'react';
import Layout from '../components/Layout.jsx';
import { Link } from 'react-router-dom';
import ProductImages from '../components/ProductImages';
import Productdetailmodule from '../components/Productdetailmodule';

const ShopDetail = () => {
    return (
        <Layout>
        <div className='body_inner '>
            <div className='page'>
            <div className='breadcrumb'>
                <div className='container'>
                    <div className='bredcrumb_nav'>
                        <ul className='breadcrumb_list'>
                            <li className='breadcrumb_item'><Link to="/" className='breadcrumb_link'>Home</Link></li>
                            <li className='breadcrumb_item'>|</li>
                            <li className='breadcrumb_item'><Link to="/shop-camping" className='breadcrumb_link'>Shop</Link></li>
                            <li className='breadcrumb_item'>|</li>
                            <li className='breadcrumb_item active'>Lorem Ipsum has been</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='product_detail_section p-130'>
                <div className='container'>
                    <div className='product_detail_row'>
                        <div className='product_media_detail'>
                            <ProductImages />
                        </div>
                        <div className='product_detail_col'>
                            <Productdetailmodule />
                        </div>
                    </div>
                </div>
            </div>



            </div>
        </div>
        </Layout>
    );
};

export default ShopDetail;
