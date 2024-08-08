import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Homebanner from '../images/banner_1920.png';

const Bannerslider = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <Slider ref={sliderRef} {...settings} className='banner_slider'>
            <div className='banner_slide'>
                <div className='banner dark'>
                    <img src={Homebanner} alt="banner image" className='banner_image'/>
                    <div className='banner_inner'>
                        <div className='container'>
                            <div className='banner_content text-center'>
                                <h3 className='baner_sub_head'>Kempsey Outdoors</h3>
                                <h1 className='size86'>Cozy Up Anywhere, Anytime</h1>
                                <p>Discover the latest collection of Kempsey Outdoors</p>
                                <div className='button_wrap mt-30'><Link to="/" className="cta cta_square cta_light"> Shop Now</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='banner_slide'>
                <div className='banner dark'>
                    <img src={Homebanner} alt="banner image" className='banner_image'/>
                    <div className='banner_inner'>
                        <div className='container'>
                            <div className='banner_content text-center'>
                                <h3 className='baner_sub_head'>Kempsey Outdoors</h3>
                                <h1 className='size86'>Cozy Up Anywhere, Anytime</h1>
                                <p>Discover the latest collection of Kempsey Outdoors</p>
                                <div className='button_wrap mt-30'><Link to="/" className="cta cta_square cta_light"> Shop Now</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Slider>
    );
};

export default Bannerslider;
