import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { useHomeContent } from '../contexts/HomeContentContext.js';

const Newarrivalmodule = () => {
    const { homeContent, loading } = useHomeContent();

    return (
        <div className="new_arrival dark">
            <div className='full_grid'>
                <div className='full_grid_col media_col'>
                    {loading ? (
                        <Skeleton variant="rectangular" width="100%" height={500} />
                    ) : (
                        <img src={homeContent?.new_arrivals_first_banner ?? ''} className='main_image' />
                    )}
                </div>
                <div 
                    className='full_grid_col text_side' 
                    style={{ 
                        backgroundImage: loading ? 'none' : `url(${homeContent?.new_arrivals_bg_image ?? ''})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                    }}
                >
                    <div className='grid_inner text-center'>
                        {loading ? (
                            <>
                                <Skeleton variant="circular" width={80} height={80} className='logo_cir' />
                                <Skeleton variant="text" width="60%" height={50} />
                                <Skeleton variant="text" width="80%" />
                                <Skeleton variant="rectangular" width={200} height={40} className='mt-20' />
                            </>
                        ) : (
                            <>
                                <img src={homeContent?.new_arrivals_logo ?? ''} className='logo_cir' />
                                <h2 className='size65'>{homeContent?.new_arrivals_title ?? ''}</h2>
                                <p>{homeContent?.new_arrivals_text ?? ''}</p>
                                <div className='button_wrap mt-20'>
                                    <Link to={homeContent?.new_arrivals_btn_link ?? ''} className="cta cta_trans">{homeContent?.new_arrivals_btn ?? ''}</Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newarrivalmodule;
