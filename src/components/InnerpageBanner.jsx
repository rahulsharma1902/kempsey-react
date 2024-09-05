import React, { useEffect } from 'react';
import shobanerdesktop from '../images/shop_camping_banner_desk.png';
import Homebannerslide1mobile from '../images/Camping_mobile.png';
// import { useAboutContent } from '../contexts/AboutContentContext';


const InnerpageBanner = (data) => {
    // const { aboutContent, loading } = useAboutContent(); 
    // useEffect(() => {
    //     console.log(data.data.banner_image_url);
    // })
    return (
        <div className='banner_slider innerpage_banner'>
            <div className='banner_slide'>
                <div className='banner dark'>
                    <img src={data?.data?.image ?? 'https://sagmetic.site/2023/laravel/kempsey/public/faq_images/banner_image_url_1725533396.png' } alt="banner image" className='banner_image desktop_image'/>
                    <img src={Homebannerslide1mobile} alt="banner image" className='banner_image mobileimage'/>
                    <div className='banner_inner'>
                        <div className='container'>
                            <div className='banner_content text-center'>
                                <h3 className='baner_sub_head'>{data?.data?.sub_heading ?? 'KEMPSEY OUTDOORS' }</h3>
                                <h1 className='size86'>{data?.data?.heading ?? 'Title' }</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnerpageBanner;