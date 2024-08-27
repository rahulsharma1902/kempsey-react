import React from 'react';
import { Skeleton } from '@mui/material';
import { useAboutContent } from '../../../contexts/AboutContentContext.js';
import innbanner from '../../../images/inn_banner_img.png';

const Outdoorcloset = () => {
    const { aboutContent, loading } = useAboutContent(); 
    if (loading) {
        return (
            <div className='inn_banner_section outdoor_closet dark'>
                <Skeleton variant="rectangular" width="100%" height={400} />
                <div className='inner'>
                    <div className='innbanner_content_right'>
                        <Skeleton variant="text" width={300} height={50} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='inn_banner_section outdoor_closet dark'>
            <img src={aboutContent?.about_us_bottom_banner ?? innbanner} alt="banner image" className='banner_image'/>
            <div className='inner'>
                <div className='innbanner_content_right'>
                    <h2 className='size86'>
                        {aboutContent?.about_us_bottom_title ?? 'Browse Kempsey Outdoors Closet'}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Outdoorcloset;
