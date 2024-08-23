import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { fetchCarousels } from '../../../api/apiCarousel';

import Homebannerslide1 from '../../../images/banner_1920.png';
import Homebannerslide1mobile from '../../../images/banner_1920mobile.png';
import Homebannerslide2 from '../../../images/banner_1920v2.png';
import Homebannerslide2mobile from '../../../images/banner_1920v2mobile.png';


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
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const loadCarousels = async () => {
            try {
                const response = await fetchCarousels();
                const fetchedItems = response.data.map(item => ({
                    ...item,
                    id: String(item.id),
                    image_file: null 
                }));
                setItems(fetchedItems);
            } catch (error) {
                console.error('Error fetching carousels:', error);
            } finally {
                setLoading(false);
            }
        };
    
        loadCarousels();
    }, []);

    return (
        <div className="banner_slider_wrapper">
            {loading ? (
                <div className="skeleton_slider" style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                <Skeleton variant="rectangular" animation="wave" width="100%" height="100%" />
                <div className="skeleton_inner" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '80%' }}>
                    <Skeleton variant="text" animation="wave" width="10%" height={30} style={{ marginBottom: '12px', margin: '0 auto' }} />
                    <Skeleton variant="text" animation="wave" width="60%" height={60} style={{ marginBottom: '8px', margin: '0 auto' }} />
                    <Skeleton variant="text" animation="wave" width="80%" height={50} style={{ marginBottom: '24px', margin: '0 auto' }} />
                    <Skeleton variant="rectangular" animation="wave" width="160px" height={50} style={{ margin: '0 auto' }} />
                </div>
            </div>
            
            
            ) : (
                <Slider ref={sliderRef} {...settings} className='banner_slider'>
                    {items.map((banner, index) => (
                        <div className='banner_slide' key={index}>
                            <div className='banner dark'>
                                <img src={banner.image} alt="banner image" className='banner_image desktop_image'/>
                                <img src={banner.image} alt="banner image" className='banner_image mobileimage'/>
                                <div className='banner_inner'>
                                    <div className='container'>
                                        <div className='banner_content text-center'>
                                            <h3 className='baner_sub_head'>{banner.sub_heading}</h3>
                                            <h1 className='size86'>{banner.heading}</h1>
                                            <p>{banner.text}</p>
                                            <div className='button_wrap mt-30'>
                                                <Link to={banner.button_link} className="cta cta_square cta_light"> {banner.button_text}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default Bannerslider;
