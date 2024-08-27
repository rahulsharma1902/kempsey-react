import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import greenlogo from '../../../images/green_logo.svg';
import { useAboutContent } from '../../../contexts/AboutContentContext';

const AboutMainsection = () => {
    const { aboutContent, loading } = useAboutContent();

    return (
        <div className='about_section p-130 light'>
            <div className='container'>
                <div className='about_section_head'>
                    {loading ? (
                        <Skeleton variant="text" width="60%" height={80} />
                    ) : (
                        <h2 className='size76'>{aboutContent?.about_us_heading ?? ''}</h2>
                    )}
                    {loading ? (
                        <Skeleton variant="circular" width={80} height={80} />
                    ) : (
                        <img src={aboutContent?.about_us_logo ?? ''} className='green_logoe' />
                    )}
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
                            <div className='size32' dangerouslySetInnerHTML={{ __html: aboutContent?.about_us_details ?? '' }} />
                        )}
                        <div className='button_div mt-30'>
                            {loading ? (
                                <Skeleton variant="rectangular" width={150} height={40} />
                            ) : (
                                <Link to={aboutContent?.about_us_btn_link ?? ''} className='cta'>{aboutContent?.about_us_btn ?? ''}</Link>
                            )}
                        </div>
                    </div>
                    <div className='about_grid_col about_media_col'>
                        <div className='about_thumb'>
                            {loading ? (
                                <Skeleton variant="rectangular" width="100%" height={400} className='about_main_thumb' />
                            ) : (
                                <img src={aboutContent?.about_us_image ?? ''} className='about_main_thumb' />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMainsection;
