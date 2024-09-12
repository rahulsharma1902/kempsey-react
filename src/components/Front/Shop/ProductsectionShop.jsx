import React from 'react';
import ProdcutModuleShop from './ProdcutModuleShop.jsx';
import FilterSidebar from './FilterSidebar.jsx';
import { useParams } from 'react-router-dom';

const ProductsectionShop = ({title}) => {
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
            <ProdcutModuleShop title={title ?? ''} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsectionShop;
