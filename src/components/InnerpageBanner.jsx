import React from 'react';
import shobanerdesktop from '../images/shop_camping_banner_desk.png';
import Homebannerslide1mobile from '../images/banner_1920mobile.png';


const InnerpageBanner = () => {
    return (
        <div className='banner_slider innerpage_banner'>
            <div className='banner_slide'>
                <div className='banner dark'>
                    <img src={shobanerdesktop} alt="banner image" className='banner_image desktop_image'/>
                    <img src={Homebannerslide1mobile} alt="banner image" className='banner_image mobileimage'/>
                    <div className='banner_inner'>
                        <div className='container'>
                            <div className='banner_content text-center'>
                                <h3 className='baner_sub_head'>Kempsey Outdoors</h3>
                                <h1 className='size86'>sHOP cAMPING</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

);
};

export default InnerpageBanner;