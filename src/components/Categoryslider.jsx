import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import viewcollectionbutton from '../images/view_collection_button.svg';
import campingthumb from '../images/cate_camoing.png';
import Fishingthumb from '../images/cate_fisshing.png';
import Bikeshopthumb from '../images/cate_bike.png';
import GunShopthumb from '../images/cate_gun.png';

const categories = [
    { name: 'Camping', image: campingthumb },
    { name: 'Fishing', image: Fishingthumb },
    { name: 'Bike shop', image: Bikeshopthumb },
    { name: 'Gun Shop', image: GunShopthumb }
];

const CategorySlider = () => {
    const settings = {
        dots: false,
        arrows:false,
        autoplay:true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='category_section light p-130'>
            <div className='inner_section'>
                <div className='container'>
                    <div className='section_head d-flex'>
                        <div className='text_col'>
                            <h2 className='size56'>Shop By Categories</h2>
                        </div>
                        <div className='button_col'>
                            <Link to="/" className='view_colction'>
                                <img src={viewcollectionbutton} alt="View Collection" />
                            </Link>
                        </div>
                    </div>

                    <div className='category_wrapper'>
                        <Slider {...settings} className='category_slider'>
                            {categories.map((category, index) => (
                                <div className='category_col' key={index}>
                                    <div className='category_box'>
                                        <Link to="/" className='cate_thumb'>
                                            <img src={category.image} alt={category.name} className='category_thumb_image' />
                                        </Link>
                                        <div className='category_title'>
                                            <h4><Link to="/">{category.name}</Link></h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySlider;
