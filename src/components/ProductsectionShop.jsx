import React from 'react';
import ProdcutModuleShop from '../components/ProdcutModuleShop.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';

const ProductsectionShop = () => {
  return (
    <section className="category-sec p-130">
      <div className="container">
        <div className="category-content">
          <div className="categry-lft">
            <div className='sidebar'>
                <FilterSidebar />
            </div>
          </div>
          <div className="categry-rgt">
            <ProdcutModuleShop />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsectionShop;
