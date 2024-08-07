import React from 'react';
import { Link } from 'react-router-dom';
import Bannerslider from '../components/Bannerslider.js';
import innbanner from '../images/inn_banner_img.png';
import kempspattern from '../images/kemps_pattern.png';
const HomePage = () => {

    return (
        <div className='body_inner'>
            <div className='page'>
                <div className='banner_section'>
                    <Bannerslider />
                </div>
                <div className='closet_section light'>
                    <div className='closet_module p-130'>
                        <div className='container'>
                            <div className='section_inner text-center'>
                                <p className='green_subhead'>Our Closet is Your Closet</p>
                                <h2 className='size76'>Lorem Ipsum is simply dummy text of the printing and</h2>
                                <div className='button_wrap mt-30'><Link to="/" className="cta cta_dark"> Contact Us</Link></div>
                            </div>
                        </div>
                        <img src={kempspattern} alt="banner image" className='abs_right'/>
                        
                    </div>
                </div>
                <div className='inn_banner_section dark'>
                    <img src={innbanner} alt="banner image" className='banner_image'/>
                   <div className='inner'>
                        <div className='innbanner_content_right'>
                            <h2 className='size86'>Browse Kempsey <br></br> Outdoors Closet</h2>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
