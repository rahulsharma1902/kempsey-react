import React from 'react';
import Layout from '../components/Layout.jsx';
import { Link } from 'react-router-dom';
import ProductImages from '../components/Productdetail/ProductImages.jsx';
import Productdetailmodule from '../components/Productdetail/Productdetailmodule';
import ProductDescriptionTab from '../components/Productdetail/ProductDescriptionTab';
import RelatedProductslider from '../components/Productdetail/RelatedProductslider';



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
            <ProductDescriptionTab />
            <div className='rel_pr_section p-130 light'>
                <div className='container'>
                    <div className='section_head'>
                            <h2 className='size56'>Related Products</h2>
                    </div>
                    <div className='rel_products mt-30'>
                            <div className='related_products_wrap'>
                                <RelatedProductslider />
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
