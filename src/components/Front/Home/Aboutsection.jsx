import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import greenlogo from '../../../images/green_logo.svg';
import { useHomeContent } from '../../../contexts/HomeContentContext.js';

const Aboutsection = () => {
    const { homeContent, loading } = useHomeContent();

    return (
        <div className='about_section p-130 light'>
            <div className='container'>
                <div className='about_section_head'>
                    {loading ? (
                        <Skeleton variant="text" width="60%" height={80} />
                    ) : (
                        <h2 className='size76'>{homeContent?.about_section_heading ?? ''}</h2>
                    )}
                    {loading ? (
                        <Skeleton variant="circular" width={80} height={80} />
                    ) : (
                        <img src={homeContent?.about_section_logo ?? ''} className='green_logoe' />
                    )}
                    {/* <img src={homeContent?.about_section_logo ?? ''} className='green_logoe' /> */}
                </div>
                <div className='about_grid mt-60'>
                    <div className='about_grid_col aboutext_col'>
                        {loading ? (
                            <>
                                <Skeleton variant="text" width="100%" height={50} />
                                <Skeleton variant="text" width="100%" height={50} />
                                <Skeleton variant="text" width="80%" height={50} />
                            </>
                        ) : (
                            <div className='size32' dangerouslySetInnerHTML={{ __html: homeContent?.about_section_details ?? '' }} />
                        )}
                        <div className='button_div mt-30'>
                            {loading ? (
                                <Skeleton variant="rectangular" width={150} height={40} />
                            ) : (
                                <Link to={homeContent?.about_section_btn_link ?? ''} className='cta'>{homeContent?.about_section_btn ?? ''}</Link>
                            )}
                        </div>
                    </div>
                    <div className='about_grid_col about_media_col'>
                        <div className='about_thumb'>
                            {loading ? (
                                <Skeleton variant="rectangular" width="100%" height={400} className='about_main_thumb' />
                            ) : (
                                <img src={homeContent?.about_section_image ?? ''} className='about_main_thumb' />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aboutsection;
