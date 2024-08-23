// CategoryMarquee.jsx
import React from 'react';
import Slider from 'react-slick';
import { useCategories } from '../contexts/CategoryContext';
import Star from '../images/Star.svg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Skeleton from '@mui/material/Skeleton';

const CategoryMarquee = () => {
    const { ParentCategories, loading } = useCategories();

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 12,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        pauseOnHover: false,
        variableWidth: true,
    };

    return (
        <div className="category_marquee_div">
            <Slider {...settings} className='cate_marque_slider'>
                {loading ? (
                    [...Array(6)].map((_, index) => (
                        <div className='cate_marq_slide' key={index}>
                            <div className='marque_slide'>
                                <Skeleton variant="text" animation="wave" width="100px" />
                            </div>
                        </div>
                    ))
                ) : (
                    ParentCategories.map((category, index) => (
                        <div className='cate_marq_slide' key={index}>
                            <div className='marque_slide'>
                                <div className='star_icon'>
                                    <img src={Star} alt="Star Icon" />
                                </div>
                                <p>{category.name}</p>
                            </div>
                        </div>
                    ))
                )}
            </Slider>
        </div>
    );
};

export default CategoryMarquee;
