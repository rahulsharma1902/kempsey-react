import React from 'react';
import ProductList from '../components/Front/Shop/ProductList.jsx';


const Categorymodulehome = () => {
  return (
    <div className="category_products_wrapper light">
      <h2 className='size46'>This Week's Must-Haves</h2>
        <ProductList />
      <div className="show_btn">
        <a href="javascript:void(0)" className="cta">Show More</a>
      </div>
    </div>
  );
};

export default Categorymodulehome;
