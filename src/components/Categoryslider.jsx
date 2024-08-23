// CategorySlider.jsx
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { useCategories } from '../contexts/CategoryContext';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import viewcollectionbutton from '../images/view_collection_button.svg';

const CategorySlider = () => {
    const { ParentCategories, loading } = useCategories();

    const settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
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
                        {loading ? (
                            <Slider {...settings} className='category_slider'>
                                {[...Array(3)].map((_, index) => (
                                    <div className='category_col' key={index}>
                                        <div className='category_box'>
                                            <Skeleton variant="rectangular" animation="wave" width="100%" height={439} />
                                            <div className='category_title'>
                                                <Skeleton variant="text" animation="wave" width="50%" height={40} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <Slider {...settings} className='category_slider'>
                                {ParentCategories.map((category, index) => (
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySlider;
