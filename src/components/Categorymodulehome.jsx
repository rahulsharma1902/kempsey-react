import React from 'react';
import prdt1 from '../images/prdt1.png';
import prdt2 from '../images/prdt2.png';
import prdt3 from '../images/prdt3.png';
import prdt4 from '../images/prdt4.png';
import prdt5 from '../images/prdt5.png';
import prdt6 from '../images/prdt6.png';
import prdt7 from '../images/prdt7.png';
import prdt8 from '../images/prdt8.png';
import prdt9 from '../images/prdt8.png';

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

const Categorymodulehome = () => {
  return (
    <div className="category_products_wrapper">
      <h3>This Week's Must-Haves</h3>
      <div className="prdt_list">
        {products.map(product => (
          <a key={product.id} className="prdt">
            <div className="prdt-img">
              <img src={product.imgSrc} alt={product.description} />
            </div>
            <div className="prdt-info">
              <h6>{product.description}</h6>
              <div className="btm-info">
                <span>{product.category}</span>
                <p>{product.price}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="show_btn">
        <a href="javascript:void(0)" className="cta">Show More</a>
      </div>
    </div>
  );
};

export default Categorymodulehome;
