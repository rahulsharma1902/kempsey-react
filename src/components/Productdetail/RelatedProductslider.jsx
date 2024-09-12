import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import defaultImage from '../../images/default.jpeg';
// import prdt2 from '../../images/prdt2.png';
// import prdt3 from '../../images/prdt3.png';
// import prdt4 from '../../images/prdt4.png';
// import prdt5 from '../../images/prdt5.png';
// import prdt6 from '../../images/prdt6.png';
// import prdt7 from '../../images/prdt7.png';
// import prdt8 from '../../images/prdt8.png';
// import prdt9 from '../../images/prdt8.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { getProductByCategory} from '../../api/apiProducts.js';

// const products = [
//   { id: 1, imgSrc: prdt1, category: 'Gun Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
//   { id: 2, imgSrc: prdt2, category: 'Bike Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
//   { id: 3, imgSrc: prdt3, category: 'Bike Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
//   { id: 4, imgSrc: prdt4, category: 'Bike Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
//   { id: 5, imgSrc: prdt5, category: 'Bike Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
//   { id: 6, imgSrc: prdt6, category: 'Gun Shop', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
//   { id: 7, imgSrc: prdt7, category: 'Fishing', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
//   { id: 8, imgSrc: prdt8, category: 'Fishing', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' },
//   { id: 9, imgSrc: prdt9, category: 'Camping', price: '$149.00', description: 'Lorem Ipsum has been the industry\'s standard' }
// ];

const RelatedProductslider = (data) => {

  const [relatedproducts, setRelatedProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryslug = data?.data?.category_slug;
  const current_product_id = data?.data?.current_product_id;

  useEffect(() => {
    const fetchRelatedProducts = async () => {
        try {
            const data = await getProductByCategory(categoryslug);
            setRelatedProducts(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    fetchRelatedProducts();
}, [categoryslug]);

  console.log(relatedproducts);


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
        {relatedproducts?.data
        .filter(product => product.id !== current_product_id)
        .map(product => (
          <div key={product.id} className='product_box'>
            <div className="prdt">
              <Link to={`/shop-detail/${product.slug}`} className="prdt-img">
                <img  src={
                    product.images && product.thumbnail_index !== null 
                      ? JSON.parse(product.images)[product.thumbnail_index] ||  defaultImage
                      : defaultImage
                  } 
                  alt={product.name} 
                />
              </Link>
              <div className="prdt-info">
                <h6><Link to={`/shop-detail/${product.slug}`}>{product.name}</Link></h6>
                <div className="btm-info">
                  {/* <div className='prodcut_category'>{product.category}</div> */}
                  <div className='price'>${product.price}</div>
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
