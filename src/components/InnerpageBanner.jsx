import React from 'react';
import shobanerdesktop from '../images/shop_camping_banner_desk.png';
import Homebannerslide1mobile from '../images/Camping_mobile.png';
import { useAboutContent } from '../contexts/AboutContentContext';


const InnerpageBanner = () => {
    const { aboutContent, loading } = useAboutContent(); 

    return (
        <div className='banner_slider innerpage_banner'>
            <div className='banner_slide'>
                <div className='banner dark'>
                    <img src={aboutContent?.about_us_banner_image ?? '' } alt="banner image" className='banner_image desktop_image'/>
                    <img src={Homebannerslide1mobile} alt="banner image" className='banner_image mobileimage'/>
                    <div className='banner_inner'>
                        <div className='container'>
                            <div className='banner_content text-center'>
                                <h3 className='baner_sub_head'>{aboutContent?.about_us_banner_sub_title ?? '' }</h3>
                                <h1 className='size86'>{aboutContent?.about_us_banner_title ?? '' }</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

);
};

export default InnerpageBanner;