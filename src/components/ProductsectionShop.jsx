import React from 'react';
import ProdcutModuleShop from '../components/ProdcutModuleShop.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import { useParams } from 'react-router-dom';

const ProductsectionShop = () => {
  const { category } = useParams(); 

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
            {/* Pass category prop to fetch the products */}
            <ProdcutModuleShop />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsectionShop;
