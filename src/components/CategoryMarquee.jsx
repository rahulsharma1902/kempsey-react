import React from 'react';
import Slider from "react-slick";
import Star from '../images/Star.svg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CategoryMarquee = () => {
    const settings = {
        dots: false,
        arrows:false,
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
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Camping</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Fishing</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Bike shop</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Gun Shop</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Camping</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Fishing</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Bike shop</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Gun Shop</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Camping</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Fishing</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Bike shop</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Gun Shop</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Camping</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Fishing</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Bike shop</p>
                    </div>
                </div>
                <div className='cate_marq_slide'>
                    <div className='marque_slide'>
                        <div className='star_icon'>
                            <img src={Star} alt="Star Icon" />
                        </div>
                        <p>Gun Shop</p>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default CategoryMarquee;
