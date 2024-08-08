import React from 'react';
import { Link } from 'react-router-dom';
import gunshopmain from '../images/gun_shop.png';
import prdt1image from '../images/prdt1.png';

const Newproductmodule = () => {
    return (
        <div className="new_arrival light">
            <div className='full_grid'>
                <div className='full_grid_col text_side'>
                    <div className='grid_inner priduc_inner text-center'>
                        <div className='product_thumb'>
                        <img src={prdt1image} className='product_image'/>
                        </div>
                        <h2 className='size46'>Product Name</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <div className='button_wrap mt-30'>
                            <Link to="/" className="cta">View Details</Link>
                        </div>
                    </div>
                </div>
                <div className='full_grid_col media_col'>
                    <img src={gunshopmain} className='main_image'/>
                </div>
            </div>
        </div>
    );
};

export default Newproductmodule;
