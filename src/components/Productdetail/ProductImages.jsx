import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import productmainimage from '../../images/product_main.png';
import productmainimage2 from '../../images/pr_image_2.png';
import productmainimage3 from '../../images/product_main3.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductImages = () => {
    const [sliderReady, setSliderReady] = useState(false);
    const forSlider = useRef(null);
    const navSlider = useRef(null);

    // Array of image sources
    const images = [
        productmainimage,
        productmainimage2,
        productmainimage3,
        productmainimage
    ];

    useEffect(() => {
        setSliderReady(true);
    }, []);

    const settingsFor = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: sliderReady ? navSlider.current : null
    };

    const settingsNav = {
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: sliderReady ? forSlider.current : null,
        focusOnSelect: true,
        dots: false,
        arrows: false,
        vertical: true,
        infinite: false,
        verticalSwiping: true,
        responsive: [
            {
              breakpoint: 480, // For screens under 1024px
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                vertical: false,
              }
            }
          ]
    };

    return (
        <div className='Product_images'>
            <div className='product_media_slider'>
                <Slider
                    {...settingsFor}
                    ref={forSlider}
                    className="product_for_slider"
                >
                    {images.map((image, index) => (
                        <div key={index} className='product_image_slide'>
                            <div className='product_image'>
                                <img src={image} alt={`product image ${index + 1}`} className='product_main_thumb'/>
                            </div>
                        </div>
                    ))}
                </Slider>
                <Slider
                    {...settingsNav}
                    ref={navSlider}
                    className="product_nav_slider"
                >
                    {images.map((image, index) => (
                        <div key={index} className='product_nav_slide'>
                            <div className='product_image'>
                                <img src={image} alt={`product image ${index + 1}`} className='product_main_thumb'/>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ProductImages;
