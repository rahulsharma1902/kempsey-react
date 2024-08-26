import React from 'react';
import { Link } from 'react-router-dom';
import gunshopmain from '../images/gun_shop.png';
import prdt1image from '../images/prdt1.png';
import { useHomeContent } from '../contexts/HomeContentContext.js';

const Newproductmodule = () => {
    const { homeContent, loading } = useHomeContent();

    return (
        <div className="new_arrival light">
            <div className='full_grid'>
                <div className='full_grid_col text_side'>
                    <div className='grid_inner priduc_inner text-center'>
                        <div className='product_thumb'>
                        <img src={homeContent?.new_arrivals_product_image ?? ''} className='product_image'/>
                        </div>
                        <h2 className='size46'>{homeContent?.new_arrivals_product_name ?? ''}</h2>
                        <p>{homeContent?.new_arrivals_product_text ?? ''}</p>
                        <div className='button_wrap mt-30'>
                            <Link to={homeContent?.new_arrivals_product_btn_link ?? ''} className="cta">{homeContent?.new_arrivals_product_btn ?? ''}</Link>
                        </div>
                    </div>
                </div>
                <div className='full_grid_col media_col'>
                    <img src={homeContent?.new_arrivals_product_banner ?? ''} className='main_image'/>
                </div>
            </div>
        </div>
    );
};

export default Newproductmodule;
