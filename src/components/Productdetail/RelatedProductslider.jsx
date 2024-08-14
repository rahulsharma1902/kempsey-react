import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import prdt1 from '../../images/prdt1.png';
import prdt2 from '../../images/prdt2.png';
import prdt3 from '../../images/prdt3.png';
import prdt4 from '../../images/prdt4.png';
import prdt5 from '../../images/prdt5.png';
import prdt6 from '../../images/prdt6.png';
import prdt7 from '../../images/prdt7.png';
import prdt8 from '../../images/prdt8.png';
import prdt9 from '../../images/prdt8.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const products = [
  { id: 1, imgSrc: prdt1, category: 'Gun Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
  { id: 2, imgSrc: prdt2, category: 'Bike Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
  { id: 3, imgSrc: prdt3, category: 'Bike Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
  { id: 4, imgSrc: prdt4, category: 'Bike Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
  { id: 5, imgSrc: prdt5, category: 'Bike Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
  { id: 6, imgSrc: prdt6, category: 'Gun Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
  { id: 7, imgSrc: prdt7, category: 'Fishing', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
  { id: 8, imgSrc: prdt8, category: 'Fishing', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
  { id: 9, imgSrc: prdt9, category: 'Camping', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' }
];

const RelatedProductslider = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200, // For screens under 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768, // For screens under 600px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="rel_product_slider_wrap">
      <Slider {...settings} className="rel_product_slider prdt_list">
        {products.map(product => (
          <div key={product.id} className='product_box'>
            <div className="prdt">
              <Link to="/shop-camping-detail" className="prdt-img">
                <img src={product.imgSrc} alt={product.description} />
              </Link>
              <div className="prdt-info">
                <h6><Link to="/shop-camping-detail">{product.description}</Link></h6>
                <div className="btm-info">
                  <div className='prodcut_category'>{product.category}</div>
                  <div className='price'>{product.price}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RelatedProductslider;
