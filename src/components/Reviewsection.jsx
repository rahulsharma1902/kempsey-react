import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import reviewsimg from '../images/reviews.png';
import reviewspr1 from '../images/product_thumb.png';
import reviewspr2 from '../images/product_thumb2.png';
import reviewspr3 from '../images/product_thumb3.png';

const reviews = [
  {
    id: 1,
    rating: 5,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    productImg: reviewspr1,
    productName: "Product Name Here"
  },
  {
    id: 2,
    rating: 5,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    productImg: reviewspr2,
    productName: "Product Name Here"
  },
  {
    id: 3,
    rating: 5,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    productImg: reviewspr3,
    productName: "Product Name Here"
  },
  {
    id: 4,
    rating: 5,
    text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    productImg: reviewspr1,
    productName: "Product Name Here"
  }
];

const Reviewsection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Calculate progress based on the current slide and total slides
  const totalSlides = reviews.length - settings.slidesToShow + 1;
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="review_section p-130 light pb-0">
      <div className="container">
        <div className="section_head text-center">
          <h2 className="size46">Reviews From Our Customers</h2>
          <div className="review_star_div">
            <img src={reviewsimg} alt="Reviews" />
            <span>from 3440 reviews</span>
          </div>
        </div>
        <div className="review_wrap mt-30">
          <Slider {...settings} className="review_grid reviews_slider">
            {reviews.map(review => (
              <div key={review.id} className="review_col">
                <div className="review_box">
                  <div className="review_head">
                    <div className="rating">
                      <span>({review.rating}/5)</span>
                      <img src={reviewsimg} alt="Rating" />
                    </div>
                    <p>“{review.text}”</p>
                  </div>
                  <div className="review_footer">
                    <div className="review_product">
                      <div className="product_image">
                        <img src={review.productImg} className="rev_product_img" alt={review.productName} />
                      </div>
                      <h4>{review.productName}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Progress Bar */}
          {/* <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div> */}

          {/* Slide Counter */}
          <div className="slide-counter">
            <span className='active_ciunter'>{currentSlide + 1}</span>/{totalSlides}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviewsection;
