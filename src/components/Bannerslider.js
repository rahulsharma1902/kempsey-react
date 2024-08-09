import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Homebannerslide1 from '../images/banner_1920.png';
import Homebannerslide1mobile from '../images/banner_1920mobile.png';
import Homebannerslide2 from '../images/banner_1920v2.png';
import Homebannerslide2mobile from '../images/banner_1920v2mobile.png';


const bannerData = [
    {
        subHead: 'Kempsey Outdoors',
        mainHead: 'Cozy Up Anywhere, Anytime',
        description: 'Discover the latest collection of Kempsey Outdoors',
        buttonText: 'Shop Now',
        image: Homebannerslide1,
        imagemobile: Homebannerslide1mobile,
    },
    {
        subHead: 'Kempsey Outdoors',
        mainHead: 'Cozy Up Anywhere, Anytime',
        description: 'Discover the latest collection of Kempsey Outdoors',
        buttonText: 'Shop Now',
        image: Homebannerslide2,
        imagemobile: Homebannerslide2mobile
    }
];

const Bannerslider = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <Slider ref={sliderRef} {...settings} className='banner_slider'>
            {bannerData.map((banner, index) => (
                <div className='banner_slide' key={index}>
                    <div className='banner dark'>
                        <img src={banner.image} alt="banner image" className='banner_image desktop_image'/>
                        <img src={banner.imagemobile} alt="banner image" className='banner_image mobileimage'/>
                        <div className='banner_inner'>
                            <div className='container'>
                                <div className='banner_content text-center'>
                                    <h3 className='baner_sub_head'>{banner.subHead}</h3>
                                    <h1 className='size86'>{banner.mainHead}</h1>
                                    <p>{banner.description}</p>
                                    <div className='button_wrap mt-30'>
                                        <Link to="/" className="cta cta_square cta_light"> {banner.buttonText}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default Bannerslider;
