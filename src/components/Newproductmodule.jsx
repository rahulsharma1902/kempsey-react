import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { useHomeContent } from '../contexts/HomeContentContext.js';

const Newproductmodule = () => {
    const { homeContent, loading } = useHomeContent();

    return (
        <div className="new_arrival light">
            <div className='full_grid'>
                <div className='full_grid_col text_side'>
                    <div className='grid_inner priduc_inner text-center'>
                        <div className='product_thumb'>
                            {loading ? (
                                <Skeleton variant="rectangular" width={200} height={200} className='product_image' />
                            ) : (
                                <img src={homeContent?.new_arrivals_product_image ?? ''} className='product_image'/>
                            )}
                        </div>
                        {loading ? (
                            <>
                                <Skeleton variant="text" width="60%" height={50} />
                                <Skeleton variant="text" width="80%" />
                                <Skeleton variant="rectangular" width={150} height={40} className='mt-30' />
                            </>
                        ) : (
                            <>
                                <h2 className='size46'>{homeContent?.new_arrivals_product_name ?? ''}</h2>
                                <p>{homeContent?.new_arrivals_product_text ?? ''}</p>
                                <div className='button_wrap mt-30'>
                                    <Link to={homeContent?.new_arrivals_product_btn_link ?? ''} className="cta">{homeContent?.new_arrivals_product_btn ?? ''}</Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className='full_grid_col media_col'>
                    {loading ? (
                        <Skeleton variant="rectangular" width="100%" height={600} className='main_image' />
                    ) : (
                        <img src={homeContent?.new_arrivals_product_banner ?? ''} className='main_image'/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Newproductmodule;
