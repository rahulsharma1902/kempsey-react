import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Link,useNavigate ,useParams} from 'react-router-dom';
import ProductImages from '../components/Productdetail/ProductImages.jsx';
import Productdetailmodule from '../components/Productdetail/Productdetailmodule';
import ProductDescriptionTab from '../components/Productdetail/ProductDescriptionTab';
import RelatedProductslider from '../components/Productdetail/RelatedProductslider';
import {getProductById , getProductByCategory} from '../api/apiProducts.js';
   

const ShopDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // console.log(slug);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(slug);
                setProduct(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);
    

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
                            <li className='breadcrumb_item'><Link to={`/shop/${product?.data?.categorie?.slug}`} className='breadcrumb_link'>{product?.data?.categorie.name}</Link></li>
                            <li className='breadcrumb_item'>|</li>
                            <li className='breadcrumb_item active'>{product?.data?.name ?? 'Lorem Ipsum has been'}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='product_detail_section p-130'>
                <div className='container'>
                    <div className='product_detail_row'>
                        <div className='product_media_detail'>
                            <ProductImages data={{ 'images': product?.data?.images,'thumbnail_image': product?.data?.thumbnail_index}} />
                        </div>
                        <div className='product_detail_col'>
                            <Productdetailmodule data={{ 'id': product?.data?.id ,'name': product?.data?.name , 'category_name':product?.data?.categorie.name, 'price': product?.data?.price , 'detail': product?.data?.details }} />
                        </div>
                    </div>
                </div>
            </div>
            <ProductDescriptionTab data={{'description': product?.data?.description , 'details': product?.data?.details}} />
            <div className='rel_pr_section p-130 light'>
                <div className='container'>
                    <div className='section_head'>
                        <h2 className='size56'>Related Products</h2>
                    </div>
                    <div className='rel_products mt-30'>
                        <div className='related_products_wrap'>
                            <RelatedProductslider data={{ 'category_slug': product?.data?.categorie?.slug ,'current_product_id': product?.data?.id}} />
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
